import { RouterProvider } from 'react-router-dom'
import './App.css'
import { Toaster } from "sonner"
import Routes from './route/Router'
import AppwriteContextProvider from './contextApi/appwriteDataFetching/AppwriteContextProvider'
import CourseContextProvider from './contextApi/coursesData/CourseContextProvider'

function App() {


  return (
    <>
    <AppwriteContextProvider>
      <CourseContextProvider>
    <Toaster richColors closeButton position='top-right'/>
    <RouterProvider router={Routes}/>
    </CourseContextProvider>
    </AppwriteContextProvider>
    </>
  )
}

export default App
