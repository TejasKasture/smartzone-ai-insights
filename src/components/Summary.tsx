import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SummaryProps {
  userRole?: 'manager' | 'worker';
}

export const Summary: React.FC<SummaryProps> = ({ userRole = 'worker' }) => {
  const summaryMetrics = [
    { label: 'Product Moves', value: '5' },
    { label: 'Discount Offers', value: '5' },
    { label: 'Bundle Deals', value: '3' },
    { label: 'Product Badges', value: '3' }
  ];

  const discountOffers = [
    { sku: 'D302', discount: '20%', duration: '30 days', reason: 'slow moving inventory' },
    { sku: 'D303', discount: '25%', duration: '30 days', reason: 'slow moving inventory' },
    { sku: 'E401', discount: '15%', duration: '30 days', reason: 'slow moving inventory' },
    { sku: 'E402', discount: '20%', duration: '30 days', reason: 'slow moving inventory' },
    { sku: 'E403', discount: '10%', duration: '15 days', reason: 'new item with low initial uptake' }
  ];

  const bundleDeals = [
    { 
      name: 'Hair Care Essentials', 
      products: 'B101, B102, B103', 
      discount: '20%', 
      reason: 'complementary products' 
    },
    { 
      name: 'Laundry Combo', 
      products: 'C201, C202, C203', 
      discount: '15%', 
      reason: 'complementary laundry products' 
    },
    { 
      name: 'Snack Delight Pack', 
      products: 'F501, F502, F503', 
      discount: '25%', 
      reason: 'complementary snack items' 
    }
  ];

  const productBadges = [
    { sku: 'C201', badge: 'Hot Pick', reason: 'high demand item with strong sales and views' },
    { sku: 'B101', badge: 'Hot Pick', reason: 'top-performing shampoo with excellent views' },
    { sku: 'F501', badge: 'Hot Pick', reason: 'popular snack combo with high margin' }
  ];

  const warnings = [
    'Zone E is cold and underperforming; consider repurposing it for seasonal or clearance items.',
    'Zone D is low dwell and traffic make it unsuitable for anything except low-stakes inventory.',
    'Monitor Zone A closely: while traffic is high, dwell time is low. Best suited for flash or new-item displays.'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🏪 Store Optimization Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Generated on: {new Date().toLocaleString()}
          </p>
        </div>
      </div>

      {/* Summary Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {summaryMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Discount Offers */}
      <Card>
        <CardHeader>
          <CardTitle>Discount Offers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {discountOffers.map((offer, index) => (
            <div key={index} className="border rounded-lg p-4 bg-red-50 dark:bg-red-950/20">
              <h3 className="font-semibold text-lg">SKU: {offer.sku}</h3>
              <div className="mt-2 space-y-1">
                <p><strong>Discount:</strong> {offer.discount}</p>
                <p><strong>Duration:</strong> {offer.duration}</p>
                <p><strong>Reason:</strong> {offer.reason}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bundle Deals */}
      <Card>
        <CardHeader>
          <CardTitle>Bundle Deals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {bundleDeals.map((bundle, index) => (
            <div key={index} className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-950/20">
              <h3 className="font-semibold text-lg">{bundle.name}</h3>
              <div className="mt-2 space-y-1">
                <p><strong>Products:</strong> {bundle.products}</p>
                <p><strong>Bundle Discount:</strong> {bundle.discount}</p>
                <p><strong>Reason:</strong> {bundle.reason}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Product Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Product Badges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {productBadges.map((badge, index) => (
            <div key={index} className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/20">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-lg">SKU: {badge.sku}</h3>
                <Badge variant="secondary" className="bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200">
                  {badge.badge}
                </Badge>
              </div>
              <p className="mt-2"><strong>Reason:</strong> {badge.reason}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Warnings & Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Warnings & Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {warnings.map((warning, index) => (
            <div key={index} className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
              <p className="text-yellow-800 dark:text-yellow-200">{warning}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};