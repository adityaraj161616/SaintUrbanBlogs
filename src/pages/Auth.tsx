
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: isLogin ? "Welcome back!" : "Account created!",
          description: isLogin 
            ? "You have successfully signed in." 
            : "Please check your email to verify your account.",
        });
        
        if (isLogin) {
          navigate('/');
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="max-w-md mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-300 mb-8"
            >
              <ArrowLeft size={20} />
              <span className="font-light tracking-wide">Back</span>
            </button>

            <h1 className="text-4xl font-light tracking-[-0.02em] text-black mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide flex items-center space-x-2">
                  <Mail size={16} />
                  <span>Email</span>
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-light border-gray-200"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide flex items-center space-x-2">
                  <Lock size={16} />
                  <span>Password</span>
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="font-light border-gray-200"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white hover:bg-gray-900 py-3 font-light tracking-[0.1em] uppercase"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Please wait...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 font-light">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-black font-medium hover:underline mt-2"
              >
                {isLogin ? 'Create one here' : 'Sign in here'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
