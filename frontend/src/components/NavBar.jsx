import {  SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, UserProfile } from "@clerk/nextjs"
import { ArrowRightIcon } from "lucide-react"

export function NavBar() {
  return (
    <header className="flex py-12 md:py-6 shadow-xl  md:top-0 w-[130vh] md:w-full md:z-100 ">
      <nav className="flex justify-end md:items-center gap-4  md:container font-semibold mx-5">

      <SignedIn>
        <UserButton />
      </SignedIn>
        <SignedOut>
        <SignUpButton>
        <button className='px-2 py-1 text-xl md:text-lg  rounded-xl  bg-black hover:bg-white hover:text-black border border-black mr-10 flex'>
          Sign up <ArrowRightIcon className='size-5 mt-1 ml-1'/>
        </button>
      </SignUpButton>
        <SignInButton>
        <button className='px-2 py-1 text-xl md:text-lg  rounded-xl  bg-black hover:bg-white hover:text-black border border-black mr-10 flex'>
          Sign in <ArrowRightIcon className='size-5 mt-1 ml-1'/>
        </button>
      </SignInButton>
      </SignedOut>
      </nav>
    </header>
  )
}