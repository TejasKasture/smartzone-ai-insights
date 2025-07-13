
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CSVDownloadProps {
  data: any[];
  filename: string;
  buttonText?: string;
  className?: string;
}

const CSVDownload: React.FC<CSVDownloadProps> = ({ 
  data, 
  filename, 
  buttonText = "Download CSV", 
  className = "" 
}) => {
  const { toast } = useToast();

  const downloadCSV = () => {
    try {
      if (!data || data.length === 0) {
        toast({
          title: "No Data",
          description: "No data available to download",
          variant: "destructive",
        });
        return;
      }

      // Get headers from first object
      const headers = Object.keys(data[0]);
      
      // Create CSV content
      const csvContent = [
        headers.join(','), // Header row
        ...data.map(row => 
          headers.map(header => {
            const value = row[header];
            // Handle values that might contain commas or quotes
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          }).join(',')
        )
      ].join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download Complete",
        description: `${filename}.csv has been downloaded successfully`,
      });
    } catch (error) {
      console.error('CSV download error:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download CSV file",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={downloadCSV}
      variant="outline"
      size="sm"
      className={`flex items-center gap-2 ${className}`}
    >
      <Download className="w-4 h-4" />
      {buttonText}
    </Button>
  );
};

export default CSVDownload;
