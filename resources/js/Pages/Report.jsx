import React, { useRef } from "react";
import "../../css/report.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// Component Imports
import LagnaWasanaEnglish from "../Components/LagnaWasanaEnglish";
import LagnaWasanaTamil from "../Components/lagnawasanawaTamil";
import LagnaWasanaSinhala from "../Components/lagnawasanawaSinhala";
import SasiriEnglish from "../Components/sasiriEnglish";
import SasiriSinhala from "../Components/sasiriSinhala";
import SasiriTamil from "../Components/sasiriTamil";
import KaprukaEnglish from "../Components/kaprukaEnglish";
import KaprukaSinhala from "../Components/kaprukaSinhala";
import KaprukaTamil from "../Components/kaprukaTamil";
import ShanidaEnglish from "../Components/shanidaEnglish";
import ShanidaSinhala from "../Components/shanidaSinhala";
import ShanidaTamil from "../Components/shanidaTamil";
import SuperballEnglish from "../Components/superballEnglish";
import SuperballSinhala from "../Components/superballSinhala";
import SuperballTamil from "../Components/superballTamil";
import AdakotipathiEnglish from "../Components/adakotipathiEnglish";
import AdakotipathiSinhala from "../Components/adakotipathiSinhala";
import AdakotipathiTamil from "../Components/adakotipathiTamil";
import SupiridanaEnglish from "../Components/supiridanaEnglish";
import SupiridanaSinhala from "../Components/supiridanaSinhala";
import SupiridanaTamil from "../Components/supiridanaTamil";
import HeaderEnglish from "../Components/headerEnglish";
import HeaderSinhala from "@/Components/headerSinhala";
import HeaderTamil from "@/Components/headerTamil";
import FooterSinhala from "@/Components/footerSinhala";
import FooterEnglish from "@/Components/footerEnglish";
import FooterTamil from "@/Components/footerTamil";

const Report = () => {
  const reportRef = useRef(null);
  const englishRef = useRef(null);
  const sinhalaRef = useRef(null);
  const tamilRef = useRef(null);

  const downloadPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const elements = [reportRef.current];
    let verticalOffset = 0;

    for (const element of elements) {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position + verticalOffset, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      verticalOffset += 10; // Add space between sections
    }

    pdf.save('lottery-report.pdf');
  };

  const renderSection = (ref, components) => (
    <div ref={ref} className="section-container">
      {components.map((Component, index) => (
        <div key={index} className="component-wrapper">
          <Component />
        </div>
      ))}
    </div>
  );

  return (
    <div className="report-wrapper">
      <button 
        onClick={downloadPDF} 
        className="download-button"
      >
        Download as PDF
      </button>

      <div className="report-sections" ref={reportRef}>
        <div className="column">
          {/* English Section */}
          {renderSection(englishRef, [
            HeaderEnglish,
            LagnaWasanaEnglish,
            SasiriEnglish,
            KaprukaEnglish,
            ShanidaEnglish,
            SuperballEnglish,
            AdakotipathiEnglish,
            SupiridanaEnglish,
            FooterEnglish,
          ])}
        </div>

        <div className="column">
          {/* Sinhala Section */}
          {renderSection(sinhalaRef, [
            HeaderSinhala,
            LagnaWasanaSinhala,
            SasiriSinhala,
            KaprukaSinhala,
            ShanidaSinhala,
            SuperballSinhala,
            AdakotipathiSinhala,
            SupiridanaSinhala,
            FooterSinhala,
          ])}
        </div>

        <div className="column">
          {/* Tamil Section */}
          {renderSection(tamilRef, [
            HeaderTamil,
            LagnaWasanaTamil,
            SasiriTamil,
            KaprukaTamil,
            ShanidaTamil,
            SuperballTamil,
            AdakotipathiTamil,
            SupiridanaTamil,
            FooterTamil,
          ])}
        </div>
      </div>
    </div>
  );
};

export default Report;
