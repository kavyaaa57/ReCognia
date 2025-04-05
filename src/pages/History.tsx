
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import SessionHistoryList from '@/components/therapy/SessionHistoryList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, SortDesc, SortAsc, Search, Calendar, BarChart, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const History = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'stressHigh' | 'stressLow'>('newest');
  const [timeFrame, setTimeFrame] = useState<'all' | 'month' | 'week'>('all');

  // Get filtered and sorted sessions
  const getFilteredSessions = () => {
    if (!user?.therapySessions) return [];

    let filteredSessions = [...user.therapySessions];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredSessions = filteredSessions.filter(
        session => 
          session.title.toLowerCase().includes(query) || 
          session.notes.toLowerCase().includes(query)
      );
    }
    
    // Apply time frame filter
    if (timeFrame !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      if (timeFrame === 'month') {
        cutoffDate.setMonth(now.getMonth() - 1);
      } else if (timeFrame === 'week') {
        cutoffDate.setDate(now.getDate() - 7);
      }
      
      filteredSessions = filteredSessions.filter(
        session => new Date(session.date) >= cutoffDate
      );
    }
    
    // Apply sorting
    filteredSessions.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortOrder === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortOrder === 'stressHigh') {
        return b.stressLevel - a.stressLevel;
      } else {
        return a.stressLevel - b.stressLevel;
      }
    });
    
    return filteredSessions;
  };

  const filteredSessions = getFilteredSessions();
  
  // Generate chart data for stress trends
  const generateStressChartData = () => {
    if (!user?.therapySessions || user.therapySessions.length === 0) {
      return [];
    }
    
    // Sort sessions by date
    const sortedSessions = [...user.therapySessions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Take up to 10 most recent sessions
    const recentSessions = sortedSessions.slice(-10);
    
    return recentSessions.map(session => ({
      date: new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      stress: session.stressLevel,
      title: session.title
    }));
  };
  
  const stressChartData = generateStressChartData();
  
  // Calculate average stress level
  const calculateAverageStress = () => {
    if (!user?.therapySessions || user.therapySessions.length === 0) return 0;
    
    const sum = user.therapySessions.reduce((acc, session) => acc + session.stressLevel, 0);
    return Math.round(sum / user.therapySessions.length);
  };
  
  const averageStressLevel = calculateAverageStress();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Session History</h1>
        <p className="text-muted-foreground">
          View and analyze your past therapy sessions
        </p>
      </div>
      
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="flex flex-wrap justify-start gap-2 p-0 bg-transparent">
          <TabsTrigger 
            value="list" 
            className="flex items-center gap-2 data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white"
          >
            <Calendar className="h-4 w-4" />
            <span>Session List</span>
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="flex items-center gap-2 data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white"
          >
            <BarChart className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-auto flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search sessions..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select
                value={timeFrame}
                onValueChange={(value) => setTimeFrame(value as any)}
              >
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Time frame" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="month">Last month</SelectItem>
                  <SelectItem value="week">Last week</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={sortOrder}
                onValueChange={(value) => setSortOrder(value as any)}
              >
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    {sortOrder.includes('newest') ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="stressHigh">Highest stress</SelectItem>
                  <SelectItem value="stressLow">Lowest stress</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredSessions.length > 0 ? (
            <SessionHistoryList 
              sessions={filteredSessions}
              limit={20}
              showViewButton={true}
            />
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground mb-4">No sessions match your search criteria</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setTimeFrame('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
          
          {/* Pagination placeholder - could be implemented for large history */}
          {filteredSessions.length > 10 && (
            <div className="flex justify-center mt-6">
              <Button variant="outline" size="sm">Load more</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user?.therapySessions?.length || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Across your therapy journey</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Stress Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageStressLevel}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {
                    averageStressLevel >= 70 ? "High stress - needs attention" :
                    averageStressLevel >= 40 ? "Moderate stress - making progress" :
                    "Low stress - great management"
                  }
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Stress Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  <div className="text-lg font-medium">
                    {stressChartData.length > 1 ? (
                      stressChartData[stressChartData.length - 1].stress < stressChartData[0].stress 
                        ? "Decreasing" 
                        : "Increasing"
                    ) : "No trend"}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Based on your session history</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Stress Level Trend</CardTitle>
              <CardDescription>
                Your stress levels recorded during therapy sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {stressChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stressChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
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
                      labelStyle={{ fontWeight: 'bold' }}
                      formatter={(value, name, props) => {
                        return [`${value}%`, 'Stress Level'];
                      }}
                      labelFormatter={(label, payload) => {
                        if (payload && payload.length) {
                          return `${label} - ${payload[0].payload.title}`;
                        }
                        return label;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="stress" 
                      stroke="#9b87f5" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorStress)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Not enough data to display chart</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default History;
