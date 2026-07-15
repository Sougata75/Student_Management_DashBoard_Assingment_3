import { Box, Container, Typography } from "@mui/material"
import Login from "./Login"
import { useState } from "react"
import Registration from "./Registration";

function Home() {
  const [formChanger,setFormChanger] = useState<boolean>(false);
  return (
    <>
    <div className="w-full h-[100vh] bg-gray-950 flex justify-center items-center">
      <Container sx={{width:"300px", padding: 4, bgcolor:"white",borderRadius:"10px",display:"flex",flexWrap:"wrap",gap:"20px"}}>
        <Box className="w-full h-[70px] bg-black/40 rounded-md flex justify-center items-center">
            <Typography className="!text-white !font-bold !text-2xl">Management.Lab</Typography>
            </Box>
      {formChanger? <Registration/>: <Login/>}
      <Box sx={{width:"100%",height:"1px",bgcolor:"gray"}}></Box>
      <Box sx={{width:"100%" ,display:"flex",justifyContent:"space-between"}}>
        <Typography  className="!text-[15px] md:!text-[16px]">{formChanger? "Already have an account?":"Don't have an account ?"}</Typography>
        <Typography onClick={() => setFormChanger((prev)=> !prev)} sx={{cursor:"pointer",color:"blue"}} className="!text-[15px] md:!text-[16px]">{formChanger? "Log In":"Register"}</Typography>
      </Box>
      </Container>
    </div>
    </>
  )
}

export default Home