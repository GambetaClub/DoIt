import Collection from "@/components/shared/Collection"
import { Button } from "@/components/ui/button"
import { getEventsByUser } from "@/lib/actions/event.actions"
import { getOrdersByUser } from "@/lib/actions/order.actions"
import { IOrder } from "@/lib/database/models/order.model"
import { auth } from "@clerk/nextjs"
import Link from "next/link"
import React, { Suspense } from "react"
import { SearchParamProps } from "../../../types/index"
import CollectionSkeleton from "@/components/shared/CollectionSkeleton"

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string

  const ordersPage = Number(searchParams?.ordersPage) || 1
  const eventsPage = Number(searchParams?.eventsPage) || 1

  const getOrderedEvents = async (pageNumber: number, limit: number) => {
    const orders = await getOrdersByUser({ userId, page: pageNumber, limit: limit});
    const orderedEvents = orders?.data.map((order: IOrder) => order.event || []);
    return { data: orderedEvents, totalPages: orderedEvents?.length || 0 };
  };

  const getOrganizedEvents = async (pageNumber: number, limit: number) => {
    const organizedEvents = await getEventsByUser({ userId, page: pageNumber, limit: limit})
    return { data: organizedEvents?.data, totalPages: organizedEvents?.totalPages || 0};
  } 

  return (
    <>
      {/* Events Purchased by the User */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href={"/events"}>Explore More Events</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
      <Suspense fallback={<CollectionSkeleton/>}>
        <Collection
          fetchEvents={getOrderedEvents}
          emptyTitle="No events tickets purchased yet."
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          urlParamName="ordersPage"
          limit={3}
          page={ordersPage}
        />
      </Suspense>
      </section>

      {/* Events Organized by the User */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href={"/events/create"}>Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
      <Suspense fallback={<CollectionSkeleton/>}>
        <Collection
          fetchEvents={getOrganizedEvents}
          emptyTitle="No events have been created by you yet."
          emptyStateSubtext="Go create some!"
          collectionType="Events_Organized"
          urlParamName="eventsPage"
          limit={3}
          page={eventsPage}
        />
        </Suspense>
      </section>
    </>
  )
}

export default ProfilePage
