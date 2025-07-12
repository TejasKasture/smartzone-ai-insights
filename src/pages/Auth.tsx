
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { User, Session } from '@supabase/supabase-js';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'manager' | 'worker'>('worker');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            navigate('/');
          }, 100);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const userData: any = {
        full_name: fullName,
        role: role
      };

      // Only add department for workers
      if (role === 'worker' && department) {
        userData.department = department;
      }
      
      console.log('Signing up with data:', { email, userData });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: userData
        }
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Account created successfully!",
          description: "You can now sign in with your credentials.",
        });
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting to sign in with:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        console.log('Sign in successful:', data.user);
        toast({
          title: "Signed in successfully!",
          description: "Welcome to SmartZone AI Dashboard",
        });
        navigate('/');
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestManagerLogin = async () => {
    setEmail('manager@gmail.com');
    setPassword('test123');
    setTimeout(async () => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: 'manager@gmail.com',
          password: 'test123',
        });
        
        if (error) throw error;
        
        if (data.user) {
          toast({
            title: "Manager login successful!",
            description: "Welcome to SmartZone AI Dashboard",
          });
          navigate('/');
        }
      } catch (error: any) {
        toast({
          title: "Manager login failed",
          description: error.message,
          variant: "destructive",
        });
      }
    }, 100);
  };

  const handleTestWorkerLogin = async () => {
    setEmail('worker@gmail.com');
    setPassword('test123');
    setTimeout(async () => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: 'worker@gmail.com',
          password: 'test123',
        });
        
        if (error) throw error;
        
        if (data.user) {
          toast({
            title: "Worker login successful!",
            description: "Welcome to SmartZone AI Dashboard",
          });
          navigate('/');
        }
      } catch (error: any) {
        toast({
          title: "Worker login failed",
          description: error.message,
          variant: "destructive",
        });
      }
    }, 100);
  };

  const handleDirectAccess = () => {
    toast({
      title: "Accessing Dashboard",
      description: "Bypassing authentication for demo purposes",
    });
    navigate('/');
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Redirecting...</h2>
          <p className="text-gray-600">Taking you to the dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#004c91] mb-2">SmartZone AI</h1>
          <p className="text-gray-600">Dynamic Product Placement System</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-[#004c91]">
              Welcome
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <form id="signin-form" onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#0071ce] hover:bg-[#004c91]" 
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>

                {/* Test User Buttons */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-3 text-center">Quick Actions:</p>
                  <div className="space-y-2">
                    <Button
                      onClick={handleTestManagerLogin}
                      variant="outline"
                      className="w-full text-sm"
                      disabled={loading}
                    >
                      Login as Manager (manager@gmail.com)
                    </Button>
                    <Button
                      onClick={handleTestWorkerLogin}
                      variant="outline"
                      className="w-full text-sm"
                      disabled={loading}
                    >
                      Login as Worker (worker@gmail.com)
                    </Button>
                    <Button
                      onClick={handleDirectAccess}
                      variant="secondary"
                      className="w-full text-sm"
                    >
                      Skip Login (Direct Access)
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={role} onValueChange={(value: 'manager' | 'worker') => setRole(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="worker">Worker</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {role === 'worker' && (
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        type="text"
                        placeholder="e.g., Electronics, Grocery, Fashion"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full bg-[#0071ce] hover:bg-[#004c91]" 
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-white/80 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold mb-2">Demo Options:</h3>
          <p className="mb-2">You can either:</p>
          <ul className="space-y-1">
            <li>• Create test accounts using the Sign Up form</li>
            <li>• Use the quick login buttons if accounts exist</li>
            <li>• Click "Skip Login" to access the dashboard directly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Auth;
