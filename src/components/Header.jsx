import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { MdMenu, MdClose } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { SidebarContext } from '../context/SidebarContext';
import { CartContext } from '../context/CartContext';


const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [isActive, setIsActive] = useState(false)
  const {isOpen, setIsOpen} = useContext(SidebarContext)
  const {itemQuantity} = useContext(CartContext)

  const navigate = useNavigate()

  const toggleMenu = ()=>{
    setMenuOpened(!menuOpened);
  };

  useEffect(()=>{
    window.addEventListener("scroll", ()=>{
      window.scrollY > 35 ? setIsActive(true) : setIsActive(false)
    })
  })

  return (
    <header className={`${isActive ? "bg-white shadow-sm py-3" : "bg-transparent py-4"} fixed left-0 right-0 w-full flex justify-between items-center p-4 z-10 transition-all duration-300`}>
      {/* logo */}
      <Link to={"/"} className='font-bold text-2xl'>
        <h4>Shop<span className="text-secondary">Nest</span></h4>
      </Link>
      {/* navbar */}
      <div className='flex items-center gap-x-4'>
        {/* navbar desktop */}
        <Navbar containerStyles={"hidden md:flex gap-x-5 xl:gap-x-10 medium-15"} />
        <Navbar containerStyles={`${menuOpened ? "flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300" : "hidden"}`}/>
        <div className="flex items-center gap-x-4 sm:gap-x-8">
          {/* buttons */}
          {!menuOpened ? (
            <MdMenu onClick={toggleMenu} className="md:hidden cursor-pointer hover:text-secondary text-2xl" />
          ) : (
            <MdClose onClick={toggleMenu} className="md:hidden cursor-pointer hover:text-secondary text-2xl" />
          )}
          <div onClick={()=>setIsOpen(!isOpen)} className="flex relative">
            <GiShoppingBag className="text-[25px]" />
            <span className="bg-secondary text-white text-sm absolute -top-2.5 -right-2.5 flex items-center justify-center w-5 h-5 rounded-full shadow-md">
              {itemQuantity}
            </span>
          </div>
          <button className='btn-outline rounded-full'>Login</button>
        </div>
      </div>
    </header>
  )  
}

export default Header
