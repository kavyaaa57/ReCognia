
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Send, Clock, HeartPulse } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  stressLevel?: number; // Optional stress level determined by AI
};

// Mock AI response function
const getAIResponse = async (message: string): Promise<Message> => {
  // In a real app, this would be an API call to the Ollama backend
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
  
  // Mock responses based on message content
  let content = '';
  let stressLevel: number | undefined = undefined;
  
  if (message.toLowerCase().includes('anxious') || message.toLowerCase().includes('stress')) {
    content = "I notice you're feeling anxious. This is completely normal when dealing with PTSD. Let's try a quick grounding exercise: Look around and name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. How does that feel?";
    stressLevel = 72;
  } else if (message.toLowerCase().includes('sleep') || message.toLowerCase().includes('nightmare')) {
    content = "Sleep disturbances and nightmares are common PTSD symptoms. Have you tried creating a calming bedtime routine? It might help to avoid screens an hour before bed, practice gentle stretching, and use guided meditation. Would you like me to recommend a specific meditation for sleep?";
    stressLevel = 65;
  } else if (message.toLowerCase().includes('help') || message.toLowerCase().includes('bad')) {
    content = "I'm sorry you're going through a difficult time. Remember that healing isn't linear, and difficult moments are part of the process. Would you like to try a breathing exercise together, or would it be helpful to discuss some coping strategies you can use right now?";
    stressLevel = 80;
  } else {
    content = "Thank you for sharing that with me. How are you feeling about it right now? Remember that recognizing and naming our emotions is an important part of the healing process.";
    stressLevel = 45;
  }
  
  return {
    id: Date.now().toString(),
    content,
    sender: 'ai',
    timestamp: new Date(),
    stressLevel,
  };
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello, I'm your AI therapy assistant. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const aiResponse = await getAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getStressLevelColor = (level: number) => {
    if (level >= 70) return 'text-red-600';
    if (level >= 40) return 'text-orange-500';
    return 'text-green-600';
  };
  
  const getSuggestedPrompts = () => {
    const prompts = [
      "I'm feeling anxious about going outside today.",
      "I had a nightmare last night and couldn't go back to sleep.",
      "I noticed I'm getting triggered by loud noises. What can I do?",
      "I want to talk about a positive moment I had yesterday.",
    ];
    
    return prompts;
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">AI Therapy Assistant</h1>
        <p className="text-muted-foreground">
          Chat confidentially with your AI therapy assistant to process emotions and get support.
        </p>
      </div>
      
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b pb-3">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Therapy Assistant" />
              <AvatarFallback className="bg-therapeutic-lavender text-white">AI</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">NeuroCalm Assistant</CardTitle>
              <p className="text-sm text-muted-foreground">AI-powered therapeutic support</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto px-4 py-0">
          <div className="pt-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={cn(
                  "flex items-end gap-2 mb-4",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.sender === 'ai' && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Therapy Assistant" />
                    <AvatarFallback className="bg-therapeutic-lavender text-white text-xs">AI</AvatarFallback>
                  </Avatar>
                )}
                
                <div 
                  className={cn(
                    "rounded-lg px-4 py-2 max-w-[80%] break-words relative",
                    message.sender === 'user' 
                      ? "bg-therapeutic-lavender text-white rounded-br-none" 
                      : "bg-therapeutic-lightPurple text-therapeutic-charcoal rounded-bl-none"
                  )}
                >
                  <div className="text-sm">{message.content}</div>
                  <div 
                    className={cn(
                      "text-xs mt-1 flex justify-between items-center",
                      message.sender === 'user' ? "text-white/80" : "text-muted-foreground"
                    )}
                  >
                    <span>{formatTime(message.timestamp)}</span>
                    
                    {message.stressLevel && (
                      <span className={cn("flex items-center text-xs gap-1 ml-2", getStressLevelColor(message.stressLevel))}>
                        <HeartPulse className="h-3 w-3" />
                        {message.stressLevel}%
                      </span>
                    )}
                  </div>
                </div>
                
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="bg-muted text-muted-foreground">U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-end gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="Therapy Assistant" />
                  <AvatarFallback className="bg-therapeutic-lavender text-white text-xs">AI</AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-therapeutic-lightPurple text-therapeutic-charcoal rounded-bl-none max-w-[80%]">
                  <div className="flex space-x-2 items-center">
                    <div className="h-2 w-2 bg-therapeutic-lavender rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-therapeutic-lavender rounded-full animate-pulse delay-150"></div>
                    <div className="h-2 w-2 bg-therapeutic-lavender rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        <div className="border-t p-4">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Suggested messages:</p>
            <div className="flex flex-wrap gap-2">
              {getSuggestedPrompts().map((prompt, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                  onClick={() => setInput(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
          
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              className="flex-1 therapeutic-input" 
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
          <div className="flex items-center mt-2">
            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Responses are AI-generated. In case of emergency, please contact a healthcare professional.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
