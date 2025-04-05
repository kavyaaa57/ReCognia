
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call the auth context's resetPassword method
      await resetPassword(email);
      
      // Set emailSent to true to show the success view
      setEmailSent(true);
    } catch (error) {
      toast({
        title: "Request failed",
        description: "There was an error sending the recovery email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center therapeutic-gradient p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-therapeutic-lavender animate-pulse-gentle">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-3xl">N</span>
              </div>
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-therapeutic-charcoal">NeuroCalm</h1>
          <p className="mt-2 text-sm text-therapeutic-charcoal/70">Your AI-powered PTSD Neurorehabilitation companion</p>
        </div>
        
        <Card className="therapeutic-card">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              {!emailSent 
                ? "Enter your email and we'll send you instructions to reset your password" 
                : "Recovery instructions sent"}
            </CardDescription>
          </CardHeader>
          
          {!emailSent ? (
            <form onSubmit={handleResetPassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 therapeutic-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-therapeutic-lavender hover:bg-therapeutic-lavender/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Instructions"}
                </Button>
                <p className="text-sm text-center text-therapeutic-charcoal/70">
                  Remember your password?{" "}
                  <Link to="/login" className="text-therapeutic-lavender hover:underline">
                    Back to login
                  </Link>
                </p>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-6 pt-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    We've sent recovery instructions to your email
                  </p>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Please check your inbox and follow the instructions in the email.
                  If you don't see it, check your spam folder.
                </p>
                
                <div className="pt-4">
                  <Link 
                    to="/login" 
                    className="text-therapeutic-lavender hover:underline text-sm font-medium"
                  >
                    Return to login
                  </Link>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
        
        <p className="text-xs text-center text-therapeutic-charcoal/50">
          NeuroCalm - Secure Password Recovery
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
