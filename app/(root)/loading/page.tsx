import Spinner from "@/components/shared/Spinner"

const Loading = () => {
  return (
      <div role="status" className="flex items-center justify-center w-full h-full">
        <div className="h-20 flex flex-col gap-2">
          <Spinner/>
          <p className="text-sm">Just one second. In the meantime, enjoy the moment</p>
        </div>
      </div>
  )
}

export default Loading
