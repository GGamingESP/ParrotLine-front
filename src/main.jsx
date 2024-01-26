import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import About_us from './assets/pages/About_us.jsx'
import Login from './assets/pages/Login.jsx'
import Privacy from './assets/pages/Privacy.jsx'
import Not_found from './assets/pages/Not_found.jsx'
import Create_account from './assets/pages/Create_account.jsx'
import Forgot_password from './assets/pages/Forgot_password.jsx'
import Web from './assets/pages/Web.jsx'


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
    path: "/Create_account",
    element: <Create_account />
  },
  {
    path: "/Forgot_password",
    element: <Forgot_password />
  },
  {
    path: "/Web",
    element: <Web />
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
