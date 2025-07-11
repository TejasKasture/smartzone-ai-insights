
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import StoreHeatMap from '../components/StoreHeatMap';
import ZoneAnalytics from '../components/ZoneAnalytics';
import CameraMapping from '../components/CameraMapping';
import SalesAnalytics from '../components/SalesAnalytics';
import SeasonalTrends from '../components/SeasonalTrends';
import StoreManagement from '../components/StoreManagement';
import ProductManagement from '../components/ProductManagement';
import { Activity, Camera, TrendingUp, Calendar, MapPin, BarChart3, Building2, Package } from 'lucide-react';

const Dashboard = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Tabs defaultValue="heatmap" className="w-full">
        <TabsList className="grid w-full grid-cols-8 mb-6 bg-white shadow-md">
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
          <TabsTrigger value="stores" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Stores
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Products
          </TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap">
          <StoreHeatMap onZoneSelect={() => {}} selectedZone={null} />
        </TabsContent>

        <TabsContent value="analytics">
          <ZoneAnalytics selectedZone={null} />
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

        <TabsContent value="stores">
          <StoreManagement />
        </TabsContent>

        <TabsContent value="products">
          <ProductManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
