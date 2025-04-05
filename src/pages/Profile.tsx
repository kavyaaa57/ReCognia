import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, Bell, Lock, FileText, Phone, Shield, Calendar, Camera } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const Profile = () => {
  const { user, updateUserProfile, updateAvatar } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      emergencyContact: 'Sarah Johnson',
      emergencyPhone: '+1 (555) 987-6543',
    },
  });
  
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        phone: form.getValues('phone'),
        emergencyContact: form.getValues('emergencyContact'),
        emergencyPhone: form.getValues('emergencyPhone'),
      });
    }
  }, [user, form]);
  
  const [securityInfo, setSecurityInfo] = useState({
    password: '••••••••',
    twoFactorEnabled: true,
  });
  
  const [notifications, setNotifications] = useState({
    sessionReminders: true,
    progressUpdates: true,
    exerciseReminders: false,
    newsletterUpdates: false,
  });
  
  const [therapist, setTherapist] = useState({
    name: 'Dr. Emily Chen',
    email: 'dr.chen@example.com',
    phone: '+1 (555) 234-5678',
    nextAppointment: 'June 15, 2024 at 2:00 PM',
  });
  
  const onSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      updateUserProfile({
        name: values.name,
        email: values.email
      });
      
      toast({
        title: "Changes saved",
        description: "Your profile information has been updated.",
      });
    } catch (error) {
      toast({
        title: "Failed to save changes",
        description: "There was an error updating your profile information.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNotificationChange = (key: keyof typeof notifications, checked: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: checked }));
  };
  
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      
      updateAvatar(base64String);
      setIsLoading(false);
    };
    
    reader.onerror = () => {
      toast({
        title: "Upload failed",
        description: "There was an error processing your image.",
        variant: "destructive",
      });
      setIsLoading(false);
    };
    
    reader.readAsDataURL(file);
  };
  
  const getInitials = (name: string = '') => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  if (!user) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading profile...</h2>
          <p className="text-muted-foreground">Please wait while we retrieve your information</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="flex flex-wrap justify-start gap-2 p-0 bg-transparent">
          <TabsTrigger value="personal" className="flex items-center gap-2 data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white">
            <User className="h-4 w-4" />
            <span>Personal Info</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white">
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="therapist" className="flex items-center gap-2 data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white">
            <FileText className="h-4 w-4" />
            <span>Therapist</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Manage your personal details and contact information
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
                        <AvatarImage src={user?.avatar || ""} alt="Profile" />
                        <AvatarFallback className="text-2xl bg-therapeutic-lavender text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div 
                        className="absolute bottom-0 right-0 bg-therapeutic-lavender text-white rounded-full p-1 cursor-pointer"
                        onClick={handleAvatarClick}
                      >
                        <Camera className="h-4 w-4" />
                      </div>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Member since {user.joinDate ? new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'June 2023'}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleAvatarClick}
                        disabled={isLoading}
                      >
                        {isLoading ? "Uploading..." : "Change Avatar"}
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} className="therapeutic-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" className="therapeutic-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} className="therapeutic-input" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-3">Emergency Contact</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="emergencyContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="therapeutic-input" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="emergencyPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Phone</FormLabel>
                            <FormControl>
                              <Input {...field} className="therapeutic-input" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-4">
                  <Button variant="outline" type="button" onClick={() => form.reset()}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isLoading || !form.formState.isDirty}
                    className="bg-therapeutic-lavender hover:bg-therapeutic-lavender/90"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input 
                  id="currentPassword"
                  type="password"
                  value={securityInfo.password}
                  readOnly
                  className="therapeutic-input"
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    className="therapeutic-input"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    className="therapeutic-input"
                  />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="twoFactor">Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch 
                    id="twoFactor" 
                    checked={securityInfo.twoFactorEnabled}
                    onCheckedChange={(checked) => setSecurityInfo(prev => ({ ...prev, twoFactorEnabled: checked }))}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Data Privacy</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    View Privacy Policy
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Download My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive border-destructive/30 hover:bg-destructive/10">
                    Delete My Account
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button 
                onClick={handleSaveChanges} 
                disabled={isLoading}
                className="bg-therapeutic-lavender hover:bg-therapeutic-lavender/90"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Control which notifications you receive from NeuroCalm
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sessionReminders" className="text-base">Session Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders for upcoming therapy sessions
                    </p>
                  </div>
                  <Switch 
                    id="sessionReminders" 
                    checked={notifications.sessionReminders}
                    onCheckedChange={(checked) => handleNotificationChange('sessionReminders', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="progressUpdates" className="text-base">Progress Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly updates on your therapy progress
                    </p>
                  </div>
                  <Switch 
                    id="progressUpdates" 
                    checked={notifications.progressUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('progressUpdates', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="exerciseReminders" className="text-base">Exercise Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive daily reminders to complete recommended exercises
                    </p>
                  </div>
                  <Switch 
                    id="exerciseReminders" 
                    checked={notifications.exerciseReminders}
                    onCheckedChange={(checked) => handleNotificationChange('exerciseReminders', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newsletterUpdates" className="text-base">Newsletter Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive monthly newsletters with mental health tips
                    </p>
                  </div>
                  <Switch 
                    id="newsletterUpdates" 
                    checked={notifications.newsletterUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('newsletterUpdates', checked)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Notification Channels</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input type="checkbox" className="w-4 h-4" id="emailNotif" defaultChecked />
                    <Label htmlFor="emailNotif">Email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="checkbox" className="w-4 h-4" id="smsNotif" defaultChecked />
                    <Label htmlFor="smsNotif">SMS</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="checkbox" className="w-4 h-4" id="pushNotif" defaultChecked />
                    <Label htmlFor="pushNotif">Push Notifications</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button variant="outline">Reset to Default</Button>
              <Button 
                onClick={handleSaveChanges} 
                disabled={isLoading}
                className="bg-therapeutic-lavender hover:bg-therapeutic-lavender/90"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="therapist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Therapist Information</CardTitle>
              <CardDescription>
                View and update information about your therapist
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt="Therapist" />
                  <AvatarFallback className="text-2xl">EC</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{therapist.name}</h3>
                  <p className="text-sm text-muted-foreground">Licensed Clinical Psychologist</p>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{therapist.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{therapist.email}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Next Appointment</h3>
                <div className="bg-therapeutic-lightPurple p-4 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-therapeutic-lavender" />
                    <span className="font-medium">{therapist.nextAppointment}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Treatment History</h3>
                <div className="space-y-3">
                  {user?.therapySessions?.slice(0, 3).map(session => (
                    <div key={session.id} className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <span className="font-medium">{session.title}</span>
                        <p className="text-sm text-muted-foreground">{session.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">View Notes</Button>
                    </div>
                  ))}
                  
                  {(!user?.therapySessions || user.therapySessions.length === 0) && (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No treatment history available</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button variant="outline">Message Therapist</Button>
              <Button 
                className="bg-therapeutic-lavender hover:bg-therapeutic-lavender/90"
              >
                Schedule New Appointment
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Mail = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default Profile;
