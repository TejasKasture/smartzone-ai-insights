
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar } from 'recharts';

const SalesAnalytics: React.FC = () => {
  // Generate sample sales data
  const dailySalesData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    sales: Math.floor(Math.random() * 50000) + 30000,
    traffic: Math.floor(Math.random() * 1000) + 500,
    conversion: Math.floor(Math.random() * 15) + 8,
  }));

  const hourlySalesData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    electronics: Math.floor(Math.random() * 5000) + 1000,
    clothing: Math.floor(Math.random() * 3000) + 800,
    groceries: Math.floor(Math.random() * 4000) + 1200,
    others: Math.floor(Math.random() * 2000) + 500,
  }));

  const zoneRevenueData = [
    { zone: 'A1', revenue: 45000, growth: 12.5, category: 'Electronics' },
    { zone: 'A2', revenue: 38000, growth: 8.3, category: 'Clothing' },
    { zone: 'B1', revenue: 52000, growth: 15.7, category: 'Groceries' },
    { zone: 'B2', revenue: 34000, growth: -2.1, category: 'Home & Garden' },
    { zone: 'C1', revenue: 41000, growth: 9.8, category: 'Sports' },
    { zone: 'C2', revenue: 47000, growth: 11.2, category: 'Electronics' },
  ];

  return (
    <div className="space-y-6">
      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-700">Daily Revenue</h3>
            <p className="text-3xl font-bold text-green-600">$42.5K</p>
            <p className="text-sm text-green-500">↗ +8.2%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-700">Monthly Revenue</h3>
            <p className="text-3xl font-bold text-blue-600">$1.28M</p>
            <p className="text-sm text-blue-500">↗ +12.1%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-700">Avg Transaction</h3>
            <p className="text-3xl font-bold text-purple-600">$67.80</p>
            <p className="text-sm text-purple-500">↗ +5.4%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-700">Conversion Rate</h3>
            <p className="text-3xl font-bold text-orange-600">11.8%</p>
            <p className="text-sm text-orange-500">↗ +2.1%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#004c91]">Daily Sales & Traffic Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="sales" 
                  fill="url(#salesGradient)" 
                  stroke="#0071ce"
                  strokeWidth={2}
                />
                <Bar yAxisId="right" dataKey="traffic" fill="#ffc220" opacity={0.7} />
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0071ce" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0071ce" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hourly Category Sales */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#004c91]">Hourly Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="electronics" 
                  stackId="1" 
                  stroke="#0071ce" 
                  fill="#0071ce" 
                />
                <Area 
                  type="monotone" 
                  dataKey="clothing" 
                  stackId="1" 
                  stroke="#004c91" 
                  fill="#004c91" 
                />
                <Area 
                  type="monotone" 
                  dataKey="groceries" 
                  stackId="1" 
                  stroke="#ffc220" 
                  fill="#ffc220" 
                />
                <Area 
                  type="monotone" 
                  dataKey="others" 
                  stackId="1" 
                  stroke="#00a651" 
                  fill="#00a651" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Zone Revenue Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#004c91]">Zone Revenue Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {zoneRevenueData.map((zone) => (
              <div key={zone.zone} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#004c91] to-[#0071ce] text-white rounded-lg flex items-center justify-center font-bold">
                    {zone.zone}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{zone.category}</h3>
                    <p className="text-sm text-gray-600">Zone {zone.zone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="font-bold text-lg">${(zone.revenue / 1000).toFixed(1)}K</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Growth</p>
                    <p className={`font-bold text-lg ${zone.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {zone.growth > 0 ? '↗' : '↘'} {Math.abs(zone.growth)}%
                    </p>
                  </div>
                  
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#004c91] to-[#0071ce] h-2 rounded-full"
                      style={{ width: `${Math.min((zone.revenue / 60000) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#004c91]">AI-Powered Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">📈 Top Performing Zone</h4>
              <p className="text-sm text-green-700">Zone B1 (Groceries) shows exceptional performance with 15.7% growth and $52K revenue.</p>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Attention Needed</h4>
              <p className="text-sm text-yellow-700">Zone B2 (Home & Garden) shows negative growth. Consider promotional activities or product repositioning.</p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Optimization Opportunity</h4>
              <p className="text-sm text-blue-700">Peak sales hours are 2-4 PM. Consider staff optimization and promotional timing.</p>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">🎯 Revenue Potential</h4>
              <p className="text-sm text-purple-700">Electronics zones show high potential. Consider expanding premium product placement.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesAnalytics;
