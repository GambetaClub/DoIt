import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.actions"
import { auth } from "@clerk/nextjs/server"

type UpdateEventProps = {
  params: Promise<{ id: string }>
}

const UpdateEvent = async ({ params }: UpdateEventProps) => {
  const { sessionClaims } = await auth()
  const eventId = (await params).id
  const userId = sessionClaims?.userId as string
  const event = await getEventById(eventId)

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm
          type="Update"
          event={event}
          userId={userId}
          eventId={event._id}
        />
      </div>
    </>
  )
}

export default UpdateEvent
