
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, MapPin, User } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  location: string;
  address: string | null;
  manager_id: string | null;
  created_at: string;
}

const StoreManagement = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [newStore, setNewStore] = useState({
    name: '',
    location: '',
    address: ''
  });
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStores(data || []);
    } catch (error) {
      console.error('Error fetching stores:', error);
      toast({
        title: "Error",
        description: "Failed to fetch stores",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    try {
      const { error } = await supabase
        .from('stores')
        .insert([newStore]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Store created successfully",
      });

      setNewStore({ name: '', location: '', address: '' });
      fetchStores();
    } catch (error) {
      console.error('Error creating store:', error);
      toast({
        title: "Error",
        description: "Failed to create store",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center">Loading stores...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Store Management</h2>
      </div>

      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Store</CardTitle>
            <CardDescription>Add a new store location</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateStore} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Store Name</Label>
                  <Input
                    id="name"
                    value={newStore.name}
                    onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                    placeholder="Downtown Store"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newStore.location}
                    onChange={(e) => setNewStore({ ...newStore, location: e.target.value })}
                    placeholder="New York"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newStore.address}
                  onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
                  placeholder="123 Main St, New York, NY 10001"
                />
              </div>
              <Button type="submit" className="w-full">
                Create Store
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <Card key={store.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                {store.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {store.location}
              </div>
              {store.address && (
                <p className="text-sm text-gray-500">{store.address}</p>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                {store.manager_id ? 'Manager Assigned' : 'No Manager'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoreManagement;
