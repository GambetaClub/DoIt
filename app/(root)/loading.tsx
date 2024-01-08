import Spinner from "@/components/shared/Spinner"

const Loading = () => {
  return (
      <div role="status" className="flex items-center justify-center w-full h-full flex-col gap-3">
        <Spinner/>
        <div>Loading...</div>
      </div>
  )
}

export default Loading
