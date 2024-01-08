"use client"

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { updateUrlQuery } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

type PaginationProps = {
  urlParamName?: string
  page: string | number
  totalPages: string | number
}


const Paging = ({ urlParamName, page, totalPages }: PaginationProps) => {
  const router = useRouter()
  const searchParams  = useSearchParams()
  
  const isPreviousActive = Number(page) > 1
  const isNextActive = Number(page) < Number(totalPages)

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1
    if (pageValue > Number(totalPages) || pageValue < 1) {
      return
    }
    const newUrl = updateUrlQuery({
      params: searchParams.toString(),
      addKey: urlParamName || 'page',
      addValue: pageValue.toString()
    })

    router.push(newUrl, {scroll: false})
  }

  return (
    <Pagination>
      <PaginationContent>
          <PaginationPrevious
            onClick={() => onClick("prev")}
            className="w-28"
            isActive={isPreviousActive}
          />
          <PaginationNext
            onClick={() => onClick("next")}
            className="w-28"
            isActive={isNextActive}
          />
      </PaginationContent>
    </Pagination>
  )
}

export default Paging
