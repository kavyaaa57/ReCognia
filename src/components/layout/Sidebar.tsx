
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, MessageCircle, User, Activity, HeartPulse, LogOut, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  
  // Get initials for avatar
  const getInitials = (name: string = '') => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const mainNavItems: NavItem[] = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: 'Therapy Chat',
      path: '/chat',
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      name: 'My Progress',
      path: '/progress',
      icon: <Activity className="h-5 w-5" />,
    },
    {
      name: 'Exercises',
      path: '/exercises',
      icon: <HeartPulse className="h-5 w-5" />,
    },
    {
      name: 'Session History',
      path: '/history',
      icon: <History className="h-5 w-5" />,
    },
    {
      name: 'My Profile',
      path: '/profile',
      icon: <User className="h-5 w-5" />,
    },
  ];

  return (
    <aside className="fixed top-0 left-0 z-30 flex flex-col h-screen w-64 border-r bg-background shadow-sm">
      <div className="p-6 mt-14"> {/* Added mt-14 to account for the header height */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-therapeutic-lavender animate-pulse-gentle">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">NeuroCalm</h1>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {mainNavItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-therapeutic-lavender hover:bg-opacity-10 hover:text-therapeutic-lavender",
              location.pathname === item.path ? "bg-therapeutic-lavender bg-opacity-10 text-therapeutic-lavender" : "text-foreground"
            )}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
      
      <div className="mt-auto p-4 sticky bottom-0 bg-background">
        <Separator className="mb-4" />
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3 p-2 rounded-md bg-muted/30">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
              <AvatarFallback className="bg-therapeutic-lavender text-white">
                {user?.name ? getInitials(user.name) : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[120px]">{user?.email || ""}</p>
            </div>
          </div>
          
          <Button 
            onClick={logout} 
            variant="outline" 
            className="w-full flex items-center gap-2 text-muted-foreground hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
