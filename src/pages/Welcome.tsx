
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Shield, BarChart, MessageCircle } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-therapeutic-lavender/10 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-therapeutic-lavender/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-therapeutic-lavender animate-pulse-gentle">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
            </div>
            <h1 className="text-xl font-semibold tracking-tight">NeuroCalm</h1>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-therapeutic-charcoal">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-therapeutic-lavender hover:bg-therapeutic-lavender/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 therapeutic-gradient">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-therapeutic-charcoal">
                AI-Powered PTSD Rehabilitation Therapy
              </h1>
              <p className="text-lg text-therapeutic-charcoal/80">
                NeuroCalm helps you manage PTSD symptoms, track progress, and develop coping mechanisms through personalized AI-guided therapy sessions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/register">
                  <Button className="bg-therapeutic-lavender hover:bg-therapeutic-lavender/90 py-6 px-8 text-lg w-full sm:w-auto">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="border-therapeutic-lavender text-therapeutic-lavender hover:bg-therapeutic-lavender/10 py-6 px-8 text-lg w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="aspect-video bg-white rounded-xl shadow-2xl overflow-hidden border border-therapeutic-lavender/30">
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                    alt="Person using NeuroCalm"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-therapeutic-lavender/30 to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border border-therapeutic-lavender/30">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 rounded-full p-2">
                      <BarChart className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-therapeutic-charcoal/70">Progress Tracking</p>
                      <p className="font-semibold text-therapeutic-charcoal">+42% Recovery Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-therapeutic-charcoal">
              How NeuroCalm Helps Your Recovery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-therapeutic-lavender/5 p-6 rounded-xl border border-therapeutic-lavender/20 transition-all hover:shadow-md">
                <div className="bg-therapeutic-lavender/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-therapeutic-lavender" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-therapeutic-charcoal">AI-Guided Therapy</h3>
                <p className="text-therapeutic-charcoal/70">
                  Personalized therapy sessions using advanced AI to help process trauma and reduce symptoms.
                </p>
              </div>
              
              <div className="bg-therapeutic-lavender/5 p-6 rounded-xl border border-therapeutic-lavender/20 transition-all hover:shadow-md">
                <div className="bg-therapeutic-lavender/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-therapeutic-lavender" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-therapeutic-charcoal">Progress Tracking</h3>
                <p className="text-therapeutic-charcoal/70">
                  Monitor your recovery with detailed analytics and visualizations of your healing journey.
                </p>
              </div>
              
              <div className="bg-therapeutic-lavender/5 p-6 rounded-xl border border-therapeutic-lavender/20 transition-all hover:shadow-md">
                <div className="bg-therapeutic-lavender/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-therapeutic-lavender" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-therapeutic-charcoal">24/7 Support</h3>
                <p className="text-therapeutic-charcoal/70">
                  Access therapeutic conversations and coping exercises whenever you need them, day or night.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 therapeutic-gradient">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-therapeutic-charcoal">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-therapeutic-lavender/30 flex items-center justify-center">
                    <span className="font-semibold text-therapeutic-lavender">M</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael R.</h4>
                    <p className="text-sm text-therapeutic-charcoal/70">Combat Veteran</p>
                  </div>
                </div>
                <p className="text-therapeutic-charcoal/80 italic">
                  "NeuroCalm has been transformative for my PTSD recovery. The personalized therapy and tracking tools have helped me manage my symptoms and regain control of my life."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-therapeutic-lavender/30 flex items-center justify-center">
                    <span className="font-semibold text-therapeutic-lavender">S</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah T.</h4>
                    <p className="text-sm text-therapeutic-charcoal/70">Accident Survivor</p>
                  </div>
                </div>
                <p className="text-therapeutic-charcoal/80 italic">
                  "After my car accident, I struggled with severe PTSD. NeuroCalm provided me with daily support and coping strategies that have dramatically improved my quality of life."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-therapeutic-lavender/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-therapeutic-charcoal">
              Begin Your Healing Journey Today
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-therapeutic-charcoal/70">
              Join thousands of others who have found relief and recovery through NeuroCalm's innovative approach to PTSD therapy.
            </p>
            <Link to="/register">
              <Button className="bg-therapeutic-lavender hover:bg-therapeutic-lavender/90 py-6 px-8 text-lg">
                Create Your Free Account <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-therapeutic-charcoal text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-therapeutic-lavender">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">N</span>
                  </div>
                </div>
                <h1 className="text-xl font-semibold tracking-tight">NeuroCalm</h1>
              </div>
              <p className="text-white/70 max-w-xs">
                AI-powered PTSD neurorehabilitation therapy that helps you recover and thrive.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/70 hover:text-white">Features</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white">Pricing</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white">Testimonials</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/70 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white">Research</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white">Support</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/70 hover:text-white">Privacy</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white">Terms</a></li>
                  <li><a href="#" className="text-white/70 hover:text-white">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">
              &copy; {new Date().getFullYear()} NeuroCalm. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-white/70 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
