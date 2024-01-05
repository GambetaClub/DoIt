import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import Card from './Card'
import Paging from '@/components/shared/Paging'

type CollectionProps = {
    fetchEvents: (page: number, limit: number) => Promise<{ data: IEvent[], totalPages: number }>
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    urlParamName?: string,
    collectionType?: "Events_Organized"| 'My_Tickets'| 'All_Events'
}

const Collection = async ({fetchEvents, emptyTitle, emptyStateSubtext, limit, page, collectionType, urlParamName }: CollectionProps) => {

  const events = await fetchEvents(Number(page), limit)
  const data = events?.data || []
  const totalPages = events.totalPages

  return (
    <>
      {data.length > 0 ? 
      (
          <div className="flex flex-col items-center gap-10">
            <ul className="grid w-full grid-cols-1 gap-5 sm:grdi-cols-2 lg:grid-cols-3 xl:gap-10">
              {data.map((event) => {
                const hasOrderLink = collectionType === "Events_Organized"
                const hidePrice = collectionType === 'My_Tickets'

                return (
                  <li key={event._id} className="flex justify-center">
                    <Card event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice}/>
                  </li>
                )
                })}
            </ul>

            {totalPages > 1 && (
              <Paging urlParamName={urlParamName} page={page} totalPages={totalPages}/>
            )}
          </div>
      )
      : 
        (
          <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28'>
            <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
            <p className='p-regular-14'>{emptyStateSubtext}</p>
          </div>
        )
      }
    </>
  )
}

export default Collection