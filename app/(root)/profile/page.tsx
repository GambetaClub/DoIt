import Collection from "@/components/shared/Collection"
import { Button } from "@/components/ui/button"
import { getEventsByUser } from "@/lib/actions/event.actions"
import { auth } from "@clerk/nextjs"
import Link from "next/link"
import React from "react"

const ProfilePage = async () => {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string
  const organizedEvents = await getEventsByUser({ userId, page: 1 })
  return (
    <>
      {/* My tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size='lg' className="button hidden sm:flex">
            <Link href={"/events"}>Explore More Events</Link>
          </Button>
        </div>
      </section>

      {/* My Events organized */}
      {/* <section className='wrapper my-8'>
    <Collection
          data={events?.data}
          emptyTitle="No events tickets purchased yet."
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          totalPages={2}
          urlParamName='ordersPage'
        />
    </section> */}

      {/* Events Organized */}

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events organized</h3>
          <Button asChild size='lg' className="button hidden sm:flex">
            <Link href={"/events/create"}>Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No events have been created by you yet."
          emptyStateSubtext="Go create some!"
          collectionType="Events_Organized"
          limit={3}
          page={1}
          totalPages={2}
          urlParamName="eventsPage"
        />
      </section>
    </>
  )
}

export default ProfilePage
