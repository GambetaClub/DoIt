import React from "react"
import SkeletonCard from "@/components/shared/SkelletonCard"

const CollectionSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <ul className="grid w-full grid-cols-1 gap-5 sm:grdi-cols-2 lg:grid-cols-3 xl:gap-10">
        <li key="skeleton1" className="flex-row justify-center">
          <SkeletonCard/>
        </li>
        <li key="skeleton2" className="flex justify-center">
          <SkeletonCard />
        </li>
        <li key="skeleton3" className="flex justify-center">
          <SkeletonCard />
        </li>
      </ul>
    </div>
  )
}

export default CollectionSkeleton
