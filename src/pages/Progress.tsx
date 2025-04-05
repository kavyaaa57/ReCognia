
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Calendar, Download } from 'lucide-react';

// Mock data for charts
const weeklyStressData = [
  { date: 'Mon', value: 85 },
  { date: 'Tue', value: 75 },
  { date: 'Wed', value: 60 },
  { date: 'Thu', value: 40 },
  { date: 'Fri', value: 50 },
  { date: 'Sat', value: 35 },
  { date: 'Sun', value: 30 },
];

const monthlyStressData = [
  { date: 'Week 1', value: 75 },
  { date: 'Week 2', value: 65 },
  { date: 'Week 3', value: 55 },
  { date: 'Week 4', value: 45 },
];

const sleepData = [
  { date: 'Mon', hours: 5.5, quality: 40 },
  { date: 'Tue', hours: 6, quality: 55 },
  { date: 'Wed', hours: 6.5, quality: 60 },
  { date: 'Thu', hours: 7, quality: 75 },
  { date: 'Fri', hours: 7.5, quality: 80 },
  { date: 'Sat', hours: 8, quality: 85 },
  { date: 'Sun', hours: 7, quality: 75 },
];

const symptomData = [
  { name: 'Anxiety', value: 65 },
  { name: 'Flashbacks', value: 40 },
  { name: 'Avoidance', value: 55 },
  { name: 'Sleep Issues', value: 70 },
  { name: 'Hypervigilance', value: 50 },
];

const treatmentEffectivenessData = [
  { name: 'Medication', value: 65 },
  { name: 'CBT Therapy', value: 85 },
  { name: 'Mindfulness', value: 70 },
  { name: 'Physical Exercise', value: 55 },
];

const emotionFrequencyData = [
  { name: 'Calm', value: 30 },
  { name: 'Anxious', value: 25 },
  { name: 'Sad', value: 15 },
  { name: 'Angry', value: 10 },
  { name: 'Happy', value: 20 },
];

const colors = ['#9b87f5', '#D3E4FD', '#FDE1D3', '#E5DEFF', '#8A898C'];

const Progress = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Progress</h1>
          <p className="text-muted-foreground">
            Track your therapy progress and well-being metrics over time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="weekly">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Last 7 Days</SelectItem>
              <SelectItem value="monthly">Last 30 Days</SelectItem>
              <SelectItem value="quarterly">Last 90 Days</SelectItem>
              <SelectItem value="yearly">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="flex flex-wrap justify-start gap-2 p-0 bg-transparent">
          <TabsTrigger value="overview" className="data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="stress" className="data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white">
            Stress Levels
          </TabsTrigger>
          <TabsTrigger value="sleep" className="data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white">
            Sleep
          </TabsTrigger>
          <TabsTrigger value="symptoms" className="data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white">
            Symptoms
          </TabsTrigger>
          <TabsTrigger value="treatment" className="data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white">
            Treatment Effectiveness
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Stress Trends</CardTitle>
                <CardDescription>Your stress levels over the past 7 days</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyStressData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                      formatter={(value) => [`${value}%`, 'Stress Level']}
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
                <CardTitle>Sleep Quality</CardTitle>
                <CardDescription>Hours of sleep and quality rating</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={sleepData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis 
                      yAxisId="left"
                      tick={{ fontSize: 12 }} 
                      tickLine={false} 
                      axisLine={false} 
                      domain={[0, 10]}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
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
                      formatter={(value, name) => {
                        if (name === 'hours') return [`${value} hrs`, 'Duration'];
                        return [`${value}%`, 'Quality'];
                      }}
                    />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#9b87f5" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name="Sleep Duration"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="quality" 
                      stroke="#FDE1D3" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name="Sleep Quality"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Symptom Intensity</CardTitle>
                <CardDescription>Current symptom levels</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={symptomData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis 
                      type="number" 
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '6px', 
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        border: 'none',
                      }}
                      formatter={(value) => [`${value}%`, 'Intensity']}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="#D3E4FD" 
                      radius={[0, 4, 4, 0]} 
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Emotional State Frequency</CardTitle>
                <CardDescription>How often you experienced different emotions</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emotionFrequencyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {emotionFrequencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '6px', 
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        border: 'none',
                      }}
                      formatter={(value) => [`${value}%`, 'Frequency']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Treatment Effectiveness</CardTitle>
              <CardDescription>How well different treatments are working for you</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={treatmentEffectivenessData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }} 
                    tickLine={false} 
                    axisLine={false} 
                  />
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
                    formatter={(value) => [`${value}%`, 'Effectiveness']}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40}
                  >
                    {treatmentEffectivenessData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stress" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Current Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">30%</div>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span>Down 5% from yesterday</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">53%</div>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span>Down 12% from last week</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Monthly Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">60%</div>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span>Down 15% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Peak Stress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm text-muted-foreground mt-1">Monday at 9:00 AM</div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Weekly Stress Trends</CardTitle>
              <CardDescription>Your stress levels over the past 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyStressData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorStressWeekly" x1="0" y1="0" x2="0" y2="1">
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
                    formatter={(value) => [`${value}%`, 'Stress Level']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#9b87f5" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorStressWeekly)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Stress Trends</CardTitle>
              <CardDescription>Your stress levels over the past 4 weeks</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyStressData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorStressMonthly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D3E4FD" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#D3E4FD" stopOpacity={0.1}/>
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
                    formatter={(value) => [`${value}%`, 'Stress Level']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#D3E4FD" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorStressMonthly)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sleep" className="space-y-4">
          {/* Sleep tab content would go here */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Last Night</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 hrs</div>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>75% quality</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6.8 hrs</div>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>Up 0.5 hrs from last week</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">67%</div>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>Up 12% from last week</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Nightmares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <div className="flex items-center mt-1 text-green-600 text-sm">
                  <ArrowDown className="h-4 w-4 mr-1" />
                  <span>Down 3 from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Sleep Duration & Quality</CardTitle>
              <CardDescription>Hours of sleep and quality rating</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={sleepData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fontSize: 12 }} 
                    tickLine={false} 
                    axisLine={false} 
                    domain={[0, 10]}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
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
                    formatter={(value, name) => {
                      if (name === 'hours') return [`${value} hrs`, 'Duration'];
                      return [`${value}%`, 'Quality'];
                    }}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#9b87f5" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Sleep Duration"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="quality" 
                    stroke="#FDE1D3" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Sleep Quality"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="symptoms" className="space-y-4">
          {/* Symptoms tab content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Symptom Intensity</CardTitle>
              <CardDescription>Current symptom levels</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={symptomData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fontSize: 12 }} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '6px', 
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                      border: 'none',
                    }}
                    formatter={(value) => [`${value}%`, 'Intensity']}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#D3E4FD" 
                    radius={[0, 4, 4, 0]} 
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="treatment" className="space-y-4">
          {/* Treatment effectiveness tab content would go here */}
          <Card>
            <CardHeader>
              <CardTitle>Treatment Effectiveness</CardTitle>
              <CardDescription>How well different treatments are working for you</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={treatmentEffectivenessData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }} 
                    tickLine={false} 
                    axisLine={false} 
                  />
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
                    formatter={(value) => [`${value}%`, 'Effectiveness']}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]} 
                    barSize={60}
                  >
                    {treatmentEffectivenessData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Progress;
