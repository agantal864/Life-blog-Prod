'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import {login, logout} from "@/components/auth/authentication"
import { useSession } from 'next-auth/react';
import { House, Compass, Sun, BriefcaseBusiness, CirclePlus , Search  } from 'lucide-react';
import { Mybutton } from "./button";

function Navbar() {
    const [accisOpen, setaccIsOpen] = useState(false);
    const [MenuisOpen, MenusetIsOpen] = useState(false);
    const { data: currentsession, status } = useSession();

    if (status === 'loading') return null;

    return(
        <nav className="sticky top-0 z-50 backdrop:blur-xl">
            <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-1 px-4 md:px-8 py-3" style={{ boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(7.5px)', background: 'rgba(255, 255, 255, 0.3)'}}>
                <div className="flex flex-row items-center space-x-2 md:space-x-3">
                    <div className="text-xl md:hidden" onClick={() => MenusetIsOpen(!MenuisOpen)}>☰</div>
                    <Link href={"/"}>
                        <Image 
                        src="/websitelogo.svg"
                        alt="navlogo"
                        width={40}
                        height={30}
                        className="object-contain"
                        />
                    </Link>
                    <div className="w-full max-w-3xs space-y-2">
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
                    </div>
                </div>

                <div className='hidden md:flex justify-center items-end'>                 
                        <div className="flex flex-row space-x-5 items-center">
                            {/* <Link href={"/"}><House className="text-[#71717b] w-4 h-4"/></Link> */}
                            <Link href={"/"}><House className="w-4 h-4"/></Link>
                            <Link href={"/blogfeed"}><Compass className="w-4 h-"/></Link>
                            <Link href={"/"}><BriefcaseBusiness className="w-4 h-"/></Link>
                            <Link href={"/"}><Sun className="w-4 h-"/></Link>               
                        </div>
                </div>
                <div className="flex flex-row justify-end">
                    {status === 'authenticated' ?
                        (

                            <div className="relative flex flex-row">
                                <div className="md:hidden flex items-center mr-3"><Sun className="text-[#71717b] w-4 h-4"/> </div>
                                <Link href={"/createpost"}><Mybutton iconName="CirclePlus" iconPos="left" hidden="content" content="New Post" pxDefault="px-2" pxLg="lg:px-4" pyDefault="py-1.5" mrDefault="mr-3" mrMd="md:mr-5"/></Link>
                                <button onClick={() => setaccIsOpen(!accisOpen)} 
                                className="w-8 h-8 bg-cover bg-center rounded-full cursor-pointer" aria-expanded={accisOpen} aria-label="User menu" role="button" style={{ backgroundImage: `url('${currentsession?.user?.image}')` }}>
                                </button>
                                {accisOpen &&
                                    (
                                        <div className="absolute top-full right-0 w-40 flex flex-col items-start space-y-2 px-6 py-4 mt-4 rounded-lg bg-white font-normal transition-all duration-300 ease-in-out"
                                        style={{ boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.25)' }}>
                                            <h1 className="font-serif text-lg font-light mb-3">{currentsession?.user?.name}</h1>
                                            <form action={logout}>
                                                <button type="submit" className="cursor-pointer font-bold">
                                                    Sign Out
                                                </button>
                                            </form>
                                        </div>
                                    )   
                                }
                            </div>

                        ) : 
                        (
                            <div className="flex flex-row">
                            <div className="md:hidden flex items-center mr-3"><Sun className="text-[#71717b] w-4 h-4"/> </div>
                            <form action={login}>
                                <Mybutton content="Sign In" pxDefault="px-3" pxLg="lg:px-5" pyDefault="py-1.5"/>
                            </form>
                            </div>

                        ) 
                    }                
                </div>               
            </div>

            {MenuisOpen && 
                (
                    <div className="bg-white flex flex-col items-start font-normal md:hidden transition-all duration-300 ease-in-out space-y-4 px-4 py-3" >
                        <Link href={'/'}>Home</Link>
                        <Link href={'/blogfeed'}>Blog Feed</Link>
                        <Link href={'/'}>Portfolio</Link>
                    </div>
                )
            }
 
        </nav>
    )
}
export default Navbar;