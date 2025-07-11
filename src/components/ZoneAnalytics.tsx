
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface ZoneAnalyticsProps {
  selectedZone: string | null;
}

const ZoneAnalytics: React.FC<ZoneAnalyticsProps> = ({ selectedZone }) => {
  // Generate sample data
  const trafficData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    traffic: Math.floor(Math.random() * 80) + 20,
    sales: Math.floor(Math.random() * 1000) + 200,
  }));

  const categoryData = [
    { name: 'Electronics', value: 35, color: '#0071ce' },
    { name: 'Clothing', value: 25, color: '#004c91' },
    { name: 'Groceries', value: 20, color: '#ffc220' },
    { name: 'Home & Garden', value: 12, color: '#00a651' },
    { name: 'Others', value: 8, color: '#f68121' },
  ];

  const performanceData = [
    { zone: 'A1', performance: 85, revenue: 45000 },
    { zone: 'A2', performance: 72, revenue: 38000 },
    { zone: 'B1', performance: 91, revenue: 52000 },
    { zone: 'B2', performance: 68, revenue: 34000 },
    { zone: 'C1', performance: 79, revenue: 41000 },
    { zone: 'C2', performance: 83, revenue: 47000 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hourly Traffic Pattern */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#004c91]">
              Hourly Traffic Pattern {selectedZone && `- Zone ${selectedZone}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="traffic" 
                  stroke="#0071ce" 
                  strokeWidth={3}
                  dot={{ fill: '#004c91', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales by Hour */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#004c91]">Sales Performance by Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#0071ce" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#004c91]">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Zone Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#004c91]">Zone Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="performance" fill="#0071ce" />
                <Bar dataKey="revenue" fill="#ffc220" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#004c91]">Analytics Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold">Peak Hour</h3>
              <p className="text-2xl font-bold">2:00 PM</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold">Avg Conversion</h3>
              <p className="text-2xl font-bold">12.5%</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold">Daily Revenue</h3>
              <p className="text-2xl font-bold">$47.2K</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold">Top Category</h3>
              <p className="text-2xl font-bold">Electronics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZoneAnalytics;
