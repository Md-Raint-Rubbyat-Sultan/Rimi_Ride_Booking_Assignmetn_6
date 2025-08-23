import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { auhtApi, useLogoutMutation } from "@/redux/feature/auth/auth.api";
import { useGetMeQuery } from "@/redux/feature/user/user.api";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { ModeToggle } from "./ModeToggle";
import { useAppDispatch } from "@/redux/hooks";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "public" },
  { href: "/about", label: "About", role: "public" },
  { href: "/features", label: "Features", role: "public" },
  { href: "/contacts", label: "Contacts", role: "public" },
  { href: "/faq", label: "FAQ", role: "public" },
  { href: "/admin/user-management", label: "Dashboard", role: "admin" },
  { href: "/user/ride-history", label: "Dashboard", role: "user" },
  { href: "/driver/ride-requests", label: "Dashboard", role: "driver" },
];

const Navbar = () => {
  const { data: user } = useGetMeQuery(undefined);
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log(user);

  const handleLogout = async () => {
    const toastId = toast.loading("Loged In...");
    try {
      const result = await logout(undefined).unwrap();
      console.log(result);
      if (result.success) {
        toast.success(result.message, { id: toastId });
        dispatch(auhtApi.util.resetApiState());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error((error as any).data?.message, { id: toastId });
    }
  };

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) =>
                    link.role === "public" ? (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ) : (
                      link.role === user?.data?.role?.toLocaleLowerCase() && (
                        <NavigationMenuItem key={index}>
                          <NavigationMenuLink
                            asChild
                            className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                          >
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )
                    )
                  )}
                  <Button variant={"default"} asChild>
                    <Link to={"/book-ride"}>Book A Ride</Link>
                  </Button>
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to={"/"} className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) =>
                  link.role === "public" ? (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        asChild
                        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                      >
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ) : (
                    link.role === user?.data?.role?.toLocaleLowerCase() && (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  )
                )}
                <Button variant={"default"} asChild>
                  <Link to={"/book-ride"}>Book A Ride</Link>
                </Button>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button asChild className="text-sm">
            <ModeToggle />
          </Button>
          {!user && (
            <Button asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
          {user?.data?.email && (
            <Button
              variant={"outline"}
              type="button"
              className="text-sm"
              onClick={handleLogout}
              disabled={logoutLoading}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
