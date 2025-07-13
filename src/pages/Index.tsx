
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Dashboard from './Dashboard';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { profile, signOut, isManager } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#004c91] to-[#0071ce] text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">SmartZone AI Dashboard</h1>
            <p className="text-blue-100">Dynamic Product Placement & Zone Optimization System</p>
          </div>
          
          {/* User Profile Section */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold">{profile?.full_name || 'User'}</p>
              <p className="text-sm text-blue-200">
                {isManager ? 'Manager' : 'Worker'} 
                {profile?.department && ` • ${profile.department}`}
              </p>
            </div>
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-white text-[#004c91] font-semibold">
                {profile?.full_name ? getInitials(profile.full_name) : <User className="h-5 w-5" />}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="bg-transparent border-white text-white hover:bg-white hover:text-[#004c91]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Exit Demo
            </Button>
          </div>
        </div>
      </div>

      <Dashboard />
    </div>
  );
};

export default Index;
