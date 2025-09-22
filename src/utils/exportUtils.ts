import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PrakrutiResult } from '@/types/prakruti';
import { PatientDetails } from '@/types/patient';

export const exportToPDF = async (result: PrakrutiResult, userName: string = 'User', patientDetails?: PatientDetails) => {
  try {
    // Create a new PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Set up colors and fonts
    pdf.setFont('helvetica');
    
    // Header
    pdf.setFontSize(24);
    pdf.setTextColor(34, 69, 34); // Forest green
    pdf.text('Prakruti Assessment Report', pageWidth / 2, 25, { align: 'center' });
    
    // Date and User
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    pdf.text(`Assessment Date: ${currentDate}`, 20, 40);
    pdf.text(`Patient Name: ${userName}`, 20, 48);
    
    if (patientDetails) {
      pdf.text(`Age: ${patientDetails.age} years`, 20, 56);
      pdf.text(`Mobile: ${patientDetails.mobileNumber}`, 20, 64);
    }
    
    // Constitution Result
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);
    const yStart = patientDetails ? 80 : 65;
    pdf.text('Constitution Analysis', 20, yStart);
    
    pdf.setFontSize(16);
    pdf.setTextColor(34, 69, 34);
    pdf.text(`Primary Constitution: ${result.constitution}`, 20, yStart + 15);
    
    // Dosha Scores
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Dosha Distribution:', 20, yStart + 35);
    
    const total = result.scores.vata + result.scores.pitta + result.scores.kapha;
    let yPos = yStart + 45;
    
    Object.entries(result.scores).forEach(([dosha, score]) => {
      const percentage = Math.round((score / total) * 100);
      pdf.setFontSize(12);
      pdf.text(`${dosha.toUpperCase()}: ${percentage}% (${score} points)`, 25, yPos);
      yPos += 8;
    });
    
    // Recommendations
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Personalized Recommendations:', 20, yPos + 10);
    
    yPos += 20;
    result.recommendations.forEach((recommendation, index) => {
      pdf.setFontSize(11);
      const lines = pdf.splitTextToSize(`${index + 1}. ${recommendation}`, pageWidth - 40);
      pdf.text(lines, 25, yPos);
      yPos += lines.length * 6 + 3;
      
      // Add new page if needed
      if (yPos > pageHeight - 30) {
        pdf.addPage();
        yPos = 20;
      }
    });
    
    // Disclaimer
    if (yPos > pageHeight - 50) {
      pdf.addPage();
      yPos = 20;
    }
    
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    const disclaimerText = 'Disclaimer: This assessment is for educational purposes only and should not replace professional medical advice. Consult with a qualified Ayurvedic practitioner for personalized treatment recommendations.';
    const disclaimerLines = pdf.splitTextToSize(disclaimerText, pageWidth - 40);
    pdf.text(disclaimerLines, 20, yPos + 20);
    
    // Save the PDF
    pdf.save(`prakruti-assessment-${userName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

export const exportToCSV = (result: PrakrutiResult, userName: string = 'User', patientDetails?: PatientDetails) => {
  try {
    const currentDate = new Date().toISOString();
    const total = result.scores.vata + result.scores.pitta + result.scores.kapha;
    
    // Create CSV data
    const csvData = [
      ['Prakruti Assessment Results'],
      [''],
      ['Assessment Date', currentDate],
      ['Patient Name', userName],
      ...(patientDetails ? [
        ['Age', patientDetails.age.toString()],
        ['Mobile Number', patientDetails.mobileNumber]
      ] : []),
      ['Constitution', result.constitution],
      ['Primary Dosha', result.primaryDosha],
      ['Secondary Dosha', result.secondaryDosha || 'None'],
      [''],
      ['Dosha Scores'],
      ['Dosha', 'Points', 'Percentage'],
      ['Vata', result.scores.vata.toString(), `${Math.round((result.scores.vata / total) * 100)}%`],
      ['Pitta', result.scores.pitta.toString(), `${Math.round((result.scores.pitta / total) * 100)}%`],
      ['Kapha', result.scores.kapha.toString(), `${Math.round((result.scores.kapha / total) * 100)}%`],
      [''],
      ['Recommendations'],
      ...result.recommendations.map((rec, index) => [`${index + 1}`, rec])
    ];
    
    // Convert to CSV string
    const csvString = csvData
      .map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n');
    
    // Create and download file
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `prakruti-assessment-${userName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error('Error generating CSV:', error);
    return false;
  }
};

export const exportDetailedJSON = (result: PrakrutiResult, userName: string = 'User', responses: any[] = [], patientDetails?: PatientDetails) => {
  try {
    const exportData = {
      assessmentDate: new Date().toISOString(),
      patientDetails: patientDetails || { name: userName },
      constitution: result.constitution,
      primaryDosha: result.primaryDosha,
      secondaryDosha: result.secondaryDosha,
      doshaScores: result.scores,
      recommendations: result.recommendations,
      responses: responses,
      metadata: {
        version: '1.0',
        totalQuestions: 18,
        assessmentType: 'Prakruti Parikshana'
      }
    };
    
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `prakruti-assessment-detailed-${userName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error('Error generating JSON:', error);
    return false;
  }
};