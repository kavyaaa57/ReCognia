
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

type TherapySession = {
  id: string;
  date: string;
  title: string;
  notes: string;
  stressLevel: number;
};

interface SessionHistoryListProps {
  sessions: TherapySession[];
  limit?: number;
  showViewButton?: boolean;
  emptyMessage?: string;
  className?: string;
}

const SessionHistoryList = ({
  sessions,
  limit = 5,
  showViewButton = true,
  emptyMessage = "No therapy sessions recorded yet",
  className = ""
}: SessionHistoryListProps) => {
  const limitedSessions = sessions.slice(0, limit);
  
  if (!sessions || sessions.length === 0) {
    return (
      <div className={`text-center py-6 ${className}`}>
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className={`space-y-3 ${className}`}>
      {limitedSessions.map(session => {
        const sessionDate = new Date(session.date);
        const formattedDate = sessionDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: '2-digit' 
        });
        
        const timeAgo = formatDistanceToNow(sessionDate, { addSuffix: true });
        
        return (
          <Card key={session.id} className="overflow-hidden">
            <div className="flex">
              <div 
                className="w-2 h-auto" 
                style={{ 
                  backgroundColor: session.stressLevel >= 70 ? '#ef4444' : 
                                   session.stressLevel >= 40 ? '#f97316' : 
                                   '#22c55e' 
                }}
              />
              <div className="flex-grow">
                <CardHeader className="py-3 px-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base font-medium">{session.title}</CardTitle>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-medium">{formattedDate}</span>
                      <span className="text-xs text-muted-foreground">{timeAgo}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="py-2 px-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{session.notes}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">Stress Level:</span>
                      <span 
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          session.stressLevel >= 70 ? 'bg-red-100 text-red-700' : 
                          session.stressLevel >= 40 ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}
                      >
                        {session.stressLevel}%
                      </span>
                    </div>
                    {showViewButton && (
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        View Details
                      </Button>
                    )}
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default SessionHistoryList;
