import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Users, ClipboardList, Activity, LogOut, Plus } from 'lucide-react';

interface Assessment {
  id: string;
  created_at: string;
  primary_dosha: string;
  vata_score: number;
  pitta_score: number;
  kapha_score: number;
  patients: {
    name: string;
    age: number;
    mobile_number: string;
  };
}

export default function Dashboard() {
  const { user, profile, signOut, loading } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAssessments: 0,
    recentAssessments: 0
  });
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Redirect if not authenticated
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    if (profile?.id) {
      fetchDashboardData();
    }
  }, [profile]);

  const fetchDashboardData = async () => {
    try {
      // Fetch recent assessments with patient data
      const { data: assessmentsData, error: assessmentsError } = await supabase
        .from('assessments')
        .select(`
          id,
          created_at,
          primary_dosha,
          vata_score,
          pitta_score,
          kapha_score,
          patients (
            name,
            age,
            mobile_number
          )
        `)
        .eq('practitioner_id', profile!.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (assessmentsError) throw assessmentsError;

      // Fetch stats
      const { data: patientsCount } = await supabase
        .from('patients')
        .select('id', { count: 'exact' })
        .eq('practitioner_id', profile!.id);

      const { data: assessmentsCount } = await supabase
        .from('assessments')
        .select('id', { count: 'exact' })
        .eq('practitioner_id', profile!.id);

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const { data: recentCount } = await supabase
        .from('assessments')
        .select('id', { count: 'exact' })
        .eq('practitioner_id', profile!.id)
        .gte('created_at', oneWeekAgo.toISOString());

      setAssessments(assessmentsData || []);
      setStats({
        totalPatients: patientsCount?.length || 0,
        totalAssessments: assessmentsCount?.length || 0,
        recentAssessments: recentCount?.length || 0
      });
    } catch (error: any) {
      toast.error('Failed to load dashboard data');
      console.error(error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha.toLowerCase()) {
      case 'vata': return 'bg-blue-100 text-blue-800';
      case 'pitta': return 'bg-red-100 text-red-800';
      case 'kapha': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading || isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Practitioner Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {profile?.full_name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button asChild>
                <Link to="/patient-info">
                  <Plus className="h-4 w-4 mr-2" />
                  New Assessment
                </Link>
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPatients}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAssessments}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentAssessments}</div>
              <p className="text-xs text-muted-foreground">assessments completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Assessments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
            <CardDescription>Your latest patient assessments</CardDescription>
          </CardHeader>
          <CardContent>
            {assessments.length === 0 ? (
              <div className="text-center py-8">
                <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No assessments yet</p>
                <Button asChild>
                  <Link to="/patient-info">Start Your First Assessment</Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Primary Dosha</TableHead>
                    <TableHead>Scores (V/P/K)</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessments.map((assessment) => (
                    <TableRow key={assessment.id}>
                      <TableCell className="font-medium">
                        {assessment.patients.name}
                      </TableCell>
                      <TableCell>{assessment.patients.age}</TableCell>
                      <TableCell>
                        <Badge className={getDoshaColor(assessment.primary_dosha)}>
                          {assessment.primary_dosha}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {assessment.vata_score}/{assessment.pitta_score}/{assessment.kapha_score}
                      </TableCell>
                      <TableCell>
                        {new Date(assessment.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}