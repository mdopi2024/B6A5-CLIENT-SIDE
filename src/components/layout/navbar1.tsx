"use client";

import { Menu, UserPlus, LogIn, LogOut } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  menu = [
    { title: "Home", url: "/" },
    { title: "Rooms", url: "/rooms" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
}: Navbar1Props) => {
  const { data } = authClient.useSession();
  const router = useRouter();

  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <section className="sticky top-0 z-50 shadow-lg">
      {/* Thin gold accent bar at very top */}
      <div className="h-[3px] w-full bg-[#EF9F27]" />

      <div className="">
        {/* Desktop Menu */}
        <nav className="hidden mx-auto px-8 py-3 items-center bg-[#042C53] justify-between lg:flex">

          {/* Logo */}
          <Link
            href="/"
            className="flex justify-center items-center gap-3 hover:opacity-85 transition-opacity"
          >
            <div className="relative">
              <img
                src="/boshontologo.png"
                className="w-11 h-11 rounded-full border-2 border-[#EF9F27]"
                alt="boshontoLogo"
              />
              <div className="absolute inset-0 rounded-full ring-2 ring-[#EF9F27]/30 ring-offset-1 ring-offset-[#042C53]" />
            </div>
            <div className="flex flex-col leading-tight">
              <h1 className="text-xl font-bold text-white tracking-wide">Boshonto</h1>
              <span className="text-[10px] text-[#EF9F27] tracking-[0.2em] uppercase font-medium">
                Hotel & Dining
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex justify-center items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Buttons */}
          <div>
            {data?.session ? (
              <button
                onClick={handleLogOut}
                className="border border-[#EF9F27] text-[#EF9F27] px-5 py-2 text-sm font-semibold rounded
                           flex items-center gap-2
                           hover:bg-[#EF9F27] hover:text-[#042C53] transition-all duration-200 tracking-wide"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <div className="flex gap-3 items-center">
                <Link
                  href={auth.login.url}
                  className="text-sm font-semibold text-[#EF9F27]/90 hover:text-[#EF9F27] 
                             px-4 py-2 rounded border border-transparent flex items-center gap-2
                             hover:border-[#EF9F27]/40 transition-all duration-200 tracking-wide"
                >
                  <LogIn className="h-4 w-4" />
                  {auth.login.title}
                </Link>
                <Link
                  href={auth.signup.url}
                  className="text-sm font-bold bg-[#EF9F27] text-[#042C53] 
                             px-5 py-2 rounded tracking-wide flex items-center gap-2
                             hover:bg-[#FAC775] transition-all duration-200 shadow-md shadow-[#EF9F27]/20"
                >
                  <UserPlus className="h-4 w-4" />
                  {auth.signup.title}
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block py-3 px-4 bg-[#042C53] lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative">
                <img
                  src="/boshontologo.png"
                  className="h-10 w-10 rounded-full border-2 border-[#EF9F27]"
                  alt="Boshonto logo"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <h1 className="text-lg font-bold text-white tracking-wide">Boshonto</h1>
                <span className="text-[9px] text-[#EF9F27] tracking-[0.18em] uppercase font-medium">
                  Hotel & Dining
                </span>
              </div>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-[#EF9F27]/60 text-[#EF9F27] bg-transparent
                             hover:bg-[#EF9F27] hover:text-[#042C53] hover:border-[#EF9F27]
                             transition-all duration-200"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto bg-[#F1EFE8] border-l border-[#EF9F27]/30">
                <SheetHeader className="border-b border-[#042C53]/10 pb-4">
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <img
                        src="/boshontologo.png"
                        className="h-10 w-10 rounded-full border-2 border-[#042C53]"
                        alt="Boshonto logo"
                      />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[#042C53] font-bold text-base tracking-wide">Boshonto</span>
                        <span className="text-[9px] text-[#EF9F27] tracking-[0.15em] uppercase font-semibold">
                          Hotel & Dining
                        </span>
                      </div>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4 pt-6">
                  {/* Mobile Navigation Links */}
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-1"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  {/* Divider */}
                  <div className="h-px bg-[#042C53]/10" />

                  {/* Mobile Auth Buttons */}
                  <div>
                    {data?.session ? (
                      <button
                        onClick={handleLogOut}
                        className="border-2 border-[#042C53] text-[#042C53] px-4 py-2.5 
                                   hover:bg-[#042C53] hover:text-white font-semibold rounded
                                   transition-all duration-200 w-full tracking-wide text-sm
                                   flex items-center justify-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Button
                          asChild
                          variant="outline"
                          className="border-[#042C53] text-[#042C53] hover:bg-[#042C53] hover:text-white
                                     font-semibold tracking-wide transition-all duration-200"
                        >
                          <Link href={auth.login.url} className="flex items-center gap-2">
                            <LogIn className="h-4 w-4" />
                            {auth.login.title}
                          </Link>
                        </Button>
                        <Button
                          asChild
                          className="bg-[#EF9F27] text-[#042C53] hover:bg-[#FAC775]
                                     font-bold tracking-wide shadow-md shadow-[#EF9F27]/20 transition-all duration-200"
                        >
                          <Link href={auth.signup.url} className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            {auth.signup.title}
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link
          href={item.url}
          className="
            bg-transparent
            text-[#D3D1C7]
            hover:bg-[#EF9F27]
            hover:text-[#042C53]
            focus:bg-[#EF9F27]
            focus:text-[#042C53]
            data-[active=true]:bg-[#EF9F27]
            data-[active=true]:text-[#042C53]
            rounded
            px-4
            py-2
            text-sm
            font-semibold
            tracking-wide
            transition-all
            duration-200
          "
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem
        key={item.title}
        value={item.title}
        className="border-b border-[#042C53]/10"
      >
        <AccordionTrigger
          className="text-sm py-3 font-semibold text-[#042C53] 
                     hover:no-underline hover:text-[#EF9F27] tracking-wide transition-colors"
        >
          {item.title}
        </AccordionTrigger>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.title}
      href={item.url}
      className="text-sm font-semibold text-[#042C53] hover:text-[#EF9F27] 
                 py-3 px-1 transition-colors border-b border-[#042C53]/10 block tracking-wide"
    >
      {item.title}
    </Link>
  );
};

export { Navbar };