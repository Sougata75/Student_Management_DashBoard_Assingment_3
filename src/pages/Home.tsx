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
      {formChanger? <Registration/>: <Login/>}
      <Box sx={{width:"100%",height:"1px",bgcolor:"gray"}}></Box>
      <Box sx={{width:"100%" ,display:"flex",justifyContent:"space-between"}}>
        <Typography sx={{fontSize:"16px"}}>{formChanger? "Already have an account?":"Don't have an account ?"}</Typography>
        <Typography onClick={() => setFormChanger((prev)=> !prev)} sx={{fontSize:"16px",cursor:"pointer",color:"blue"}}>{formChanger? "Log In":"Register"}</Typography>
      </Box>
      </Container>
    </div>
    </>
  )
}

export default Home