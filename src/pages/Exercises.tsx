
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { HeartPulse, Play, Pause, SkipBack, Clock, PlayCircle, Bookmark, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const exercises = [
  {
    id: 1,
    title: 'Deep Breathing',
    category: 'breathing',
    duration: '5 min',
    description: 'A simple deep breathing exercise to help reduce stress and anxiety.',
    difficulty: 'Beginner',
    effectiveness: 85,
    steps: [
      'Find a comfortable position sitting or lying down.',
      'Place one hand on your chest and the other on your stomach.',
      'Take a slow, deep breath in through your nose for 4 seconds.',
      'Hold your breath for 2 seconds.',
      'Exhale slowly through your mouth for 6 seconds.',
      'Repeat for 5 minutes.',
    ],
  },
  {
    id: 2,
    title: 'Progressive Muscle Relaxation',
    category: 'relaxation',
    duration: '10 min',
    description: 'Systematically tense and relax different muscle groups to reduce physical tension.',
    difficulty: 'Intermediate',
    effectiveness: 78,
    steps: [
      'Start by tensing and relaxing your toes and feet.',
      'Work your way up to your calves and thighs.',
      'Continue with your abdomen and chest.',
      'Next, focus on your hands, arms, and shoulders.',
      'Finally, tense and relax your neck and facial muscles.',
      'For each muscle group, tense for 5 seconds, then relax for 10 seconds.',
    ],
  },
  {
    id: 3,
    title: 'Guided Visualization',
    category: 'mindfulness',
    duration: '15 min',
    description: 'A guided journey to a peaceful place to calm your mind and reduce anxiety.',
    difficulty: 'Beginner',
    effectiveness: 92,
    steps: [
      'Close your eyes and take several deep breaths.',
      'Imagine a peaceful place where you feel safe and relaxed.',
      'Notice the details around you - the sights, sounds, and smells.',
      'Feel the temperature and any sensations on your skin.',
      'Spend time exploring this place and feeling the calm it brings.',
      'When ready, slowly bring your awareness back to the present.',
    ],
  },
  {
    id: 4,
    title: '5-4-3-2-1 Grounding',
    category: 'grounding',
    duration: '3 min',
    description: 'A quick technique to ground yourself during moments of anxiety or flashbacks.',
    difficulty: 'Beginner',
    effectiveness: 80,
    steps: [
      'Name 5 things you can see around you.',
      'Name 4 things you can physically feel or touch.',
      'Name 3 things you can hear.',
      'Name 2 things you can smell (or like the smell of).',
      'Name 1 thing you can taste (or like the taste of).',
      'Take a deep breath to conclude the exercise.',
    ],
  },
  {
    id: 5,
    title: 'Body Scan Meditation',
    category: 'mindfulness',
    duration: '20 min',
    description: 'A mindful exploration of your body to release tension and increase awareness.',
    difficulty: 'Intermediate',
    effectiveness: 88,
    steps: [
      'Lie down in a comfortable position and close your eyes.',
      'Begin by bringing awareness to your breath.',
      'Slowly scan from your toes to the top of your head.',
      'Notice any sensations, tension, or discomfort in each area.',
      'Don\'t try to change anything, just observe with curiosity.',
      'Complete the scan by bringing awareness to your body as a whole.',
    ],
  },
  {
    id: 6,
    title: 'Breathing Square',
    category: 'breathing',
    duration: '5 min',
    description: 'A visual breathing technique that helps regulate your breath and calm anxiety.',
    difficulty: 'Beginner',
    effectiveness: 75,
    steps: [
      'Visualize a square in front of you.',
      'As you trace the first side, breathe in for 4 counts.',
      'Trace the second side while holding your breath for 4 counts.',
      'Trace the third side while exhaling for 4 counts.',
      'Trace the fourth side while holding for 4 counts.',
      'Repeat this pattern for 5 minutes.',
    ],
  },
];

const ExercisesPage = () => {
  const [currentExercise, setCurrentExercise] = useState<typeof exercises[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([1, 3]); // Example pre-favorited exercises
  const { toast } = useToast();
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const resetExercise = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  
  const startExercise = (exercise: typeof exercises[0]) => {
    setCurrentExercise(exercise);
    setCurrentStep(0);
    setIsPlaying(true);
  };
  
  const closeExercise = () => {
    setCurrentExercise(null);
    setIsPlaying(false);
    setCurrentStep(0);
  };
  
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      toast({
        title: "Removed from favorites",
        description: "Exercise removed from your favorites.",
      });
    } else {
      setFavorites([...favorites, id]);
      toast({
        title: "Added to favorites",
        description: "Exercise added to your favorites.",
      });
    }
  };
  
  const rateExercise = (isHelpful: boolean) => {
    toast({
      title: isHelpful ? "Rated as helpful" : "Rated as not helpful",
      description: "Thank you for your feedback! This helps us improve our recommendations.",
    });
    closeExercise();
  };
  
  const getFilteredExercises = (category: string) => {
    if (category === 'all') return exercises;
    if (category === 'favorites') return exercises.filter(ex => favorites.includes(ex.id));
    return exercises.filter(ex => ex.category === category);
  };
  
  const renderExerciseSteps = () => {
    if (!currentExercise) return null;
    
    const progress = ((currentStep + 1) / currentExercise.steps.length) * 100;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto therapeutic-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{currentExercise.title}</CardTitle>
              <Button variant="ghost" size="sm" onClick={closeExercise}>✕</Button>
            </div>
            <CardDescription>
              {currentExercise.duration} • {currentExercise.difficulty}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Step {currentStep + 1} of {currentExercise.steps.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="text-center py-8 px-4 bg-therapeutic-lightPurple rounded-lg">
              <p className="text-xl font-medium animate-pulse-gentle">
                {currentExercise.steps[currentStep]}
              </p>
            </div>
            
            <div className="flex justify-center items-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={resetExercise}
                disabled={currentStep === 0 && !isPlaying}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                className="rounded-full h-14 w-14 bg-therapeutic-lavender hover:bg-therapeutic-lavender/90"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => {
                  if (currentStep < currentExercise.steps.length - 1) {
                    setCurrentStep(currentStep + 1);
                  } else {
                    setIsPlaying(false);
                  }
                }}
              >
                <Clock className="h-5 w-5" />
              </Button>
            </div>
            
            {!isPlaying && currentStep === currentExercise.steps.length - 1 && (
              <div className="bg-therapeutic-peach bg-opacity-30 p-4 rounded-lg text-center">
                <h3 className="font-medium mb-2">How did this exercise make you feel?</h3>
                <div className="flex justify-center gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => rateExercise(true)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    Helpful
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => rateExercise(false)}
                  >
                    <ThumbsDown className="h-4 w-4" />
                    Not Helpful
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm" onClick={closeExercise}>Exit</Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={() => toggleFavorite(currentExercise.id)}
            >
              <Bookmark className="h-4 w-4" fill={favorites.includes(currentExercise.id) ? "currentColor" : "none"} />
              {favorites.includes(currentExercise.id) ? "Favorited" : "Add to favorites"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Relaxation Exercises</h1>
        <p className="text-muted-foreground">
          Practice exercises designed to help manage stress and PTSD symptoms
        </p>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="flex flex-wrap justify-start gap-2 p-0 bg-transparent">
          <TabsTrigger value="all" className="data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white">
            All Exercises
          </TabsTrigger>
          <TabsTrigger value="breathing" className="data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white">
            Breathing
          </TabsTrigger>
          <TabsTrigger value="relaxation" className="data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white">
            Relaxation
          </TabsTrigger>
          <TabsTrigger value="mindfulness" className="data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white">
            Mindfulness
          </TabsTrigger>
          <TabsTrigger value="grounding" className="data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white">
            Grounding
          </TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-therapeutic-lavender data-[state=active]:text-white">
            My Favorites
          </TabsTrigger>
        </TabsList>
        
        {['all', 'breathing', 'relaxation', 'mindfulness', 'grounding', 'favorites'].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {getFilteredExercises(category).map((exercise) => (
                <Card key={exercise.id} className="therapeutic-card overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{exercise.title}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 -mt-1 -mr-2" 
                        onClick={() => toggleFavorite(exercise.id)}
                      >
                        <Bookmark 
                          className="h-5 w-5" 
                          fill={favorites.includes(exercise.id) ? "currentColor" : "none"} 
                        />
                      </Button>
                    </div>
                    <CardDescription>
                      {exercise.duration} • {exercise.difficulty}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <p className="text-sm">{exercise.description}</p>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm">
                        <span>Effectiveness</span>
                        <span>{exercise.effectiveness}%</span>
                      </div>
                      <Progress value={exercise.effectiveness} className="h-1 mt-1" />
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full flex items-center gap-2 bg-therapeutic-lavender hover:bg-therapeutic-lavender/90"
                      onClick={() => startExercise(exercise)}
                    >
                      <PlayCircle className="h-4 w-4" />
                      <span>Start Exercise</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {getFilteredExercises(category).length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <HeartPulse className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No exercises found</h3>
                  {category === 'favorites' ? (
                    <p className="text-muted-foreground max-w-md mt-2">
                      You haven't added any exercises to your favorites yet. Explore the exercises and bookmark the ones you find helpful.
                    </p>
                  ) : (
                    <p className="text-muted-foreground max-w-md mt-2">
                      No exercises found in this category. Check back later as we regularly add new exercises.
                    </p>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      {currentExercise && renderExerciseSteps()}
    </div>
  );
};

export default ExercisesPage;
