"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { formUrlQuery } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

type PaginationProps = {
  urlParamName?: string
  page: string | number
  totalPages: string | number
}

const Paging = ({ urlParamName, page, totalPages }: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString()
    })

    router.push(newUrl, {scroll: false})
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => onClick("prev")}
            className="w-28"
            isActive={Number(page) > 1}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => onClick("prev")}
            className="w-28"
            isActive={Number(page) < Number(totalPages)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default Paging
