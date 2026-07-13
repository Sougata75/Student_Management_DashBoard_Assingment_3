import { Box, Button, Typography } from "@mui/material"
import { Plus } from "lucide-react"
import { toast } from "sonner"


function BatchManagement() {
  return (
    <>
    <Box className="w-full md:w-[98%] h-[90.5vh] md:h-full bg-white md:shadow-[0px_0px_20px] md:shadow-gray-500 md:rounded-md px-2 pt-2 md:p-5 flex flex-col justify-between">
      <Box className="w-full h-[10%]">
        <Box className="w-full h-full bg-slate-300 shadow-xl shadow-gray-400 rounded-md flex justify-between items-center p-4">
          <Typography variant="h2" sx={{fontWeight:"600",textShadow:"4px 4px 10px rgba(0,0,0,0.5)"}} className="!text-xl md:!text-2xl text-blue-600">Batch</Typography>
          <Box>
          <Button onClick={()=> toast.error("Currently this feature is not available")} sx={{bgcolor:"#2563eb"}} className="md:h-[45px] hover:bg-blue-700 hover:text-white"><Plus color="#ffffff"/></Button>
        </Box>
        </Box>
    </Box>

    <Box className="w-full h-[86%] overflow-y-scroll noBar bg-slate-300 p-2 md:p-5 shadow-xl shadow-gray-400 rounded-md flex flex-wrap items-center justify-center gap-2">
      <Typography className="!text-xl md:!text-6xl !font-bold text-gray-400">No Batch Yet</Typography>
    </Box>
   </Box>
    </>
  )
}

export default BatchManagement