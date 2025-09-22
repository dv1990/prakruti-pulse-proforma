import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Download, FileText, Table, Database } from 'lucide-react';
import { PrakrutiResult } from '@/types/prakruti';
import { PatientDetails } from '@/types/patient';
import { exportToPDF, exportToCSV, exportDetailedJSON } from '@/utils/exportUtils';
import { toast } from '@/hooks/use-toast';

interface ExportDialogProps {
  result: PrakrutiResult;
  responses?: any[];
  patientDetails?: PatientDetails;
}

const ExportDialog = ({ result, responses = [], patientDetails }: ExportDialogProps) => {
  const [userName, setUserName] = useState(patientDetails?.name || '');
  const [isExporting, setIsExporting] = useState(false);
  const [open, setOpen] = useState(false);

  // Update userName when patientDetails change
  useEffect(() => {
    if (patientDetails?.name) {
      setUserName(patientDetails.name);
    }
  }, [patientDetails]);

  const handleExport = async (type: 'pdf' | 'csv' | 'json') => {
    if (!userName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for the report",
        variant: "destructive"
      });
      return;
    }

    setIsExporting(true);
    let success = false;

    try {
      switch (type) {
        case 'pdf':
          success = await exportToPDF(result, userName, patientDetails);
          break;
        case 'csv':
          success = exportToCSV(result, userName, patientDetails);
          break;
        case 'json':
          success = exportDetailedJSON(result, userName, responses, patientDetails);
          break;
      }

      if (success) {
        toast({
          title: "Export Successful",
          description: `${type.toUpperCase()} report has been downloaded`
        });
        setOpen(false);
      } else {
        throw new Error('Export failed');
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating the report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Assessment Report</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userName">Name for Report</Label>
            <Input
              id="userName"
              placeholder="Enter patient/client name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Export Format:</h4>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" 
                  onClick={() => handleExport('pdf')}>
              <CardContent className="p-4 flex items-center space-x-3">
                <FileText className="w-8 h-8 text-red-600" />
                <div>
                  <h5 className="font-medium">PDF Report</h5>
                  <p className="text-sm text-muted-foreground">
                    Professional formatted report for practitioners
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" 
                  onClick={() => handleExport('csv')}>
              <CardContent className="p-4 flex items-center space-x-3">
                <Table className="w-8 h-8 text-green-600" />
                <div>
                  <h5 className="font-medium">CSV Data</h5>
                  <p className="text-sm text-muted-foreground">
                    Structured data for analysis and record-keeping
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" 
                  onClick={() => handleExport('json')}>
              <CardContent className="p-4 flex items-center space-x-3">
                <Database className="w-8 h-8 text-blue-600" />
                <div>
                  <h5 className="font-medium">Detailed JSON</h5>
                  <p className="text-sm text-muted-foreground">
                    Complete data including responses for technical use
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {isExporting && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Generating report...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;