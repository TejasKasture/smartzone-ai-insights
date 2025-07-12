
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StoreManagement from '@/components/StoreManagement';
import ProductManagement from '@/components/ProductManagement';
import StoreHeatMap from '@/components/StoreHeatMap';
import ZoneAnalytics from '@/components/ZoneAnalytics';
import CameraMapping from '@/components/CameraMapping';
import SalesAnalytics from '@/components/SalesAnalytics';
import SeasonalTrends from '@/components/SeasonalTrends';
import { BarChart3, Store, Package, Camera, TrendingUp, Calendar, MapPin, Activity } from 'lucide-react';

const Dashboard = () => {
  const { profile, isManager } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const managerTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'stores', label: 'Stores', icon: Store },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'heatmap', label: 'Store Map', icon: MapPin },
    { id: 'zones', label: 'Zone Analytics', icon: Activity },
    { id: 'cameras', label: 'Cameras', icon: Camera },
    { id: 'sales', label: 'Sales Analytics', icon: TrendingUp },
    { id: 'trends', label: 'Seasonal Trends', icon: Calendar },
  ];

  const workerTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'heatmap', label: 'Store Map', icon: MapPin },
    { id: 'zones', label: 'Zone Analytics', icon: Activity },
    { id: 'sales', label: 'Sales Analytics', icon: TrendingUp },
  ];

  const tabs = isManager ? managerTabs : workerTabs;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {isManager ? 'Manager Dashboard' : 'Worker Dashboard'}
        </h1>
        <p className="text-gray-600">
          Welcome back, {profile?.full_name || 'User'}! 
          {profile?.department && ` • ${profile.department}`}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2 px-3 py-2"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Zones</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">4 high-traffic zones</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">12 low stock items</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cameras</CardTitle>
                <Camera className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">All systems operational</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Welcome to SmartZone AI</CardTitle>
              <CardDescription>
                Your intelligent product placement and zone optimization system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Recent Activity</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Zone A performance increased by 15%</li>
                    <li>• New product placement recommendations available</li>
                    <li>• Weekly sales report generated</li>
                    <li>• Camera maintenance scheduled for Zone C</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Quick Actions</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• View today's sales performance</li>
                    <li>• Check zone optimization suggestions</li>
                    <li>• Review camera system status</li>
                    <li>• Generate custom analytics report</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {isManager && (
          <>
            <TabsContent value="stores">
              <StoreManagement />
            </TabsContent>
            
            <TabsContent value="products">
              <ProductManagement />
            </TabsContent>
            
            <TabsContent value="cameras">
              <CameraMapping />
            </TabsContent>
            
            <TabsContent value="trends">
              <SeasonalTrends />
            </TabsContent>
          </>
        )}

        <TabsContent value="heatmap">
          <StoreHeatMap />
        </TabsContent>
        
        <TabsContent value="zones">
          <ZoneAnalytics />
        </TabsContent>
        
        <TabsContent value="sales">
          <SalesAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
