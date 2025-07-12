
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  location: string;
  address: string | null;
  manager_id: string | null;
  created_at: string;
  updated_at: string;
}

const StoreManagement = () => {
  const { isManager } = useAuth();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: ''
  });
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
    } catch (error: any) {
      console.error('Error fetching stores:', error);
      toast({
        title: "Error loading stores",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingStore) {
        const { error } = await supabase
          .from('stores')
          .update({
            name: formData.name,
            location: formData.location,
            address: formData.address || null,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingStore.id);

        if (error) throw error;
        
        toast({
          title: "Store updated successfully",
          description: `${formData.name} has been updated.`,
        });
      } else {
        const { error } = await supabase
          .from('stores')
          .insert({
            name: formData.name,
            location: formData.location,
            address: formData.address || null
          });

        if (error) throw error;
        
        toast({
          title: "Store created successfully",
          description: `${formData.name} has been added.`,
        });
      }

      setDialogOpen(false);
      setEditingStore(null);
      setFormData({ name: '', location: '', address: '' });
      fetchStores();
    } catch (error: any) {
      console.error('Error saving store:', error);
      toast({
        title: "Error saving store",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (store: Store) => {
    setEditingStore(store);
    setFormData({
      name: store.name,
      location: store.location,
      address: store.address || ''
    });
    setDialogOpen(true);
  };

  const handleDelete = async (store: Store) => {
    if (!confirm(`Are you sure you want to delete ${store.name}?`)) return;

    try {
      const { error } = await supabase
        .from('stores')
        .delete()
        .eq('id', store.id);

      if (error) throw error;
      
      toast({
        title: "Store deleted",
        description: `${store.name} has been removed.`,
      });
      
      fetchStores();
    } catch (error: any) {
      console.error('Error deleting store:', error);
      toast({
        title: "Error deleting store",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading stores...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Store Management</h2>
        {isManager && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingStore(null);
                setFormData({ name: '', location: '', address: '' });
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Store
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingStore ? 'Edit Store' : 'Add New Store'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Store Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Optional"
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingStore ? 'Update Store' : 'Create Store'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <Card key={store.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{store.name}</span>
                {isManager && (
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(store)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(store)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {store.location}
                </div>
                {store.address && (
                  <p className="text-sm text-gray-500">{store.address}</p>
                )}
                <p className="text-xs text-gray-400">
                  Created: {new Date(store.created_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {stores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No stores found</p>
          {isManager && (
            <p className="text-sm text-gray-400">Add your first store to get started</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StoreManagement;
