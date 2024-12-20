import CategoryFilter from "@/components/shared/CategoryFilter"
import Collection from "@/components/shared/Collection"
import CollectionSkeleton from "@/components/shared/CollectionSkeleton"
import Search from "@/components/shared/Search"
import { Button } from "@/components/ui/button"
import { getAllEvents } from "@/lib/actions/event.actions"
import { SearchParamProps } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from 'react'
export default async function Home({ searchParams }: SearchParamProps) {
  const params = await searchParams
  const page = Number(params?.page) || 1
  const searchText = (params?.query as string) || ""
  const category = (params?.category as string) || ""

  const getEvents = async (pageNumber: number, limit: number) => {
    const events = await getAllEvents({
      query: searchText,
      category: category,
      page: pageNumber,
      limit: limit,
    })

    return { data: events?.data, totalPages: events?.totalPages || 1 }
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-7">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 ">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies our global community
            </p>
            <Button size="lg" asChild className="button w-full sm:2-fit">
              <Link href="#events">Explore now</Link>
            </Button>
          </div>
          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[80vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trusted by <br /> thousands of events
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search /> <CategoryFilter />
        </div>
        <Suspense fallback={<CollectionSkeleton/>}>
          <Collection
            fetchEvents={getEvents}
            emptyTitle="No Events Found"
            emptyStateSubtext="Come back later"
            collectionType="All_Events"
            limit={3}
            page={page}
          />
        </Suspense>
      </section>
    </>
  )
}
