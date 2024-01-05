import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
      <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
        <div className="flex flex-col justify-center gap-8">
          <Skeleton className="w-full h-[220px] rounded-full" />
          <Skeleton className="w-full h-[72px] rounded-full" />
          <Skeleton className="w-full h-[54px] rounded-full" />
        </div>
        <Skeleton className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] rounded-3xl" />
      </div>
    </section>
  )
}

export default Loading
