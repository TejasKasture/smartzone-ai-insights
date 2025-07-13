
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Hardcoded users
  const users = {
    'tejas@manager.com': { password: 'manager123', role: 'manager', name: 'Tejas' },
    'dhananjay@worker.com': { password: 'worker123', role: 'worker', name: 'Dhananjay' }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = users[email as keyof typeof users];
      
      if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
      }

      // Set login data in localStorage
      localStorage.setItem('demo_access', 'true');
      localStorage.setItem('demo_role', user.role);
      localStorage.setItem('demo_name', user.name);
      localStorage.setItem('demo_email', email);
      localStorage.setItem('demo_department', user.role === 'worker' ? 'Electronics' : '');

      toast({
        title: "Login Successful",
        description: `Welcome ${user.name}! Logged in as ${user.role}`,
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (userEmail: string) => {
    const user = users[userEmail as keyof typeof users];
    setEmail(userEmail);
    setPassword(user.password);
    
    // Auto login
    localStorage.setItem('demo_access', 'true');
    localStorage.setItem('demo_role', user.role);
    localStorage.setItem('demo_name', user.name);
    localStorage.setItem('demo_email', userEmail);
    localStorage.setItem('demo_department', user.role === 'worker' ? 'Electronics' : '');

    toast({
      title: "Quick Login",
      description: `Logged in as ${user.name} (${user.role})`,
    });

    navigate('/');
  };

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
              Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
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
                {loading ? 'Logging In...' : 'Login'}
              </Button>
            </form>

            {/* Quick Login Buttons */}
            <div className="pt-4 border-t mt-4">
              <p className="text-sm text-gray-600 mb-3 text-center">Quick Login:</p>
              <div className="space-y-2">
                <Button
                  onClick={() => handleQuickLogin('tejas@manager.com')}
                  variant="outline"
                  className="w-full text-sm"
                  disabled={loading}
                >
                  Login as Manager Tejas
                </Button>
                <Button
                  onClick={() => handleQuickLogin('dhananjay@worker.com')}
                  variant="outline"
                  className="w-full text-sm"
                  disabled={loading}
                >
                  Login as Worker Dhananjay
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-white/80 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold mb-2">Demo Credentials:</h3>
          <ul className="space-y-1">
            <li>• <strong>Manager:</strong> tejas@manager.com / manager123</li>
            <li>• <strong>Worker:</strong> dhananjay@worker.com / worker123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Auth;
