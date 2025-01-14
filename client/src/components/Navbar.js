'use client';
import React, { useEffect } from 'react';
// import toast from 'react-hot-toast';
import { ModeToggle } from './ui/toggle-mode';
import { SignedIn, SignedOut, SignInButton, UserButton, useSignIn } from '@clerk/nextjs';
import { Github } from 'lucide-react';

export default function Navbar() {
    return (
        <div className="w-full flex border-b-2 h-[80px] fixed top-0 justify-between p-3 backdrop-blur-xl z-10">
            <div className="w-fit h-full flex justify-around items-center p-2">
                <img src="/logo.svg" width={90} height={90} alt="ChatBot Logo" />
                <p className='font-bold text-2xl'>ChatBot</p>
            </div>
            <div className="flex justify-center items-center gap-4">
                <SignedOut>
                    <SignInButton className="border-2 px-3 py-1.5 rounded-md" />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <a href='https://github.com/OmkarAnbhule/ChatBot'>
                    <Github className='hover:bg-slate-800 w-10 h-10 p-2 rounded-full' />
                </a>
                <ModeToggle />
            </div>
        </div>
    );
}
