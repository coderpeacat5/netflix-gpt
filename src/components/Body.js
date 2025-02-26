import React from 'react'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './Login'

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/browse",
        element: <Browse />
    }
])


const Body = () => {
    

    

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body