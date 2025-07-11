
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const SeasonalTrends: React.FC = () => {
  // Generate seasonal data similar to the heat map you showed
  const monthlyData = [
    { month: 'Jan', traffic: 65, sales: 42000, temperature: 0.2 },
    { month: 'Feb', traffic: 70, sales: 45000, temperature: 0.3 },
    { month: 'Mar', traffic: 85, sales: 58000, temperature: 0.6 },
    { month: 'Apr', traffic: 78, sales: 52000, temperature: 0.5 },
    { month: 'May', traffic: 92, sales: 68000, temperature: 0.8 },
    { month: 'Jun', traffic: 88, sales: 61000, temperature: 0.7 },
    { month: 'Jul', traffic: 95, sales: 72000, temperature: 0.9 },
    { month: 'Aug', traffic: 90, sales: 65000, temperature: 0.8 },
    { month: 'Sep', traffic: 82, sales: 55000, temperature: 0.6 },
    { month: 'Oct', traffic: 87, sales: 62000, temperature: 0.7 },
    { month: 'Nov', traffic: 98, sales: 78000, temperature: 1.0 },
    { month: 'Dec', traffic: 100, sales: 85000, temperature: 1.0 },
  ];

  // Heat map data by month and day (similar to your insolation chart)
  const heatMapData = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= 31; day++) {
      // Skip invalid days for some months
      if ((month === 1 && day > 28) || ([3, 5, 8, 10].includes(month) && day > 30)) continue;
      
      let intensity;
      // Simulate seasonal patterns
      if (month >= 10 || month <= 1) { // Holiday season
        intensity = 0.7 + Math.random() * 0.3;
      } else if (month >= 5 && month <= 7) { // Summer
        intensity = 0.5 + Math.random() * 0.4;
      } else { // Spring/Fall  
        intensity = 0.3 + Math.random() * 0.4;
      }
      
      heatMapData.push({
        month: months[month],
        day,
        intensity: Math.min(intensity, 1),
        traffic: Math.floor(intensity * 100) + 20
      });
    }
  }

  const categoryTrends = [
    { category: 'Electronics', Q1: 85, Q2: 72, Q3: 68, Q4: 95 },
    { category: 'Clothing', Q1: 65, Q2: 78, Q3: 82, Q4: 88 },
    { category: 'Groceries', Q1: 92, Q2: 88, Q3: 85, Q4: 98 },
    { category: 'Home & Garden', Q1: 45, Q2: 85, Q3: 78, Q4: 55 },
    { category: 'Sports', Q1: 58, Q2: 88, Q3: 92, Q4: 62 },
    { category: 'Toys', Q1: 35, Q2: 42, Q3: 48, Q4: 95 },
  ];

  const getHeatColor = (intensity: number) => {
    if (intensity < 0.2) return '#1e3a8a';
    if (intensity < 0.4) return '#3b82f6';
    if (intensity < 0.6) return '#10b981';
    if (intensity < 0.8) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="space-y-6">
      {/* Monthly Traffic & Sales Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#004c91]">Annual Traffic & Sales Pattern</CardTitle>
          <p className="text-gray-600">Monthly performance overview with seasonal variations</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="traffic" 
                stroke="#0071ce" 
                strokeWidth={3}
                dot={{ fill: '#004c91', strokeWidth: 2, r: 5 }}
                name="Traffic"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="sales" 
                stroke="#ffc220" 
                strokeWidth={3}
                dot={{ fill: '#f68121', strokeWidth: 2, r: 5 }}
                name="Sales ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Heat Map Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#004c91]">Daily Traffic Heat Map</CardTitle>
          <p className="text-gray-600">Traffic intensity by month and day (similar to your insolation data)</p>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <span className="text-sm font-medium">Traffic Intensity:</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#1e3a8a] rounded"></div>
              <span className="text-xs">Low (20-40)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#3b82f6] rounded"></div>
              <span className="text-xs">Medium (40-60)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#10b981] rounded"></div>
              <span className="text-xs">Good (60-80)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#f59e0b] rounded"></div>
              <span className="text-xs">High (80-90)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#ef4444] rounded"></div>
              <span className="text-xs">Peak (90-100)</span>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 overflow-auto">
            <svg width="900" height="400" viewBox="0 0 900 400">
              {/* Month labels */}
              {months.map((month, index) => (
                <text
                  key={month}
                  x="40"
                  y={50 + index * 30}
                  textAnchor="end"
                  className="text-sm font-medium fill-gray-700"
                >
                  {month}
                </text>
              ))}
              
              {/* Day labels */}
              {[1, 5, 10, 15, 20, 25, 31].map((day) => (
                <text
                  key={day}
                  x={50 + (day * 25)}
                  y="35"
                  textAnchor="middle"
                  className="text-sm font-medium fill-gray-700"
                >
                  {day}
                </text>
              ))}
              
              {/* Heat map cells */}
              {heatMapData.slice(0, 372).map((item, index) => { // Limit for performance
                const monthIndex = months.indexOf(item.month);
                const x = 50 + (item.day * 25);
                const y = 45 + (monthIndex * 30);
                
                return (
                  <rect
                    key={`${item.month}-${item.day}`}
                    x={x}
                    y={y}
                    width="24"
                    height="24"
                    fill={getHeatColor(item.intensity)}
                    stroke="#ffffff"
                    strokeWidth="1"
                    className="hover:stroke-yellow-400 hover:stroke-2 cursor-pointer"
                  >
                    <title>{`${item.month} ${item.day}: ${item.traffic} visitors`}</title>
                  </rect>
                );
              })}
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Quarterly Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#004c91]">Quarterly Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Q1" fill="#1e3a8a" name="Q1" />
              <Bar dataKey="Q2" fill="#3b82f6" name="Q2" />
              <Bar dataKey="Q3" fill="#10b981" name="Q3" />
              <Bar dataKey="Q4" fill="#ef4444" name="Q4" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Seasonal Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#004c91]">Seasonal Insights & Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Peak Seasons</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800">🎄 Holiday Season (Nov-Dec)</h4>
                  <p className="text-sm text-red-700">Peak traffic and sales. Prepare for 40-50% increase.</p>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-medium text-orange-800">☀️ Summer Season (Jun-Aug)</h4>
                  <p className="text-sm text-orange-700">Steady performance. Focus on outdoor and travel products.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Optimization Opportunities</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800">📱 Electronics in Q4</h4>
                  <p className="text-sm text-blue-700">95% performance in Q4. Maximize premium product placement.</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800">🧸 Toys Year-End</h4>
                  <p className="text-sm text-green-700">Massive Q4 spike to 95%. Plan inventory and space allocation.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeasonalTrends;
