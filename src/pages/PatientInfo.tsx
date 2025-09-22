import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, User, Calendar, Phone } from 'lucide-react';
import { PatientDetails } from '@/types/patient';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const PatientInfo = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [patientDetails, setPatientDetails] = useState<PatientDetails>({
    name: '',
    age: 0,
    mobileNumber: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    age: '',
    mobileNumber: ''
  });

  const validateForm = () => {
    const newErrors = { name: '', age: '', mobileNumber: '' };
    let isValid = true;

    // Name validation
    if (!patientDetails.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (patientDetails.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Age validation
    if (!patientDetails.age || patientDetails.age < 1) {
      newErrors.age = 'Please enter a valid age';
      isValid = false;
    } else if (patientDetails.age > 120) {
      newErrors.age = 'Please enter a realistic age';
      isValid = false;
    }

    // Mobile number validation
    const mobileRegex = /^[+]?[\d\s\-\(\)]{10,15}$/;
    if (!patientDetails.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
      isValid = false;
    } else if (!mobileRegex.test(patientDetails.mobileNumber.replace(/\s/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid mobile number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Store patient details in localStorage
      localStorage.setItem('patient-details', JSON.stringify(patientDetails));
      
      toast({
        title: "Details Saved",
        description: "Ready to begin your Prakruti assessment"
      });
      
      // Navigate to assessment
      navigate('/assessment');
    }
  };

  const handleInputChange = (field: keyof PatientDetails, value: string | number) => {
    setPatientDetails(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Patient Information
          </h1>
          <p className="text-muted-foreground">
            Please provide your details before beginning the Prakruti assessment
          </p>
        </div>

        <Card className="shadow-soft border-border/50">
          <CardHeader className="bg-gradient-sage rounded-t-lg">
            <CardTitle className="text-xl font-semibold text-foreground flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={patientDetails.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Age Field */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Age *
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                  value={patientDetails.age || ''}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                  className={errors.age ? 'border-destructive' : ''}
                />
                {errors.age && (
                  <p className="text-sm text-destructive">{errors.age}</p>
                )}
              </div>

              {/* Mobile Number Field */}
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Mobile Number *
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={patientDetails.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  className={errors.mobileNumber ? 'border-destructive' : ''}
                />
                {errors.mobileNumber && (
                  <p className="text-sm text-destructive">{errors.mobileNumber}</p>
                )}
              </div>

              {/* Privacy Notice */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Privacy Note:</strong> Your personal information is stored locally on your device 
                  and is only used for generating personalized assessment reports. We do not share or store 
                  your data on external servers.
                </p>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90 text-lg py-3"
              >
                Begin Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="text-muted-foreground"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;