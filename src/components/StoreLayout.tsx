
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionDetailModal from './SectionDetailModal';

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

interface StoreLayoutProps {
  onSectionSelect: (sectionId: string | null) => void;
  selectedSection: string | null;
}

const StoreLayout: React.FC<StoreLayoutProps> = ({ onSectionSelect, selectedSection }) => {
  const [sections, setSections] = useState<Section[]>([
    // Top row sections
    { id: 'kitchen', name: 'Kitchen', category: 'Appliances', visitors: 45, sales: 8500, coordinates: { x: 50, y: 50, width: 150, height: 80 }, available: true, shape: 'rectangle' },
    { id: 'appliances', name: 'Appliances', category: 'Electronics', visitors: 38, sales: 12000, coordinates: { x: 220, y: 50, width: 120, height: 80 }, available: false, shape: 'rectangle' },
    { id: 'towels', name: 'Towels', category: 'Home', visitors: 22, sales: 3200, coordinates: { x: 360, y: 50, width: 100, height: 80 }, available: true, shape: 'rectangle' },
    
    // Left side sections
    { id: 'office-storage', name: 'Office & Storage', category: 'Office', visitors: 15, sales: 2800, coordinates: { x: 20, y: 150, width: 80, height: 200 }, available: true, shape: 'rectangle' },
    { id: 'bedding', name: 'Bedding', category: 'Home', visitors: 35, sales: 5600, coordinates: { x: 20, y: 370, width: 80, height: 100 }, available: false, shape: 'rectangle' },
    
    // Center sections
    { id: 'checkout', name: 'Checkout', category: 'Service', visitors: 120, sales: 0, coordinates: { x: 120, y: 180, width: 100, height: 60 }, available: false, shape: 'rectangle' },
    { id: 'crockery', name: 'Crockery', category: 'Kitchen', visitors: 42, sales: 6800, coordinates: { x: 250, y: 160, width: 80, height: 80 }, available: true, shape: 'circle' },
    { id: 'bath', name: 'Bath', category: 'Home', visitors: 28, sales: 4200, coordinates: { x: 350, y: 140, width: 60, height: 60 }, available: true, shape: 'circle' },
    { id: 'frames', name: 'Frames', category: 'Decor', visitors: 18, sales: 2100, coordinates: { x: 180, y: 280, width: 80, height: 40 }, available: true, shape: 'rectangle' },
    { id: 'candles', name: 'Candles', category: 'Decor', visitors: 25, sales: 1800, coordinates: { x: 280, y: 280, width: 60, height: 40 }, available: true, shape: 'rectangle' },
    { id: 'blankets', name: 'Blankets', category: 'Home', visitors: 55, sales: 7200, coordinates: { x: 300, y: 320, width: 100, height: 100 }, available: false, shape: 'circle' },
    
    // Right side sections
    { id: 'no-longer', name: 'Specialty Items', category: 'Misc', visitors: 12, sales: 1500, coordinates: { x: 420, y: 150, width: 60, height: 80 }, available: true, shape: 'rectangle' },
    { id: 'gifts', name: 'Gifts', category: 'Seasonal', visitors: 33, sales: 4500, coordinates: { x: 420, y: 240, width: 60, height: 60 }, available: true, shape: 'rectangle' },
    { id: 'candle-right', name: 'Candles', category: 'Decor', visitors: 20, sales: 1600, coordinates: { x: 420, y: 320, width: 60, height: 60 }, available: true, shape: 'rectangle' },
    
    // Bottom sections
    { id: 'lamps', name: 'Lamps', category: 'Lighting', visitors: 30, sales: 5200, coordinates: { x: 80, y: 420, width: 60, height: 60 }, available: true, shape: 'circle' },
    { id: 'accessories', name: 'Accessories', category: 'Fashion', visitors: 40, sales: 3800, coordinates: { x: 160, y: 450, width: 80, height: 40 }, available: true, shape: 'rectangle' },
    { id: 'throw-pillows', name: 'Throw Pillows', category: 'Home', visitors: 45, sales: 3400, coordinates: { x: 250, y: 470, width: 120, height: 40 }, available: false, shape: 'rectangle' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalSection, setModalSection] = useState<Section | null>(null);

  const handleSectionClick = (section: Section) => {
    onSectionSelect(section.id);
    setModalSection(section);
    setShowModal(true);
  };

  const getSectionColor = (section: Section) => {
    if (!section.available) return '#e5e7eb'; // Gray for occupied
    if (section.visitors > 50) return '#ef4444'; // Red for high traffic
    if (section.visitors > 30) return '#f59e0b'; // Orange for medium traffic
    if (section.visitors > 15) return '#10b981'; // Green for low-medium traffic
    return '#3b82f6'; // Blue for low traffic
  };

  const getSectionBorder = (section: Section) => {
    return selectedSection === section.id ? '#fbbf24' : '#ffffff';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#004c91]">Store Layout - Available Sections</CardTitle>
          <p className="text-gray-600">Click on any section to view details and recommendations</p>
        </CardHeader>
        <CardContent>
          {/* Legend */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium">Section Status:</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#3b82f6] rounded"></div>
              <span className="text-xs">Available - Low Traffic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#10b981] rounded"></div>
              <span className="text-xs">Available - Medium Traffic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#f59e0b] rounded"></div>
              <span className="text-xs">Available - High Traffic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#ef4444] rounded"></div>
              <span className="text-xs">Available - Very High Traffic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#e5e7eb] rounded"></div>
              <span className="text-xs">Occupied</span>
            </div>
          </div>

          {/* Store Layout SVG */}
          <div className="bg-[#6366f1] rounded-lg p-4 overflow-auto">
            <svg 
              width="500" 
              height="520" 
              viewBox="0 0 500 520" 
              className="border-2 border-white rounded bg-[#6366f1]"
            >
              {/* Store outline */}
              <rect 
                x="10" 
                y="10" 
                width="480" 
                height="500" 
                fill="none" 
                stroke="white" 
                strokeWidth="2"
              />
              
              {/* Title */}
              <text x="250" y="30" textAnchor="middle" className="text-lg font-bold fill-white">
                FREE-FLOW LAYOUT
              </text>

              {/* Sections */}
              {sections.map((section) => (
                <g key={section.id}>
                  {section.shape === 'circle' ? (
                    <circle
                      cx={section.coordinates.x + section.coordinates.width / 2}
                      cy={section.coordinates.y + section.coordinates.height / 2}
                      r={section.coordinates.width / 2}
                      fill={getSectionColor(section)}
                      stroke={getSectionBorder(section)}
                      strokeWidth={selectedSection === section.id ? 3 : 1}
                      className="cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleSectionClick(section)}
                    />
                  ) : (
                    <rect
                      x={section.coordinates.x}
                      y={section.coordinates.y}
                      width={section.coordinates.width}
                      height={section.coordinates.height}
                      fill={getSectionColor(section)}
                      stroke={getSectionBorder(section)}
                      strokeWidth={selectedSection === section.id ? 3 : 1}
                      className="cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => handleSectionClick(section)}
                    />
                  )}
                  
                  {/* Section Label */}
                  <text
                    x={section.coordinates.x + section.coordinates.width / 2}
                    y={section.coordinates.y + section.coordinates.height / 2 - 5}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white pointer-events-none"
                  >
                    {section.name.toUpperCase()}
                  </text>
                  
                  {/* Visitor count */}
                  <text
                    x={section.coordinates.x + section.coordinates.width / 2}
                    y={section.coordinates.y + section.coordinates.height / 2 + 8}
                    textAnchor="middle"
                    className="text-xs fill-white pointer-events-none"
                  >
                    {section.visitors} visitors
                  </text>
                </g>
              ))}

              {/* Flow indicators (red dots from the original image) */}
              <circle cx="150" cy="200" r="3" fill="#ef4444" />
              <circle cx="200" cy="150" r="3" fill="#ef4444" />
              <circle cx="300" cy="180" r="3" fill="#ef4444" />
              <circle cx="350" cy="250" r="3" fill="#ef4444" />
              <circle cx="280" cy="350" r="3" fill="#ef4444" />
              <circle cx="180" cy="380" r="3" fill="#ef4444" />
              <circle cx="400" cy="300" r="3" fill="#ef4444" />
              <circle cx="120" cy="300" r="3" fill="#ef4444" />
              <circle cx="320" cy="420" r="3" fill="#ef4444" />
            </svg>
          </div>

          {/* Summary Stats */}
          <div className="mt-6 grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Total Sections</h3>
              <p className="text-2xl font-bold">{sections.length}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Available</h3>
              <p className="text-2xl font-bold">
                {sections.filter(section => section.available).length}
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold">High Traffic</h3>
              <p className="text-2xl font-bold">
                {sections.filter(section => section.visitors > 40 && section.available).length}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Avg Visitors</h3>
              <p className="text-2xl font-bold">
                {Math.round(sections.reduce((sum, section) => sum + section.visitors, 0) / sections.length)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Detail Modal */}
      <SectionDetailModal 
        section={modalSection}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default StoreLayout;
