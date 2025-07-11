
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Wifi, AlertTriangle, CheckCircle } from 'lucide-react';

interface CameraInfo {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  zones: string[];
  coordinates: { x: number; y: number };
  coverage: number;
  quality: 'HD' | '4K' | 'FHD';
}

const CameraMapping: React.FC = () => {
  const [cameras] = useState<CameraInfo[]>([
    {
      id: 'CAM001',
      name: 'North Entrance Camera',
      status: 'active',
      zones: ['A1', 'A2', 'B1', 'B2'],
      coordinates: { x: 200, y: 100 },
      coverage: 85,
      quality: '4K'
    },
    {
      id: 'CAM002',
      name: 'Center Aisle Camera',
      status: 'active',
      zones: ['B2', 'B3', 'C2', 'C3'],
      coordinates: { x: 400, y: 200 },
      coverage: 92,
      quality: '4K'
    },
    {
      id: 'CAM003',
      name: 'Electronics Section',
      status: 'maintenance',
      zones: ['C3', 'C4', 'D3', 'D4'],
      coordinates: { x: 600, y: 250 },
      coverage: 0,
      quality: 'HD'
    },
    {
      id: 'CAM004',
      name: 'South Wing Camera',
      status: 'active',
      zones: ['D1', 'D2', 'E1', 'E2'],
      coordinates: { x: 300, y: 400 },
      coverage: 78,
      quality: 'FHD'
    },
    {
      id: 'CAM005',
      name: 'Checkout Area Camera',
      status: 'active',
      zones: ['E3', 'E4', 'F3', 'F4'],
      coordinates: { x: 500, y: 500 },
      coverage: 95,
      quality: '4K'
    },
    {
      id: 'CAM006',
      name: 'West Corner Camera',
      status: 'inactive',
      zones: ['F1', 'F2'],
      coordinates: { x: 150, y: 550 },
      coverage: 0,
      quality: 'HD'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <Wifi className="w-4 h-4" />;
      case 'maintenance': return <AlertTriangle className="w-4 h-4" />;
      default: return <Camera className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#004c91]">Camera-Zone Mapping System</CardTitle>
          <p className="text-gray-600">Visual representation of camera coverage across store zones</p>
        </CardHeader>
        <CardContent>
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
              
              {/* Zone Grid (lighter background) */}
              {Array.from({ length: 24 }, (_, index) => {
                const row = Math.floor(index / 4);
                const col = index % 4;
                const zoneId = `${String.fromCharCode(65 + row)}${col + 1}`;
                
                return (
                  <g key={zoneId}>
                    <rect
                      x={50 + col * 200}
                      y={50 + row * 100}
                      width={180}
                      height={80}
                      fill="#f8fafc"
                      stroke="#e2e8f0"
                      strokeWidth="1"
                    />
                    <text
                      x={140 + col * 200}
                      y={95 + row * 100}
                      textAnchor="middle"
                      className="text-sm font-bold fill-gray-600"
                    >
                      {zoneId}
                    </text>
                  </g>
                );
              })}

              {/* Camera Coverage Areas */}
              {cameras.map((camera) => (
                <g key={camera.id}>
                  {/* Coverage circle */}
                  <circle
                    cx={camera.coordinates.x}
                    cy={camera.coordinates.y}
                    r={camera.status === 'active' ? 120 : 60}
                    fill={camera.status === 'active' ? "rgba(0, 113, 206, 0.1)" : "rgba(239, 68, 68, 0.1)"}
                    stroke={camera.status === 'active' ? "#0071ce" : "#ef4444"}
                    strokeWidth="2"
                    strokeDasharray={camera.status === 'active' ? "none" : "5,5"}
                  />
                  
                  {/* Camera icon */}
                  <circle
                    cx={camera.coordinates.x}
                    cy={camera.coordinates.y}
                    r="20"
                    fill={camera.status === 'active' ? "#0071ce" : camera.status === 'maintenance' ? "#f59e0b" : "#ef4444"}
                    stroke="#ffffff"
                    strokeWidth="3"
                  />
                  
                  {/* Camera symbol */}
                  <rect
                    x={camera.coordinates.x - 8}
                    y={camera.coordinates.y - 6}
                    width="16"
                    height="12"
                    fill="white"
                    rx="2"
                  />
                  <circle
                    cx={camera.coordinates.x}
                    cy={camera.coordinates.y}
                    r="4"
                    fill={camera.status === 'active' ? "#0071ce" : "#gray"}
                  />
                  
                  {/* Camera label */}
                  <text
                    x={camera.coordinates.x}
                    y={camera.coordinates.y + 35}
                    textAnchor="middle"
                    className="text-xs font-bold fill-gray-800"
                  >
                    {camera.id}
                  </text>
                </g>
              ))}

              {/* Legend */}
              <g transform="translate(650, 50)">
                <rect x="0" y="0" width="180" height="120" fill="white" stroke="#e2e8f0" strokeWidth="1" rx="5" />
                <text x="10" y="20" className="text-sm font-bold fill-gray-800">Camera Status</text>
                
                <circle cx="20" cy="40" r="8" fill="#0071ce" />
                <text x="35" y="45" className="text-xs fill-gray-700">Active</text>
                
                <circle cx="20" cy="60" r="8" fill="#f59e0b" />
                <text x="35" y="65" className="text-xs fill-gray-700">Maintenance</text>
                
                <circle cx="20" cy="80" r="8" fill="#ef4444" />
                <text x="35" y="85" className="text-xs fill-gray-700">Inactive</text>
                
                <circle cx="20" cy="100" r="8" fill="none" stroke="#0071ce" strokeWidth="2" strokeDasharray="2,2" />
                <text x="35" y="105" className="text-xs fill-gray-700">Coverage Area</text>
              </g>
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Camera Details Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-[#004c91]">Camera Status & Coverage Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {cameras.map((camera) => (
              <div key={camera.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full text-white ${getStatusColor(camera.status)}`}>
                    {getStatusIcon(camera.status)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{camera.name}</h3>
                    <p className="text-sm text-gray-600">ID: {camera.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Coverage</p>
                    <p className="font-bold text-lg">{camera.coverage}%</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Quality</p>
                    <Badge variant="outline" className="mt-1">{camera.quality}</Badge>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Zones Covered</p>
                    <div className="flex gap-1 mt-1">
                      {camera.zones.map((zone) => (
                        <Badge key={zone} variant="secondary" className="text-xs">
                          {zone}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Badge 
                    className={`${getStatusColor(camera.status)} text-white capitalize`}
                  >
                    {camera.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Camera className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{cameras.length}</p>
            <p className="text-sm text-gray-600">Total Cameras</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{cameras.filter(c => c.status === 'active').length}</p>
            <p className="text-sm text-gray-600">Active Cameras</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{cameras.filter(c => c.status === 'maintenance').length}</p>
            <p className="text-sm text-gray-600">Under Maintenance</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Wifi className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {Math.round(cameras.reduce((sum, cam) => sum + cam.coverage, 0) / cameras.length)}%
            </p>
            <p className="text-sm text-gray-600">Avg Coverage</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CameraMapping;
