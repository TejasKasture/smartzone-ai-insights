
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleManagerAccess = () => {
    toast({
      title: "Manager Access",
      description: "Accessing dashboard as Manager",
    });
    localStorage.setItem('demo_access', 'true');
    localStorage.setItem('demo_role', 'manager');
    localStorage.setItem('demo_name', 'John Manager');
    localStorage.setItem('demo_department', '');
    navigate('/');
  };

  const handleWorkerAccess = () => {
    toast({
      title: "Worker Access", 
      description: "Accessing dashboard as Worker",
    });
    localStorage.setItem('demo_access', 'true');
    localStorage.setItem('demo_role', 'worker');
    localStorage.setItem('demo_name', 'Jane Worker');
    localStorage.setItem('demo_department', 'Electronics');
    navigate('/');
  };

  const handleDirectAccess = () => {
    toast({
      title: "Accessing Dashboard",
      description: "Entering demo mode",
    });
    localStorage.setItem('demo_access', 'true');
    localStorage.setItem('demo_role', 'manager');
    localStorage.setItem('demo_name', 'Demo User');
    localStorage.setItem('demo_department', '');
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
              Welcome to Demo
            </CardTitle>
            <CardDescription className="text-center">
              Choose your role to explore the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                onClick={handleManagerAccess}
                className="w-full bg-[#0071ce] hover:bg-[#004c91] h-12"
              >
                Enter as Manager
                <span className="block text-xs opacity-80">Full access to all features</span>
              </Button>
              
              <Button
                onClick={handleWorkerAccess}
                variant="outline"
                className="w-full h-12"
              >
                Enter as Worker
                <span className="block text-xs opacity-60">Limited access - Analytics only</span>
              </Button>
              
              <Button
                onClick={handleDirectAccess}
                variant="secondary"
                className="w-full"
              >
                Quick Demo Access
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <div className="mt-6 p-4 bg-white/80 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold mb-2">Demo Features:</h3>
          <ul className="space-y-1">
            <li>• <strong>Manager:</strong> Store management, products, cameras, full analytics</li>
            <li>• <strong>Worker:</strong> Store map, zone analytics, sales data</li>
            <li>• Interactive heat maps and real-time data visualization</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Auth;
