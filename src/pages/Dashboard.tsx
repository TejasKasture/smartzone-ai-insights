
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StoreManagement from '@/components/StoreManagement';
import ProductManagement from '@/components/ProductManagement';
import StoreLayout from '@/components/StoreLayout';
import ZoneAnalytics from '@/components/ZoneAnalytics';
import CameraMapping from '@/components/CameraMapping';
import SalesAnalytics from '@/components/SalesAnalytics';
import SeasonalTrends from '@/components/SeasonalTrends';
import CSVDownload from '@/components/CSVDownload';
import { BarChart3, Store, Package, Camera, TrendingUp, Calendar, MapPin, Activity } from 'lucide-react';

const Dashboard = () => {
  const { profile, isManager } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleSectionSelect = (sectionId: string | null) => {
    setSelectedSection(sectionId);
  };

  // Sample data for CSV downloads
  const getCSVData = (tabName: string) => {
    switch (tabName) {
      case 'overview':
        return [
          { metric: 'Total Sales', value: '$45,231.89', change: '+20.1%' },
          { metric: 'Available Sections', value: '12', change: '8 high-traffic' },
          { metric: 'Products', value: '573', change: '12 low stock' },
          { metric: 'Cameras', value: '24', change: 'All operational' }
        ];
      case 'stores':
        return [
          { store: 'Main Store', location: 'Downtown', sales: '$25,000', status: 'Active' },
          { store: 'Branch Store', location: 'Mall', sales: '$20,231', status: 'Active' }
        ];
      case 'products':
        return [
          { name: 'Kitchen Appliances', category: 'Kitchen', stock: 45, sales: '$5,200' },
          { name: 'Bedding Sets', category: 'Bedding', stock: 32, sales: '$3,800' },
          { name: 'Towels', category: 'Bath', stock: 78, sales: '$2,100' }
        ];
      case 'zones':
        return [
          { zone: 'Kitchen', traffic: 85, sales: '$8,500', performance: 'High' },
          { zone: 'Bedding', traffic: 72, sales: '$6,200', performance: 'Medium' },
          { zone: 'Bath', traffic: 58, sales: '$4,100', performance: 'Low' }
        ];
      case 'sales':
        return [
          { date: '2024-01-01', sales: '$1,200', transactions: 45, avg_order: '$26.67' },
          { date: '2024-01-02', sales: '$1,450', transactions: 52, avg_order: '$27.88' },
          { date: '2024-01-03', sales: '$1,100', transactions: 38, avg_order: '$28.95' }
        ];
      default:
        return [{ message: 'No data available for this section' }];
    }
  };

  const managerTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'stores', label: 'Stores', icon: Store },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'layout', label: 'Store Layout', icon: MapPin },
    { id: 'zones', label: 'Section Analytics', icon: Activity },
    { id: 'cameras', label: 'Cameras', icon: Camera },
    { id: 'sales', label: 'Sales Analytics', icon: TrendingUp },
    { id: 'trends', label: 'Seasonal Trends', icon: Calendar },
  ];

  const workerTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'layout', label: 'Store Layout', icon: MapPin },
    { id: 'zones', label: 'Section Analytics', icon: Activity },
    { id: 'sales', label: 'Sales Analytics', icon: TrendingUp },
  ];

  const tabs = isManager ? managerTabs : workerTabs;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isManager ? 'Manager Dashboard' : 'Worker Dashboard'}
          </h1>
          <p className="text-gray-600">
            Welcome back, {profile?.full_name || 'User'}! 
            {profile?.department && ` • ${profile.department}`}
          </p>
        </div>
        
        {/* CSV Download for Managers */}
        {isManager && (
          <CSVDownload
            data={getCSVData(activeTab)}
            filename={`${activeTab}-data-${new Date().toISOString().split('T')[0]}`}
            buttonText={`Export ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Data`}
            className="bg-[#0071ce] text-white hover:bg-[#004c91]"
          />
        )}
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
          {isManager && (
            <div className="flex justify-end mb-4">
              <CSVDownload
                data={getCSVData('overview')}
                filename={`overview-metrics-${new Date().toISOString().split('T')[0]}`}
                buttonText="Download Overview Data"
              />
            </div>
          )}
          
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
                <CardTitle className="text-sm font-medium">Available Sections</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">8 high-traffic sections</p>
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
                Your intelligent product placement and section optimization system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Recent Activity</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Kitchen section performance increased by 15%</li>
                    <li>• New product placement recommendations available</li>
                    <li>• Weekly sales report generated</li>
                    <li>• Camera maintenance scheduled for Blankets section</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Quick Actions</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• View today's sales performance</li>
                    <li>• Check section optimization suggestions</li>
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
              {isManager && (
                <div className="flex justify-end mb-4">
                  <CSVDownload
                    data={getCSVData('stores')}
                    filename={`stores-data-${new Date().toISOString().split('T')[0]}`}
                    buttonText="Download Stores Data"
                  />
                </div>
              )}
              <StoreManagement />
            </TabsContent>
            
            <TabsContent value="products">
              {isManager && (
                <div className="flex justify-end mb-4">
                  <CSVDownload
                    data={getCSVData('products')}
                    filename={`products-data-${new Date().toISOString().split('T')[0]}`}
                    buttonText="Download Products Data"
                  />
                </div>
              )}
              <ProductManagement />
            </TabsContent>
            
            <TabsContent value="cameras">
              {isManager && (
                <div className="flex justify-end mb-4">
                  <CSVDownload
                    data={getCSVData('cameras')}
                    filename={`cameras-data-${new Date().toISOString().split('T')[0]}`}
                    buttonText="Download Cameras Data"
                  />
                </div>
              )}
              <CameraMapping />
            </TabsContent>
            
            <TabsContent value="trends">
              {isManager && (
                <div className="flex justify-end mb-4">
                  <CSVDownload
                    data={getCSVData('trends')}
                    filename={`trends-data-${new Date().toISOString().split('T')[0]}`}
                    buttonText="Download Trends Data"
                  />
                </div>
              )}
              <SeasonalTrends />
            </TabsContent>
          </>
        )}

        <TabsContent value="layout">
          {isManager && (
            <div className="flex justify-end mb-4">
              <CSVDownload
                data={getCSVData('layout')}
                filename={`layout-data-${new Date().toISOString().split('T')[0]}`}
                buttonText="Download Layout Data"
              />
            </div>
          )}
          <StoreLayout onSectionSelect={handleSectionSelect} selectedSection={selectedSection} />
        </TabsContent>
        
        <TabsContent value="zones">
          {isManager && (
            <div className="flex justify-end mb-4">
              <CSVDownload
                data={getCSVData('zones')}
                filename={`zones-analytics-${new Date().toISOString().split('T')[0]}`}
                buttonText="Download Zone Analytics"
              />
            </div>
          )}
          <ZoneAnalytics selectedZone={selectedSection} />
        </TabsContent>
        
        <TabsContent value="sales">
          {isManager && (
            <div className="flex justify-end mb-4">
              <CSVDownload
                data={getCSVData('sales')}
                filename={`sales-analytics-${new Date().toISOString().split('T')[0]}`}
                buttonText="Download Sales Data"
              />
            </div>
          )}
          <SalesAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
