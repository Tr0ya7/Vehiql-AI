"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react"

const Header = /* async */ ({ isAdminPage = false }: { isAdminPage?: boolean }) => { 
    const isAdmin = false
    
    return (
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
            <nav className="mx-auto p-4 flex justify-between items-center">
                <Link className="flex" href={ isAdminPage ? "/admin" : "/" }>
                    <Image className="w-auto h-12 object-contain" width="200" height="60" src="/logo.png" alt="Vehiql AI Logo" />
                    { isAdminPage && <span className="text-xs font-extralight">admin</span> }
                </Link>
                <div className="flex items-center space-x-4">
                    {isAdminPage
                        ? <Link href="/"><Button className="flex items-center gap-2" variant="outline"><ArrowLeft size="18" /><span>Back to App</span></Button></Link>
                        : <SignedIn><Link href="/saved-cars"><Button><Heart size="18" /><span className="hidden md:inline">Saved Cars</span></Button></Link>
                        {!isAdmin
                            ? <Link href="/reservations"><Button variant="outline"><CarFront size="18" /><span className="hidden md:inline">My Reservations</span></Button></Link>
                            : <Link href="/admin"><Button variant="outline"><Layout size="18" /><span className="hidden md:inline">My Reservations</span></Button></Link>
                        }
                        </SignedIn>
                    }
                    <SignedOut>
                        <SignInButton forceRedirectUrl="/">
                            <Button variant="outline">
                                Login
                            </Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton appearance={{ elements: { avatarBox: "size-10" } }} />
                    </SignedIn>
                </div>
            </nav>
        </header>
    )
}

export default Header