import { RouterProvider } from 'react-router-dom'
import './App.css'
import { Toaster } from "sonner"
import Routes from './route/Router'

function App() {


  return (
    <>
    <Toaster richColors closeButton position='top-right'/>
    <RouterProvider router={Routes}/>
    </>
  )
}

export default App
