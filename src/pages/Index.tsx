
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StoreHeatMap from '../components/StoreHeatMap';
import ZoneAnalytics from '../components/ZoneAnalytics';
import CameraMapping from '../components/CameraMapping';
import SalesAnalytics from '../components/SalesAnalytics';
import SeasonalTrends from '../components/SeasonalTrends';
import { Activity, Camera, TrendingUp, Calendar, MapPin, BarChart3, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const { profile, signOut, isAdmin } = useAuth();

  const handleSignOut = async () => {
    await signOut();
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
                {isAdmin ? 'Admin/Manager' : 'Worker'} 
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
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="heatmap" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-white shadow-md">
            <TabsTrigger value="heatmap" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Heat Map
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Zone Analytics
            </TabsTrigger>
            <TabsTrigger value="cameras" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Camera Mapping
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Sales Analytics
            </TabsTrigger>
            <TabsTrigger value="seasonal" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Seasonal Trends
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="heatmap">
            <StoreHeatMap onZoneSelect={setSelectedZone} selectedZone={selectedZone} />
          </TabsContent>

          <TabsContent value="analytics">
            <ZoneAnalytics selectedZone={selectedZone} />
          </TabsContent>

          <TabsContent value="cameras">
            <CameraMapping />
          </TabsContent>

          <TabsContent value="sales">
            <SalesAnalytics />
          </TabsContent>

          <TabsContent value="seasonal">
            <SeasonalTrends />
          </TabsContent>

          <TabsContent value="reports">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Performance Reports</h3>
              <p className="text-gray-600 mb-4">
                {isAdmin 
                  ? "Advanced analytics and reporting for administrators..." 
                  : "Basic reporting features for workers..."
                }
              </p>
              {!isAdmin && (
                <p className="text-sm text-gray-500">
                  Contact your administrator for advanced reporting features.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
