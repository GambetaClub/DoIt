import { IEvent } from "@/lib/database/models/event.model"
import { formatDateTime } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import React from "react"
import { auth } from "@clerk/nextjs/server"

import { DeleteConfirmation } from "./DeleteConfirmation"

type CardProps = {
  event: IEvent
  hasOrderLink: boolean
  hidePrice: boolean
}

const Card = async ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = await auth()
  const userId = sessionClaims?.userId as string

  const isEventCreator = userId === event.organizer._id.toString()

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] cursor-auto">
      <Link
        id="event-link"
        href={`/events/${event._id}`}
        className="absolute h-full w-full z-10"
      />
      <div className="h-1/2 relative w-full">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="w-full object-cover"
        />
      </div>
      {/* Is event creator ...  */}
      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all z-20">
          <Link href={`/events/${event._id}/update`} id="event-edit-link" className="z-20">
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}
      <div className="flex min-h-[230px] h-1/2 flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}
        <p className="p-medium-16 p-medium18 text-grey-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
          {event.title}
        </p>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>

          {hasOrderLink && (
            <Link
              id="order-link"
              href={`/orders?eventId=${event._id}`}
              className="flex gap-2 z-20"
            >
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
