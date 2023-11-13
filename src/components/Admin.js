import React from 'react'
import { Outlet,Link } from 'react-router-dom'
import Footer from './Footer'
const Admin = () => {
  return (
    <>
    <div className="flex flex-col min-h-screen">
    <nav className='bg-slate-700 text-white h-10 items-center p-2 flex flex-row space-x-10'>
      <Link to={'/'} className='hover:text-orange-400'>Home</Link>
      <Link to={'product'} className='hover:text-orange-400'>Products</Link>
      <Link to={'order'} className='hover:text-orange-400'>Orders</Link>
      <Link to={'customer'} className='hover:text-orange-400'>Customers</Link>
    </nav>

    <div className="flex-1">
      {/* Your main content goes here */}
      <Outlet />
    </div>
  </div>
  <Footer />
    </>
  )
}

export default Admin