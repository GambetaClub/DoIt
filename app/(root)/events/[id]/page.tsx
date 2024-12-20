import CheckoutButton from "@/components/shared/CheckoutButton"
import Collection from "@/components/shared/Collection"
import CollectionSkeleton from "@/components/shared/CollectionSkeleton"
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions"
import { formatDateTime } from "@/lib/utils"
import { SearchParamProps } from "@/types"
import Image from "next/image"
import Link from "next/link"
import React, { Suspense } from "react"

const EventDetails = async ({
  params,
  searchParams,
}: SearchParamProps) => {
  const pageParams = await searchParams
  const eventId = (await params).id
  const event = await getEventById(eventId)
  const getEvents = async (pageNumber: number) => {
    const relatedEvents = await getRelatedEventsByCategory({
      categoryId: event.category._id,
      eventId: event._id,
      page: pageNumber,
    })
    return {
      data: relatedEvents?.data,
      totalPages: relatedEvents?.totalPages || 0,
    }
  }

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-container">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <div>
            <Image
              src={event.imageUrl}
              alt="hero image"
              width={1000}
              height={1000}
              className="h-full min-h[300px] object-cover object-center"
            />
          </div>
          <div className="flex 2-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>
              <div className="flex flex-col gap-3 sm:flex-row md:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {event.isFree ? "FREE" : `$${event.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.category.name}
                  </p>
                </div>
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-primary-500">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>
            {/* Checkout button */}

            <CheckoutButton event={event} />

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  className="filter-grey"
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={32}
                  height={32}
                />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly} -{" "}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  <p className="ml-1">
                    {formatDateTime(event.endDateTime).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>
              <div className="p-regular-20 flex items-center gap-3">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-medium-16 lg:p-regular-20 ">{event.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2"></div>
            <p className="p-bold-20 text-grey-600">More about the event</p>
            <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
            <Link href={event.url}>
              <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                {event.url}
              </p>
            </Link>
          </div>
        </div>
      </section>
      {/* Events with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-8">
        <h2 className="h2-bold">Related Events</h2>
        <Suspense fallback={<CollectionSkeleton />}>
          <Collection
            fetchEvents={getEvents}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            urlParamName="All_Events"
            limit={3}
            page={pageParams.page as string}
          />
        </Suspense>
      </section>
    </>
  )
}

export default EventDetails
