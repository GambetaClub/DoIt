"use server"
import Stripe from 'stripe'
import { CheckoutOrderParams, CreateOrderParams, GetOrdersByEventParams, GetOrdersByUserParams } from "../../types/index"
import { redirect } from 'next/navigation'
import { handleError } from '../utils'
import { connectToDatabase } from '../database'
import Order from '../database/models/order.model'
import Event from '../database/models/event.model'
import User from '../database/models/user.model'
import { ObjectId } from 'mongodb'
import { auth } from '@clerk/nextjs/server'


export const checkoutOrder = async (order: CheckoutOrderParams) => {
  // Create Checkout Sessions from body params.
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  try {
    const { sessionClaims } = await auth()
    if (!order.buyerId || sessionClaims?.userId !== order.buyerId) throw new Error('Unauthorized')

    await connectToDatabase()
    const event = await Event.findById(order.eventId)
    if (!event) throw new Error('Event not found')
    const price = event.isFree ? 0 : Math.round(Number(event.price) * 100)

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: event.title
            }
          },
          quantity: 1
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    })
    redirect(session.url!)
  } catch (error) {
    throw error
  }
}


export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase()
    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    })

    return JSON.parse(JSON.stringify(newOrder))
  }catch (error) {
    handleError(error)
  }
}

// Get orders by Event
export async function getOrdersByEvent({ searchString, eventId }: GetOrdersByEventParams) {
  try {
    await connectToDatabase()

    if (!eventId) throw new Error('Event ID is required')
    const event = await Event.findById(eventId)
    const { sessionClaims } = await auth()
    if (!event || event.organizer.toHexString() !== sessionClaims?.userId) throw new Error('Unauthorized')
    const eventObjectId = new ObjectId(eventId)

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'buyer',
          foreignField: '_id',
          as: 'buyer',
        },
      },
      {
        $unwind: '$buyer',
      },
      {
        $lookup: {
          from: 'events',
          localField: 'event',
          foreignField: '_id',
          as: 'event',
        },
      },
      {
        $unwind: '$event',
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: '$event.title',
          eventId: '$event._id',
          buyer: {
            $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
          },
        },
      },
      {
        $match: {
          $and: [{ eventId: eventObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
        },
      },
    ])

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    handleError(error)
  }
}

// Get Orders by User
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await Order.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'event',
        model: Event,
        populate: {
          path: 'organizer',
          model: User,
          select: '_id firstName lastName',
        },
      })

    const ordersCount = await Order.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
  } catch (error) {
    handleError(error)
  }
}