'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import {login, logout} from "@/components/auth/authentication"
import { useSession } from 'next-auth/react';
import { House, Compass, Sun, BriefcaseBusiness, Moon} from 'lucide-react';
import { Mybutton } from "./button";

import { useTheme } from "next-themes";

function Navbar() {
    
    const [accisOpen, setaccIsOpen] = useState(false);
    const [MenuisOpen, MenusetIsOpen] = useState(false);
    const { data: currentsession, status } = useSession();
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
    const logoSrc = theme === 'dark' ? '/websitelogowhite.svg' : '/websitelogo.svg';

    const handleCloseWithDelay = () => {
     setTimeout(() => MenusetIsOpen(false), 150); 
    };

    const handleLogin = async () => {
        const currentPath = window.location.pathname + window.location.search;
        await login(currentPath);
    };

    const handleLogout = async () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('requestedAdminAccess');
        }
        const currentPath = window.location.pathname + window.location.search;
        await logout(currentPath);
    };

    if (status === 'loading') return null;
    
    return(
        <nav className="sticky top-0 z-50 backdrop:blur-xl">
            <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-1 px-4 md:px-8 py-3" style={{ boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(7.5px)', background: 'rgba(255, 255, 255, 0.3)'}}>
                <div className="flex flex-row items-center space-x-2 md:space-x-3">
                    <div className="text-xl md:hidden" onClick={() => MenusetIsOpen(!MenuisOpen)}>☰</div>
                    <Link href={"/"}>
                        <div className="inline-flex items-center space-x-2 h-8">
                            <Image 
                            src={logoSrc}
                            alt="navlogo"
                            width={40}
                            height={30}
                            className="self-center object-contain"
                            />
                            <h1 className="hidden md:block md:text-md font-serif leading-none">Life Blog</h1>
                        </div>
                    </Link>

                    {/* <div className="w-full max-w-3xs space-y-2">
                        <form className="w-full">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4"/>
                                <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-8 px-2 py-1 border border-black rounded-md text-sm placeholder:text-xs placeholder-black focus:outline-none focus:ring-2 focus:ring-white"
                                // className="w-full pl-8 px-2 py-1 border border-[#d1d1d1] rounded-md text-sm placeholder:text-xs placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                            </div>
                        </form>
                    </div> */}
                </div>

                <div className="hidden md:flex flex-row space-x-2 justify-center items-end">
                    <Link href={"/"} className="group relative">
                        <div className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors duration-200">
                            <House className="w-4 h-4" />
                        </div>
                        <span className="absolute top-full mt-2 ml-2 whitespace-nowrap px-2 py-1 text-xs text-black bg-white dark:bg-[#ffffff4d] dark:text-white  rounded-md shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                            Home
                        </span>
                    </Link>
                    <Link href={"/blogfeed"} className="group relative">
                        <div className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors duration-200">
                            <Compass className="w-4 h-4" />
                        </div>
                        <span className="absolute top-full mt-2 ml-2 whitespace-nowrap px-2 py-1 text-xs text-black bg-white dark:bg-[#ffffff4d] dark:text-white rounded-md shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                            Blog Feed
                        </span>                        
                    </Link>
                    <a href={"https://azis-agantal-personal-portfolio.vercel.app"} target="_blank" rel="noopener noreferrer" className="group relative">                       
                        <div className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors duration-200">               
                            <BriefcaseBusiness className="w-4 h-4" />                   
                        </div>                        
                        <span className="absolute top-full mt-2 ml-2 whitespace-nowrap px-2 py-1 text-xs text-black bg-white dark:bg-[#ffffff4d] dark:text-white rounded-md shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                            Portfolio
                        </span>                        
                    </a>
                    <div className="group relative cursor-pointer">
                        <div onClick={toggleTheme} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors duration-200">
                             {theme === "light" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </div>
                        <span className="absolute top-full mt-2 ml-2 whitespace-nowrap px-2 py-1 text-xs text-black bg-white dark:bg-[#ffffff4d] dark:text-white rounded-md shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                            Theme
                        </span>                        
                    </div>
                </div>

                <div className="flex flex-row justify-end">
                    {status === 'authenticated' ?
                        (

                            <div className="flex flex-row items-center">
                                <div onClick={toggleTheme} className="md:hidden flex items-center mr-3">
                                    {theme === "light" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                </div>
                                <Link href={"/createpost"}><Mybutton iconName="CirclePlus" iconPos="left" hidden="content" content="New Post" pxDefault="px-2" pxLg="lg:px-4" pyDefault="py-1.5" mrDefault="mr-3" mrMd="md:mr-5"/></Link>
                                <button onClick={() => setaccIsOpen(!accisOpen)} 
                                className="w-8 h-8 bg-cover bg-center rounded-full cursor-pointer" aria-expanded={accisOpen} aria-label="User menu" role="button" style={{ backgroundImage: `url(${currentsession?.user?.image ?? '/default.jpg'})` }}>
                                </button>
                                {accisOpen && (
                                    <div className={`absolute top-full right-5 rounded-b-xl shadow-lg transition-all duration-300 ease-in-out px-4 pt-5 pb-3 z-50 w-fit min-w-[8rem] 
                                            ${theme === 'light' ? 'semiglass-container' : 'glass-container'}`}>
                                        <div className="flex flex-col items-center gap-2 text-center">
                                        <span className="text-sm font-medium tracking-tight whitespace-nowrap">
                                            {currentsession?.user?.name}
                                        </span>
                                        <form action={handleLogout} className="w-full">
                                            <button
                                            type="submit"
                                            className="w-full text-sm font-medium text-red-700 py-1 px-3 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 active:bg-gray-200 focus:bg-gray-100 focus:outline-none transition-colors duration-200 text-center"
                                            >
                                            Sign Out
                                            </button>
                                        </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : 
                        (
                            
                            <div className="flex flex-row items-center">  
                                <div onClick={toggleTheme} className="cursor-pointer" >
                                    <div className="md:hidden mr-3">
                                        {theme === "light" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                    </div>
                                </div>         
                                <form action={handleLogin}>
                                    <Mybutton content="Sign In" pxDefault="px-3" pxLg="lg:px-5" pyDefault="py-1.5"/>
                                </form>
                            </div>

                        ) 
                    }                
                </div>               
            </div>
           
            {MenuisOpen && (
                <div className={`${theme === 'light' ? 'semiglass-container' : 'glass-container'} absolute top-full left-0 w-full rounded-b-xl shadow-md md:hidden transition-all duration-300 ease-in-out px-6 py-5 space-y-4 z-50`}>
                    <Link onClick={handleCloseWithDelay} href="/" className="block text-sm font-medium  hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-100 focus:outline-none px-3 py-2 rounded-md transition-colors duration-200">
                        Home
                    </Link>
                    <Link onClick={handleCloseWithDelay}  href="/blogfeed" className="block text-sm font-medium  hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-100 focus:outline-none px-3 py-2 rounded-md transition-colors duration-200">
                        Blog Feed
                    </Link>
                    <a href={"https://azis-agantal-personal-portfolio.vercel.app"} target="_blank" rel="noopener noreferrer" className="block text-sm font-medium hover:bg-gray-100 active:bg-gray-200 focus:bg-gray-100 focus:outline-none px-3 py-2 rounded-md transition-colors duration-200">
                        Portfolio
                    </a>
                </div>
            )}

 
        </nav>
    )
}
export default Navbar;

