
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { HeartPulse, MessageCircle, Clock, Calendar, CheckCircle, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { user, addTherapySession, updateUserProgress } = useAuth();
  const { toast } = useToast();
  const userName = user?.name?.split(' ')[0] || 'User';
  
  // Generate last 7 days for stress data
  const generateStressData = () => {
    if (!user?.therapySessions) return Array(7).fill(0).map((_, index) => ({
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index],
      value: 50
    }));
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday
    
    return days.map((day, index) => {
      const dayIndex = (dayOfWeek - 6 + index + 7) % 7; // Calculate correct day index
      const dayName = days[dayIndex];
      
      // If we have a therapy session for this day, use its stress level
      const session = user.therapySessions
        .slice()
        .reverse()
        .find(s => {
          const sessionDate = new Date(s.date);
          return sessionDate.getDay() === dayIndex;
        });
      
      return {
        day: dayName,
        value: session ? session.stressLevel : Math.max(30, 100 - (index * 10)) // Fallback value
      };
    });
  };
  
  const stressData = generateStressData();
  
  // Generate weekly sessions data
  const generateSessionsData = () => {
    if (!user?.therapySessions) return Array(4).fill(0).map((_, index) => ({
      name: `Week ${index + 1}`,
      sessions: 0
    }));
    
    // Group sessions by week
    const sessionsByWeek = user.therapySessions.reduce((acc, session) => {
      const sessionDate = new Date(session.date);
      const weekNumber = Math.floor((new Date().getTime() - sessionDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
      
      if (weekNumber >= 0 && weekNumber < 4) {
        acc[weekNumber] = (acc[weekNumber] || 0) + 1;
      }
      
      return acc;
    }, {} as Record<number, number>);
    
    return [0, 1, 2, 3].map(weekNum => ({
      name: `Week ${4 - weekNum}`,
      sessions: sessionsByWeek[weekNum] || 0
    })).reverse();
  };
  
  const sessionsData = generateSessionsData();
  
  // Make sure we have valid data before accessing properties
  const lastStressDataPoint = stressData && stressData.length > 0 ? stressData[stressData.length - 1] : { value: 50 };
  const todayStress = lastStressDataPoint.value;
  const stressLevel = todayStress >= 70 ? 'High' : todayStress >= 40 ? 'Moderate' : 'Low';
  const stressColor = todayStress >= 70 ? 'text-red-600' : todayStress >= 40 ? 'text-orange-500' : 'text-green-600';
  
  const completedSessions = user?.completedSessions || 0;
  const totalSessions = user?.totalSessions || 30;
  const progress = (completedSessions / totalSessions) * 100;
  
  const [showActionConfirm, setShowActionConfirm] = useState<string | null>(null);
  
  const handleCompleteAction = (actionName: string) => {
    setShowActionConfirm(actionName);
    
    // Simulate completing an action (this would add a therapy session in a real app)
    setTimeout(() => {
      addTherapySession({
        date: new Date().toISOString().split('T')[0],
        title: actionName,
        notes: `Completed ${actionName} exercise`,
        stressLevel: Math.max(todayStress - 10, 25)
      });
      
      // Update progress
      updateUserProgress({
        stressManagement: Math.min(user?.progress?.stressManagement + 2 || 0 + 2, 100),
        emotionalRegulation: Math.min(user?.progress?.emotionalRegulation + 2 || 0 + 2, 100)
      });
      
      toast({
        title: "Exercise completed",
        description: `Great job! You've completed the ${actionName} exercise.`,
      });
      
      setShowActionConfirm(null);
    }, 2000);
  };
  
  const upcomingSession = {
    date: 'Today',
    time: '5:00 PM',
    title: 'Guided Meditation',
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {userName}</h1>
          <p className="text-muted-foreground">
            Here's an overview of your therapy progress and stress levels.
          </p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button asChild>
            <Link to="/exercises">Start Exercise</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/chat">Chat with AI</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Stress Level</CardTitle>
            <HeartPulse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <span className={stressColor}>{stressLevel}</span>
              <span className="text-sm font-normal text-muted-foreground ml-2">({todayStress}%)</span>
            </div>
            <Progress 
              value={todayStress} 
              className="h-2 mt-2" 
              indicatorClassName={
                todayStress >= 70 ? "bg-red-600" : 
                todayStress >= 40 ? "bg-orange-500" : 
                "bg-green-600"
              }
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Therapy Progress</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedSessions}/{totalSessions}
              <span className="text-sm font-normal text-muted-foreground ml-2">sessions</span>
            </div>
            <Progress value={progress} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Session</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingSession.date}</div>
            <div className="flex justify-between mt-1">
              <div className="text-sm text-muted-foreground">{upcomingSession.time}</div>
              <div className="text-sm font-medium">{upcomingSession.title}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.streak || 0} days</div>
            <div className="text-sm text-muted-foreground mt-1">Keep up the great work!</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Stress Levels</CardTitle>
            <CardDescription>
              Your stress level trends over the past week
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stressData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={false} 
                  domain={[0, 100]} 
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '6px', 
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    border: 'none',
                  }}
                  itemStyle={{ color: '#9b87f5' }}
                  formatter={(value) => [`${value}%`, 'Stress']}
                  labelFormatter={(label) => `${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#9b87f5" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorStress)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Therapy Sessions</CardTitle>
            <CardDescription>
              Weekly therapy sessions completed
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={false} 
                  domain={[0, 'dataMax + 1']}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '6px', 
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    border: 'none',
                  }}
                  itemStyle={{ color: '#D3E4FD' }}
                  formatter={(value) => [value, 'Sessions']}
                />
                <Bar 
                  dataKey="sessions" 
                  fill="#D3E4FD" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recommended Actions</CardTitle>
            <CardDescription>
              AI-suggested activities based on your current stress level
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="therapeutic-card p-3 flex items-start space-x-3">
              <div className="bg-therapeutic-peach rounded-md p-2">
                <HeartPulse className="h-5 w-5 text-therapeutic-charcoal/70" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Deep Breathing Exercise</h3>
                <p className="text-sm text-muted-foreground">5 minutes of guided deep breathing</p>
                {showActionConfirm === 'Deep Breathing Exercise' ? (
                  <div className="flex items-center gap-2 mt-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Completing...</span>
                  </div>
                ) : (
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-therapeutic-lavender" 
                    onClick={() => handleCompleteAction('Deep Breathing Exercise')}
                  >
                    Start now
                  </Button>
                )}
              </div>
            </div>
            
            <div className="therapeutic-card p-3 flex items-start space-x-3">
              <div className="bg-therapeutic-lightPurple rounded-md p-2">
                <MessageCircle className="h-5 w-5 text-therapeutic-charcoal/70" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Chat Session</h3>
                <p className="text-sm text-muted-foreground">Process today's emotions with AI assistance</p>
                {showActionConfirm === 'Chat Session' ? (
                  <div className="flex items-center gap-2 mt-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Completing...</span>
                  </div>
                ) : (
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-therapeutic-lavender" 
                    onClick={() => handleCompleteAction('Chat Session')}
                  >
                    Start chat
                  </Button>
                )}
              </div>
            </div>
            
            <div className="therapeutic-card p-3 flex items-start space-x-3">
              <div className="bg-therapeutic-blue rounded-md p-2">
                <Clock className="h-5 w-5 text-therapeutic-charcoal/70" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Mindfulness Meditation</h3>
                <p className="text-sm text-muted-foreground">10 minutes guided session</p>
                {showActionConfirm === 'Mindfulness Meditation' ? (
                  <div className="flex items-center gap-2 mt-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Completing...</span>
                  </div>
                ) : (
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-therapeutic-lavender" 
                    onClick={() => handleCompleteAction('Mindfulness Meditation')}
                  >
                    Start now
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Insights</CardTitle>
            <CardDescription>
              Key observations from your therapy sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user?.therapySessions?.slice(-3).reverse().map((session, index) => (
              <div key={session.id} className={`border-l-4 ${
                index === 0 ? 'border-therapeutic-lavender' : 
                index === 1 ? 'border-therapeutic-blue' : 
                'border-therapeutic-peach'
              } pl-4 space-y-1`}>
                <p className="text-sm text-muted-foreground">From {new Date(session.date).toLocaleDateString('en-US', { weekday: 'long' })}'s session:</p>
                <p className="font-medium">"{session.notes}"</p>
              </div>
            ))}
            
            {(!user?.therapySessions || user.therapySessions.length === 0) && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No therapy sessions recorded yet</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => handleCompleteAction('Initial Assessment')}
                >
                  Complete your first session
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Journey</CardTitle>
            <CardDescription>
              Tracking your rehabilitation progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Stress Management</span>
                <span className="text-sm font-medium">{user?.progress?.stressManagement || 0}%</span>
              </div>
              <Progress value={user?.progress?.stressManagement || 0} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Emotional Regulation</span>
                <span className="text-sm font-medium">{user?.progress?.emotionalRegulation || 0}%</span>
              </div>
              <Progress value={user?.progress?.emotionalRegulation || 0} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Trauma Processing</span>
                <span className="text-sm font-medium">{user?.progress?.traumaProcessing || 0}%</span>
              </div>
              <Progress value={user?.progress?.traumaProcessing || 0} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Sleep Quality</span>
                <span className="text-sm font-medium">{user?.progress?.sleepQuality || 0}%</span>
              </div>
              <Progress value={user?.progress?.sleepQuality || 0} className="h-2" />
            </div>
            
            <div className="pt-2">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/progress">View full progress</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
