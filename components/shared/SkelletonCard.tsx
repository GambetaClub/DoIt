import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const SkelletonCard = () => {
  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Skeleton className="w-full h-[200px] rounded-2xl" />
      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <div className="flex gap-2">
          <Skeleton className="w-[80px] h-[25px] rounded-2xl" />
          <Skeleton className="w-[80px] h-[25px] rounded-2xl" />
        </div>
        <Skeleton className="w-[200px] h-[20px] rounded-2xl" />
        <Skeleton className="w-[270px] h-[25px] rounded-2xl my-5" />
        <Skeleton className="w-[270px] h-[18px] rounded-2xl" />
      </div>
    </div>
  )
}

export default SkelletonCard
