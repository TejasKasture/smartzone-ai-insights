
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, DollarSign, Users, TrendingUp, Clock, ShoppingCart } from 'lucide-react';

interface Zone {
  id: string;
  name: string;
  category: string;
  traffic: number;
  sales: number;
  coordinates: { x: number; y: number; width: number; height: number };
  temperature: number;
}

interface ZoneDetailModalProps {
  zone: Zone | null;
  isOpen: boolean;
  onClose: () => void;
}

const ZoneDetailModal: React.FC<ZoneDetailModalProps> = ({ zone, isOpen, onClose }) => {
  if (!zone) return null;

  // Generate additional analytics data
  const conversionRate = Math.round((zone.sales / (zone.traffic * 100)) * 100);
  const avgDwellTime = Math.floor(Math.random() * 180) + 60; // 1-4 minutes
  const peakHour = Math.floor(Math.random() * 12) + 9; // 9 AM - 9 PM
  const topProducts = [
    'iPhone 15 Pro',
    'Samsung Galaxy S24',
    'MacBook Air M3',
    'iPad Pro',
    'AirPods Pro'
  ].slice(0, 3);

  const getPerformanceStatus = (temperature: number) => {
    if (temperature > 0.8) return { status: 'Excellent', color: 'bg-green-500', text: 'text-green-700' };
    if (temperature > 0.6) return { status: 'Good', color: 'bg-blue-500', text: 'text-blue-700' };
    if (temperature > 0.4) return { status: 'Average', color: 'bg-yellow-500', text: 'text-yellow-700' };
    return { status: 'Needs Attention', color: 'bg-red-500', text: 'text-red-700' };
  };

  const performance = getPerformanceStatus(zone.temperature);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#004c91] flex items-center gap-3">
            Zone {zone.id} - {zone.name}
            <Badge className={`${performance.color} text-white`}>
              {performance.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{zone.traffic}</p>
                <p className="text-sm text-gray-600">Daily Visitors</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">${(zone.sales / 1000).toFixed(1)}K</p>
                <p className="text-sm text-gray-600">Daily Sales</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{conversionRate}%</p>
                <p className="text-sm text-gray-600">Conversion Rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{avgDwellTime}s</p>
                <p className="text-sm text-gray-600">Avg Dwell Time</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traffic Patterns */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Traffic Patterns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Peak Hour</span>
                    <span className="font-semibold">{peakHour}:00 - {peakHour + 1}:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Heat Level</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: zone.temperature > 0.8 ? '#ef4444' : zone.temperature > 0.6 ? '#f59e0b' : zone.temperature > 0.4 ? '#10b981' : '#3b82f6' }}
                      ></div>
                      <span className="text-sm font-medium">{Math.round(zone.temperature * 100)}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Footfall Trend</span>
                    <span className="text-green-600 font-semibold">↗ +12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Top Performing Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{product}</p>
                        <p className="text-sm text-gray-600">Rank #{index + 1}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${Math.floor(Math.random() * 1000) + 500}</p>
                        <p className="text-xs text-gray-500">Daily Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Zone Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Zone Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <p className="font-semibold">{zone.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Zone ID:</span>
                    <p className="font-semibold">{zone.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Area Size:</span>
                    <p className="font-semibold">{zone.coordinates.width} x {zone.coordinates.height} ft</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <p className="font-semibold">Row {zone.id[0]}, Col {zone.id[1]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {zone.temperature > 0.7 ? (
                    <>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800 font-medium">✓ High Performance Zone</p>
                        <p className="text-xs text-green-700">Consider expanding product selection</p>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800 font-medium">💡 Optimize Layout</p>
                        <p className="text-xs text-blue-700">Add premium products to maximize revenue</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800 font-medium">⚠ Needs Attention</p>
                        <p className="text-xs text-yellow-700">Consider promotional activities</p>
                      </div>
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <p className="text-sm text-orange-800 font-medium">🔄 Reorganize Products</p>
                        <p className="text-xs text-orange-700">Move high-demand items to this zone</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZoneDetailModal;
