import { RouterProvider } from 'react-router-dom'
import './App.css'
import { Toaster } from "sonner"
import Routes from './route/Router'
import AppwriteContextProvider from './contextApi/appwriteDataFetching/AppwriteContextProvider'

function App() {


  return (
    <>
    <AppwriteContextProvider>
    <Toaster richColors closeButton position='top-right'/>
    <RouterProvider router={Routes}/>
    </AppwriteContextProvider>
    </>
  )
}

export default App
