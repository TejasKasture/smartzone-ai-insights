
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ZoneDetailModal from './ZoneDetailModal';

interface Zone {
  id: string;
  name: string;
  category: string;
  traffic: number;
  sales: number;
  coordinates: { x: number; y: number; width: number; height: number };
  temperature: number;
}

interface StoreHeatMapProps {
  onZoneSelect: (zoneId: string | null) => void;
  selectedZone: string | null;
}

const StoreHeatMap: React.FC<StoreHeatMapProps> = ({ onZoneSelect, selectedZone }) => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalZone, setModalZone] = useState<Zone | null>(null);

  useEffect(() => {
    // Generate realistic store zones with heat data
    const generateZones = () => {
      const categories = ['Electronics', 'Clothing', 'Groceries', 'Pharmacy', 'Home & Garden', 'Sports', 'Toys', 'Automotive'];
      const newZones: Zone[] = [];
      
      // Create a 6x4 grid of zones (A-F, 1-4)
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
          const zoneId = `${String.fromCharCode(65 + row)}${col + 1}`;
          const traffic = Math.floor(Math.random() * 100) + 20;
          const sales = Math.floor(Math.random() * 50000) + 10000;
          
          newZones.push({
            id: zoneId,
            name: `${categories[Math.floor(Math.random() * categories.length)]} Section`,
            category: categories[Math.floor(Math.random() * categories.length)],
            traffic,
            sales,
            coordinates: {
              x: col * 200 + 50,
              y: row * 100 + 50,
              width: 180,
              height: 80
            },
            temperature: traffic / 100 // Normalize traffic to temperature (0-1)
          });
        }
      }
      return newZones;
    };

    setZones(generateZones());
  }, []);

  const getHeatMapColor = (temperature: number) => {
    // Create heat map colors from blue (cold) to red (hot)
    if (temperature < 0.2) return '#1e3a8a'; // Dark blue
    if (temperature < 0.4) return '#3b82f6'; // Blue
    if (temperature < 0.6) return '#10b981'; // Green
    if (temperature < 0.8) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const handleZoneClick = (zone: Zone) => {
    onZoneSelect(zone.id);
    setModalZone(zone);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#004c91]">Store Layout Heat Map</CardTitle>
          <p className="text-gray-600">Click on any zone to view detailed analytics</p>
        </CardHeader>
        <CardContent>
          {/* Heat Map Legend */}
          <div className="mb-6 flex items-center gap-4">
            <span className="text-sm font-medium">Traffic Intensity:</span>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#1e3a8a] rounded"></div>
              <span className="text-xs">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#3b82f6] rounded"></div>
              <span className="text-xs">Medium-Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#10b981] rounded"></div>
              <span className="text-xs">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#f59e0b] rounded"></div>
              <span className="text-xs">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#ef4444] rounded"></div>
              <span className="text-xs">Very High</span>
            </div>
          </div>

          {/* Store Layout SVG */}
          <div className="bg-gray-50 rounded-lg p-4 overflow-auto">
            <svg 
              width="850" 
              height="650" 
              viewBox="0 0 850 650" 
              className="border border-gray-200 rounded bg-white"
            >
              {/* Store outline */}
              <rect 
                x="20" 
                y="20" 
                width="810" 
                height="610" 
                fill="none" 
                stroke="#004c91" 
                strokeWidth="3"
              />
              
              {/* Entrance */}
              <rect 
                x="380" 
                y="620" 
                width="90" 
                height="20" 
                fill="#0071ce"
              />
              <text x="425" y="635" textAnchor="middle" className="text-xs fill-white font-bold">
                ENTRANCE
              </text>

              {/* Zone Grid */}
              {zones.map((zone) => (
                <g key={zone.id}>
                  <rect
                    x={zone.coordinates.x}
                    y={zone.coordinates.y}
                    width={zone.coordinates.width}
                    height={zone.coordinates.height}
                    fill={getHeatMapColor(zone.temperature)}
                    stroke={selectedZone === zone.id ? "#fbbf24" : "#ffffff"}
                    strokeWidth={selectedZone === zone.id ? 3 : 1}
                    className="cursor-pointer transition-all duration-200 hover:stroke-yellow-400 hover:stroke-2"
                    onClick={() => handleZoneClick(zone)}
                  />
                  
                  {/* Zone Label */}
                  <text
                    x={zone.coordinates.x + zone.coordinates.width / 2}
                    y={zone.coordinates.y + zone.coordinates.height / 2 - 10}
                    textAnchor="middle"
                    className="text-sm font-bold fill-white pointer-events-none"
                  >
                    {zone.id}
                  </text>
                  
                  {/* Traffic Count */}
                  <text
                    x={zone.coordinates.x + zone.coordinates.width / 2}
                    y={zone.coordinates.y + zone.coordinates.height / 2 + 5}
                    textAnchor="middle"
                    className="text-xs fill-white pointer-events-none"
                  >
                    {zone.traffic} visitors
                  </text>
                  
                  {/* Zone Category */}
                  <text
                    x={zone.coordinates.x + zone.coordinates.width / 2}
                    y={zone.coordinates.y + zone.coordinates.height / 2 + 18}
                    textAnchor="middle"
                    className="text-xs fill-white pointer-events-none"
                  >
                    {zone.category}
                  </text>
                </g>
              ))}

              {/* Row Labels */}
              {['A', 'B', 'C', 'D', 'E', 'F'].map((letter, index) => (
                <text
                  key={letter}
                  x="35"
                  y={100 + index * 100}
                  textAnchor="middle"
                  className="text-lg font-bold fill-[#004c91]"
                >
                  {letter}
                </text>
              ))}

              {/* Column Labels */}
              {['1', '2', '3', '4'].map((number, index) => (
                <text
                  key={number}
                  x={140 + index * 200}
                  y="40"
                  textAnchor="middle"
                  className="text-lg font-bold fill-[#004c91]"
                >
                  {number}
                </text>
              ))}
            </svg>
          </div>

          {/* Summary Stats */}
          <div className="mt-6 grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Total Zones</h3>
              <p className="text-2xl font-bold">{zones.length}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Avg Traffic</h3>
              <p className="text-2xl font-bold">
                {Math.round(zones.reduce((sum, zone) => sum + zone.traffic, 0) / zones.length)}
              </p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Hot Zones</h3>
              <p className="text-2xl font-bold">
                {zones.filter(zone => zone.temperature > 0.7).length}
              </p>
            </div>
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Total Sales</h3>
              <p className="text-2xl font-bold">
                ${Math.round(zones.reduce((sum, zone) => sum + zone.sales, 0) / 1000)}K
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone Detail Modal */}
      <ZoneDetailModal 
        zone={modalZone}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default StoreHeatMap;
