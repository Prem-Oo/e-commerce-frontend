import SearchBar from './SearchBar';
import logo from './AppLogo.png'
import {Link, useNavigate} from 'react-router-dom'

import UserContext from '../utils/UserContext';
import CartContext from '../utils/CartContext'
import { useContext } from 'react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
const Header=({setSearch})=>{

  const {loggedInUserData,setLoggedInUserData,isLoggedIn,setIsLoggedIn}=useContext(UserContext);

  const{count}=useContext(CartContext);
  const navigate=useNavigate();
  const logout=()=>{
    setIsLoggedIn(false);
    setLoggedInUserData({name:'Guest',email:'guest@gmail.com'});
    navigate('/')
  }


     return <>
  <nav className='bg-slate-700 h-14 m-1 flex flex-row items-center justify-between '>
  <div >
    <Link> <img className='w-14 rounded-md m-1' src={logo} alt='logo'/></Link>
  </div>
   <SearchBar setSearch={setSearch}/>

 
  <div className='m-1 p-2 flex flex-row sm:text-xs lg:text-sm'>
    <span className='m-1 p-1 text-white border-2 rounded-md border-blue-700 hover:border-blue-500  space-x-4'>
      <Link to="/adminLogin">AdminLogin</Link>
    </span>
    {isLoggedIn ? (
    <span className="m-1 p-1 border-2 text-white rounded-md transition-colors border-blue-700 hover:border-blue-500 space-x-4">
      <button onClick={logout}>Logout {loggedInUserData.name}</button>
    </span>
     ) : (
    <span className="m-1 p-1 border-2 text-white rounded-md border-red-400 space-x-4">
      <Link to="/signIn">Sign In</Link>
    </span>
     )}
     {isLoggedIn?(<span className='m-1 p-1 text-white border-2 rounded-md border-blue-700 hover:border-blue-500  space-x-4'><Link to={"/orders"}>Orders</Link> </span>)
     :(<button className='m-1 p-1 text-white border-2  rounded-md border-blue-700 hover:border-blue-500   space-x-4' onClick={() => alert('Please log in to proceed to orders')}>Orders</button>)}
      <span className='m-1 p-1 text-white border-2 rounded-md border-blue-700 hover:border-blue-500  space-x-4'><Link to={"/cart"}> <ShoppingBasketIcon/>{count}</Link> </span>
     
  </div>
  </nav>
    </>
}
export default Header;
