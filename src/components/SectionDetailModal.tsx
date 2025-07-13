
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { Users, DollarSign, TrendingUp, Clock, ShoppingCart, AlertTriangle, Lightbulb } from 'lucide-react';

interface Section {
  id: string;
  name: string;
  category: string;
  visitors: number;
  sales: number;
  coordinates: { x: number; y: number; width: number; height: number };
  available: boolean;
  shape: 'rectangle' | 'circle';
}

interface SectionDetailModalProps {
  section: Section | null;
  isOpen: boolean;
  onClose: () => void;
}

const SectionDetailModal: React.FC<SectionDetailModalProps> = ({ section, isOpen, onClose }) => {
  const { isManager } = useAuth();

  if (!section) return null;

  // Generate additional analytics data
  const conversionRate = Math.round((section.sales / (section.visitors * 100)) * 100);
  const avgDwellTime = Math.floor(Math.random() * 120) + 45; // 45-165 seconds
  const peakHour = Math.floor(Math.random() * 8) + 10; // 10 AM - 6 PM
  
  const topProducts = [
    { name: 'Premium Blanket Set', revenue: 1191, rank: 1 },
    { name: 'Designer Throw Pillows', revenue: 867, rank: 2 },
    { name: 'Ceramic Dinnerware', revenue: 664, rank: 3 },
  ];

  const getPerformanceStatus = (visitors: number) => {
    if (visitors > 50) return { status: 'Excellent', color: 'bg-green-500', text: 'text-green-700' };
    if (visitors > 30) return { status: 'Good', color: 'bg-blue-500', text: 'text-blue-700' };
    if (visitors > 15) return { status: 'Average', color: 'bg-yellow-500', text: 'text-yellow-700' };
    return { status: 'Needs Attention', color: 'bg-red-500', text: 'text-red-700' };
  };

  const performance = getPerformanceStatus(section.visitors);

  // Manager recommendations
  const managerRecommendations = [
    {
      type: 'success',
      title: 'High Performance Section',
      description: 'Consider expanding product selection or premium offerings',
      action: 'Add premium products to maximize revenue'
    },
    {
      type: 'info',
      title: 'Layout Optimization',
      description: 'Current positioning shows good foot traffic',
      action: 'Maintain current layout and monitor trends'
    },
    {
      type: 'warning',
      title: 'Inventory Management',
      description: 'Monitor stock levels for high-demand items',
      action: 'Implement automated reordering system'
    }
  ];

  // Worker recommendations
  const workerRecommendations = [
    {
      type: 'remove',
      items: ['Low-performing seasonal items', 'Dusty display accessories', 'Outdated promotional materials'],
      reason: 'These items are not attracting customers and taking up valuable space'
    },
    {
      type: 'add',
      items: ['Trending home decor items', 'Popular kitchen gadgets', 'Seasonal best-sellers'],
      reason: 'These items have high demand and will increase sales in this section'
    },
    {
      type: 'relocate',
      items: ['High-margin products to eye level', 'Complementary items together', 'Impulse purchase items near entrance'],
      reason: 'Better positioning will increase visibility and sales'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#004c91] flex items-center gap-3">
            {section.name} Section
            <Badge className={`${performance.color} text-white`}>
              {section.available ? 'Available' : 'Occupied'}
            </Badge>
            {section.available && (
              <Badge className={`${performance.color} text-white`}>
                {performance.status}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {section.available ? (
            <>
              {/* Key Metrics Grid - Only for available sections */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">{section.visitors}</p>
                    <p className="text-sm text-gray-600">Daily Visitors</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">${(section.sales / 1000).toFixed(1)}K</p>
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

              {/* Content based on user role */}
              {isManager ? (
                /* Manager View */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Traffic Patterns */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
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
                          <span className="text-sm text-gray-600">Traffic Level</span>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: section.visitors > 40 ? '#ef4444' : section.visitors > 25 ? '#f59e0b' : '#10b981' }}
                            ></div>
                            <span className="text-sm font-medium">{Math.round((section.visitors / 60) * 100)}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Footfall Trend</span>
                          <span className="text-green-600 font-semibold">↗ +15%</span>
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
                              <p className="font-medium text-gray-800">{product.name}</p>
                              <p className="text-sm text-gray-600">Rank #{product.rank}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-green-600">${product.revenue}</p>
                              <p className="text-xs text-gray-500">Daily Revenue</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Manager Recommendations */}
                  <div className="md:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-800">Strategic Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {managerRecommendations.map((rec, index) => (
                            <div key={index} className={`p-3 rounded-lg ${
                              rec.type === 'success' ? 'bg-green-50 border border-green-200' :
                              rec.type === 'info' ? 'bg-blue-50 border border-blue-200' :
                              'bg-yellow-50 border border-yellow-200'
                            }`}>
                              <p className={`text-sm font-medium ${
                                rec.type === 'success' ? 'text-green-800' :
                                rec.type === 'info' ? 'text-blue-800' :
                                'text-yellow-800'
                              }`}>
                                ✓ {rec.title}
                              </p>
                              <p className={`text-xs mt-1 ${
                                rec.type === 'success' ? 'text-green-700' :
                                rec.type === 'info' ? 'text-blue-700' :
                                'text-yellow-700'
                              }`}>
                                {rec.description}
                              </p>
                              <p className={`text-xs mt-1 font-medium ${
                                rec.type === 'success' ? 'text-green-800' :
                                rec.type === 'info' ? 'text-blue-800' :
                                'text-yellow-800'
                              }`}>
                                Action: {rec.action}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                /* Worker View */
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        Optimization Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Items to Remove */}
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Items to Remove
                          </h4>
                          <ul className="space-y-2">
                            {workerRecommendations[0].items.map((item, index) => (
                              <li key={index} className="text-sm text-red-700">
                                • {item}
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-red-600 mt-2 font-medium">
                            Reason: {workerRecommendations[0].reason}
                          </p>
                        </div>

                        {/* Items to Add */}
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                            <ShoppingCart className="w-4 h-4" />
                            Items to Add
                          </h4>
                          <ul className="space-y-2">
                            {workerRecommendations[1].items.map((item, index) => (
                              <li key={index} className="text-sm text-green-700">
                                • {item}
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-green-600 mt-2 font-medium">
                            Reason: {workerRecommendations[1].reason}
                          </p>
                        </div>

                        {/* Items to Relocate */}
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Items to Relocate
                          </h4>
                          <ul className="space-y-2">
                            {workerRecommendations[2].items.map((item, index) => (
                              <li key={index} className="text-sm text-blue-700">
                                • {item}
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-blue-600 mt-2 font-medium">
                            Reason: {workerRecommendations[2].reason}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          ) : (
            /* Occupied Section View */
            <div className="text-center py-8">
              <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Section Currently Occupied</h3>
              <p className="text-gray-500">
                This section is not available for modification at the moment.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Category: {section.category}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SectionDetailModal;
