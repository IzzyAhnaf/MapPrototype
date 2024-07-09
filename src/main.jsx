import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MapPages from './Pages/MapPage.jsx'
import ResultPages from './Pages/ResultPage.jsx'

const router = createBrowserRouter([
  {
    path: '/MapPrototype/',
    element: <App />,
    children: [{
      path: '/MapPrototype/Map',
      element: <MapPages />,
    },{
      path: '/MapPrototype/Result',
      element: <ResultPages />,
    }],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
