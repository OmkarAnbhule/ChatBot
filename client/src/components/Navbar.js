'use client';
import React, { useEffect } from 'react';
// import toast from 'react-hot-toast';
import { ModeToggle } from './ui/toggle-mode';
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton, useSignIn, useSignUp } from '@clerk/nextjs';
import { Github } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/userSlice';

export default function Navbar() {
    const { isLoaded: isLoginLoaded } = useSignIn()
    const { isLoaded: isSignupLoaded } = useSignUp()
    const dispatch = useDispatch()
    const { userId } = useAuth()
    const updateUser = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/store_user_data/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clerk_user_id: userId,
                }),
            })
            const { user_id } = await response.json();
            dispatch(setUser({
                authenticated: true,
                user_id,
                clerk_user_id: userId
            }))
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if (isSignupLoaded || isLoginLoaded) {
            updateUser()
        }
    }, [isSignupLoaded, isLoginLoaded])
    return (
        <div className="w-full flex border-b-2 h-[80px] border-gray-600 fixed top-0 justify-between p-3 backdrop-blur-xl z-10">
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
                    <Github className='dark:hover:bg-slate-800 hover:bg-slate-300 w-10 h-10 p-2 rounded-full' />
                </a>
                <ModeToggle />
            </div>
        </div>
    );
}
