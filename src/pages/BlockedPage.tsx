

function BlockedPage() {
  return (
    <div className="w-full h-[100vh] bg-slate-950 flex flex-col gap-1 md:gap-5 justify-center items-center">
        <h2 className="text-red-400 text-3xl md:text-8xl font-bold">Access Denied!</h2>
        <div className="w-[80%] md:w-[50%] h-[1px] mt-3 md:mt-6 bg-red-600"></div>
        <h3 className="text-red-200 text-[12px] md:text-xl">Please contact with your admin for further assistance</h3>
    </div>
  )
}

export default BlockedPage