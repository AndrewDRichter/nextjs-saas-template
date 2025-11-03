"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  LayoutDashboard,
  List,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/app/(public)/_components/theme-toggle";
import logoImage from "../../../../../public/logo-odonto.png";
import Image from "next/image";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <aside
        // Opção de abertura da sidebar, ao passar o mouse em cima.
        // onMouseEnter={() => setIsCollapsed(false)}
        // onMouseLeave={() => setIsCollapsed(true)}
        className={clsx(
          "flex flex-col border-r bg-background transition-all duration-300 p-4 h-full",
          {
            "w-20 items-center": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          }
        )}
      >
        <div className="mb-6 mt-4">
          {!isCollapsed && (
            <Image src={logoImage} alt="Company logo" priority quality={100} />
          )}
        </div>

        <Button
          className="bg-gray-200 hover:bg-gray-50 text-zinc-900 self-end mb-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="w-12 h-12" />
          ) : (
            <ChevronLeft className="w-12 h-12" />
          )}
        </Button>

        {isCollapsed && (
          <nav className="flex flex-col gap-1 overflow-hidden">
            <SidebarLink
              href="/dashboard"
              icon={<LayoutDashboard />}
              label="Agendamentos"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/dashboard/services"
              icon={<FolderOpen />}
              label="Serviços"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />

            <SidebarLink
              href="/dashboard/profile"
              icon={<User2Icon />}
              label="Perfil"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <SidebarLink
              href="/dashboard/plans"
              icon={<Banknote />}
              label="Planos"
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
          </nav>
        )}

        <Collapsible open={!isCollapsed}>
          <CollapsibleContent>
            <nav className="flex flex-col gap-1 overflow-hidden">
              <span className="text-sm text-gray-700 dark:text-gray-500 font-medium mt-1 uppercase">
                Painel
              </span>

              <SidebarLink
                href="/dashboard"
                icon={<LayoutDashboard />}
                label="Agendamentos"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/dashboard/services"
                icon={<FolderOpen />}
                label="Serviços"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />

              <span className="text-sm text-gray-700 dark:text-gray-500 font-medium mt-1 uppercase">
                Conta
              </span>

              <SidebarLink
                href="/dashboard/profile"
                icon={<User2Icon />}
                label="Perfil"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
              <SidebarLink
                href="/dashboard/plans"
                icon={<Banknote />}
                label="Planos"
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
            </nav>
          </CollapsibleContent>
        </Collapsible>

        {/* <ThemeToggle btnClass="" /> */}
      </aside>

      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed,
        })}
      >
        <header className="md:hidden flex items-center justify-between border-b px-4 md:px-6 h-14 z-10 sticky top-0 bg-white dark:bg-black">
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsCollapsed(false)}
                >
                  <List className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <h1 className="text-base md:text-lg font-semibold">
                Menu odontopro
              </h1>
            </div>

            <SheetContent side="left" className="sm:max-w-xs text-black p-5">
              <SheetTitle>OdontoPRO</SheetTitle>
              <SheetDescription>Menu admin</SheetDescription>
              <nav className="grid gap-2 text-base pt-5">
                <SidebarLink
                  href="/dashboard"
                  icon={<LayoutDashboard />}
                  label="Agendamentos"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
                <SidebarLink
                  href="/dashboard/services"
                  icon={<FolderOpen />}
                  label="Serviços"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
                <SidebarLink
                  href="/dashboard/profile"
                  icon={<User2Icon />}
                  label="Perfil"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
                <SidebarLink
                  href="/dashboard/plans"
                  icon={<Banknote />}
                  label="Planos"
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
              </nav>
              {/* <ThemeToggle btnClass="text-black dark:text-white" /> */}
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 py-4 px-2 md:p-6">{children}</main>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  isCollapsed: boolean;
}

function SidebarLink({
  href,
  icon,
  label,
  pathname,
  isCollapsed,
}: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
          {
            "text-white bg-blue-500": pathname === href,
            "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800":
              pathname !== href,
          }
        )}
      >
        <span className="w-6 h-6">{icon}</span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
