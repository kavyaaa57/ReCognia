
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Menu, 
  Bell, 
  Settings, 
  User, 
  LogOut 
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from './Sidebar';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const { user, logout } = useAuth();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/chat':
        return 'Therapy Chat';
      case '/profile':
        return 'My Profile';
      case '/progress':
        return 'My Progress';
      case '/exercises':
        return 'Relaxation Exercises';
      case '/login':
        return 'Sign In';
      case '/register':
        return 'Create Account';
      default:
        return 'PTSD Neurorehabilitation';
    }
  };

  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthRoute) {
    return null;
  }

  // Get initials for avatar fallback
  const getInitials = (name: string = '') => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 bg-background">
                <Sidebar />
              </SheetContent>
            </Sheet>
          )}
          
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-therapeutic-lavender animate-pulse-gentle">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
            </div>
            <h1 className="text-xl font-semibold tracking-tight">NeuroCalm</h1>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <h2 className="hidden md:block text-lg font-medium">{getPageTitle()}</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-therapeutic-lavender"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar>
                  <AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-therapeutic-lavender text-white">
                    {user?.name ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background shadow-lg border rounded-md">
              <DropdownMenuLabel className="font-normal p-4 border-b">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email || ''}</p>
                </div>
              </DropdownMenuLabel>
              <div className="p-2">
                <DropdownMenuItem asChild className="rounded-md cursor-pointer p-2 focus:bg-muted hover:bg-muted">
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-md cursor-pointer p-2 focus:bg-muted hover:bg-muted">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem 
                  onClick={logout}
                  className="rounded-md cursor-pointer p-2 focus:bg-red-50 hover:bg-red-50 focus:text-red-600 hover:text-red-600 text-red-600 transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
