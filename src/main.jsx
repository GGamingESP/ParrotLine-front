import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import About_us from './assets/pages/About_us.jsx'
import Login from './assets/pages/Login.jsx'
import Privacy from './assets/pages/Privacy.jsx'
import Not_found from './assets/pages/Not_found.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/About_us",
    element: <About_us />
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/Privacy",
    element: <Privacy />
  },
  {
    path: "*",
    element: <Not_found />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
