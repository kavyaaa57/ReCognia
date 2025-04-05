
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

type TherapySession = {
  id: string;
  date: string;
  title: string;
  notes: string;
  stressLevel: number;
};

type Progress = {
  stressManagement: number;
  emotionalRegulation: number;
  traumaProcessing: number;
  sleepQuality: number;
};

type User = {
  name: string;
  email: string;
  joinDate: string;
  therapySessions: TherapySession[];
  progress: Progress;
  streak: number;
  totalSessions: number;
  completedSessions: number;
  emailVerified: boolean;
  avatar?: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProgress: (progress: Partial<Progress>) => void;
  addTherapySession: (session: Omit<TherapySession, 'id'>) => void;
  updateUserProfile: (userData: Partial<User>) => void;
  sendVerificationEmail: (email: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateAvatar: (avatarUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    const storedUser = localStorage.getItem('user');
    
    if (auth && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Ensure user data is always synced with localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  // Helper function to ensure user data is synchronized between state, localStorage, and registeredUsers
  const syncUserData = (updatedUser: User) => {
    // Update local state
    setUser(updatedUser);
    
    // Update localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update in registeredUsers
    const storedUsers = localStorage.getItem('registeredUsers');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const userIndex = users.findIndex((u: { email: string }) => u.email === updatedUser.email);
      
      if (userIndex !== -1) {
        // Preserve the password if it exists
        const currentUserData = users[userIndex];
        users[userIndex] = {
          ...currentUserData,
          ...updatedUser
        };
        localStorage.setItem('registeredUsers', JSON.stringify(users));
      }
    }
  };

  const updateUserProgress = (progress: Partial<Progress>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      progress: {
        ...user.progress,
        ...progress
      }
    };
    
    syncUserData(updatedUser);
    
    toast({
      title: "Progress updated",
      description: "Your therapy progress has been updated.",
    });
  };

  const addTherapySession = (session: Omit<TherapySession, 'id'>) => {
    if (!user) return;
    
    const newSession = {
      ...session,
      id: `session-${Date.now()}`
    };
    
    const updatedUser = {
      ...user,
      therapySessions: [...user.therapySessions, newSession],
      completedSessions: user.completedSessions + 1,
      streak: user.streak + 1
    };
    
    syncUserData(updatedUser);
    
    toast({
      title: "Session recorded",
      description: "Your therapy session has been saved.",
    });
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      ...userData
    };
    
    syncUserData(updatedUser);
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated.",
    });
  };
  
  const updateAvatar = (avatarUrl: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      avatar: avatarUrl
    };
    
    syncUserData(updatedUser);
    
    toast({
      title: "Avatar updated",
      description: "Your profile picture has been updated.",
    });
  };

  const sendVerificationEmail = async (email: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Verification email sent",
        description: "Please check your inbox and follow the verification link.",
      });
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "There was an error sending the verification email. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const storedUsers = localStorage.getItem('registeredUsers');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const userExists = users.some((user: { email: string }) => user.email === email);
      
      if (!userExists) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
          title: "Password reset email sent",
          description: "If an account exists with that email, you'll receive reset instructions.",
        });
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Password reset email sent",
        description: "Please check your inbox for instructions to reset your password.",
      });
      
      console.log(`Password reset email sent to ${email} with token: reset-${Date.now()}`);
      console.log(`Reset link would be: https://yourapp.com/reset-password?token=reset-${Date.now()}&email=${encodeURIComponent(email)}`);
    } catch (error) {
      toast({
        title: "Reset request failed",
        description: "There was an error sending the reset email. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Password updated",
        description: "Your password has been successfully changed.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your password. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const storedUsers = localStorage.getItem('registeredUsers');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const foundUser = users.find((user: any) => user.email === email);
      
      if (!foundUser) {
        toast({
          title: "Login failed",
          description: "No account found with this email. Please register first.",
          variant: "destructive",
        });
        throw new Error("Account not found");
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Make sure we get all the stored data for the user
      const userData: User = foundUser;
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      
      toast({
        title: "Login successful",
        description: "Welcome back to NeuroCalm!",
      });
      
      navigate('/dashboard');
    } catch (error) {
      if ((error as Error).message !== "Account not found") {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const storedUsers = localStorage.getItem('registeredUsers');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      if (users.some((user: { email: string }) => user.email === email)) {
        toast({
          title: "Registration failed",
          description: "An account with this email already exists. Please use a different email or login.",
          variant: "destructive",
        });
        throw new Error("Email already in use");
      }
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const currentDate = new Date().toISOString();
      const newUser: User = { 
        name, 
        email,
        joinDate: currentDate.split('T')[0],
        therapySessions: [],
        progress: {
          stressManagement: 10,
          emotionalRegulation: 5,
          traumaProcessing: 0,
          sleepQuality: 25
        },
        streak: 1,
        totalSessions: 30,
        completedSessions: 1,
        emailVerified: false
      };
      
      // Store the complete user data in registeredUsers
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setUser(newUser);
      setIsAuthenticated(true);
      
      await sendVerificationEmail(email);
      
      toast({
        title: "Registration successful",
        description: "Welcome to NeuroCalm! Your account has been created.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      if ((error as Error).message !== "Email already in use") {
        toast({
          title: "Registration failed",
          description: "There was an error creating your account. Please try again.",
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    setUser(null);
    setIsAuthenticated(false);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      register, 
      logout,
      updateUserProgress,
      addTherapySession,
      updateUserProfile,
      sendVerificationEmail,
      resetPassword,
      updatePassword,
      updateAvatar
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
