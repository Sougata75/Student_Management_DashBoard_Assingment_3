import { useRouteError } from "react-router-dom";

interface ErrerType {
    message: string
}

function ErrorBoundery() {
    const error = useRouteError() as ErrerType;
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center  bg-slate-950">
        <h2 className="text-white/50 font-bold text-2xl md:text-6xl">Something is Going Wrong</h2>
        <h1 className="text-white/50 py-4 text-xl md:text-4xl font-semibold">Error: {error?.message}</h1>
    </div>
  )
}

export default ErrorBoundery