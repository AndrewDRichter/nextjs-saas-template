"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LogIn } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useSession } from "next-auth/react";
import { handleProviderLogin } from "@/app/(public)/_actions/login";

export function Header() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#profissionais", label: "Profissionais" },
    { href: "#contatos", label: "Contatos" },
  ];

  async function handleLogin() {
    await handleProviderLogin();
  }

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.href}
          onClick={() => setIsOpen(false)}
          asChild
          className="bg-transparent hover:bg-transparent text-black dark:text-white shadow-none"
        >
          <Link href={item.href} className="text-base">
            {item.label}
          </Link>
        </Button>
      ))}

      {status === "loading" ? (
        <></>
      ) : session ? (
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 bg-zinc-900 text-white py-1 px-4 rounded-md mx-2"
        >
          Acessar painel
        </Link>
      ) : (
        <Button onClick={handleLogin} className="mx-6">
          <LogIn />
          Portal da clínica
        </Button>
      )}
    </>
  );

  return (
    <header className="fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-white dark:bg-black">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-bold text-zinc-900 dark:text-white"
        >
          Odonto<span className="text-emerald-500">PRO</span>
        </Link>

        <nav className="hidden md:flex items-center">
          <NavLinks />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              className="text-black dark:text-white hover:bg-transparent"
              variant="ghost"
              size="icon"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[240px] sm:w-[300px] z-[9999]"
          >
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Links</SheetDescription>

            <nav className="flex flex-col space-y-4 mt-6">
              <NavLinks />
            </nav>
            {/* <ThemeToggle btnClass="md:hidden" /> */}
          </SheetContent>
        </Sheet>
        {/* <ThemeToggle btnClass="hidden md:flex" /> */}
      </div>
    </header>
  );
}
