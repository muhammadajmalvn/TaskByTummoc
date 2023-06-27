import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import NotFound from './Pages/NotFound';
import Cities from './Pages/User/Cities/Cities';

const Signup = lazy(() => import('./Pages/User/Signup/Signup'))
const Login = lazy(() => import('./Pages/User/Login/Login'))
const Homepage = lazy(() => import('./Pages/User/Homepage/Homepage'))

const App = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div>
      <Router>
        <Suspense fallback={<div className="vh-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status" />
          <span>Loading</span>
        </div>
        }>
          <Routes>
            <Route path='/' element={userData ? <Homepage /> : <Login />} />
            <Route path='/signup' element={userData ? <Navigate to='/' /> : <Signup />} />
            <Route path='/login' element={userData ? <Navigate to='/' /> : <Login />} />
            <Route path='/cities' element={userData ? <Cities /> : <Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  )
}

export default App

