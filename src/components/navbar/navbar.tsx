"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, DoorOpen, LogIn, Menu, Nfc, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartButton } from "../cart/cart-button"



export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="shadow">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center jusfity-center gap-2 font-semibold ">
            <span className="font-semibold leading-relaxed text-xl ">GA Alberdi</span>
          </Link>
        </div>
 
        {/* Navegación desktop */}
        <div className="hidden md:flex md:items-center md:gap-6">
          
          <CartButton/>
          <div className="flex items-center gap-2">
           
          </div>
        </div>

        {/* Menú móvil */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 p-6 ">
              <div className="flex flex-col gap-4 pt-6">
              <Link href="/" className="text-sm font-medium transition-colors ">
                 Contacto
              </Link>
              <Link href="/" className="text-sm font-medium transition-colors ">
                Acerca de nosotros
              </Link>
              <Link href="/" className="text-sm font-medium transition-colors ">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}