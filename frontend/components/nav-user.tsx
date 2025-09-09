"use client";

import { useEffect, useState } from "react";
import {
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { CardDemo } from "./NotificationCard";
// import { CardWithForm } from "./cardWithForm";

export function NavUser() {
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isMobile } = useSidebar();

  const [showCard] = useState(false);

  // const handleToggleCard = () => {
  //   setShowCard((prev) => !prev);
  // };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        setLoading(false);
        setError("No token found");
        return;
      }

      try {
        console.log(
          "API URL:",
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/user`
        );
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/user`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Response data:", data);

        if (response.ok) {
          setUser(data);
        } else {
          setError(data.msg || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // or use router.push('/login') if using next/router
  };

  const getInitials = (firstname: string, lastname: string) => {
    const first = firstname?.charAt(0).toUpperCase() || "";
    const last = lastname?.charAt(0).toUpperCase() || "";
    return `${first}${last}` || "CN";
  };

  if (loading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <div className="h-8 w-8 animate-pulse rounded-lg bg-muted" />
            <div className="ml-3 flex-1 space-y-1">
              <div className="h-3 w-24 animate-pulse rounded bg-muted" />
              <div className="h-2 w-16 animate-pulse rounded bg-muted-foreground" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (error) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <div className="text-red-600">{error}</div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage
                  // src={user.avatar || "https://i.pravatar.cc/150"}
                  alt={user.username}
                />
                <AvatarFallback className="rounded-lg">
                  {getInitials(user.firstname, user.lastname)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.username}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    // src={user.avatar || "https://i.pravatar.cc/150"}
                    alt={`${user.firstname} ${user.lastname}`}
                  />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(user.firstname, user.lastname)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.firstname} {user.lastname}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/account" className="flex items-center gap-2">
                  <IconUserCircle />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
              {showCard && (
                // <div style={{
                //   border: '1px solid #ccc',
                //   padding: '1rem',
                //   marginTop: '0.5rem',
                //   borderRadius: '8px',
                //   backgroundColor: '#fff',
                //   boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                // }}>
                <CardDemo />
                // </div>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
