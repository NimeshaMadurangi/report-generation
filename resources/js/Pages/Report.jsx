import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "../../css/report.css"

// English Components
import HeaderEnglish from "../Components/headerEnglish";
import LagnaWasanaEnglish from "../Components/lagnawasanaEnglish";
import SasiriEnglish from "../Components/sasiriEnglish";
import KaprukaEnglish from "../Components/kaprukaEnglish";
import ShanidaEnglish from "../Components/shanidaEnglish";
import SuperballEnglish from "../Components/superballEnglish";
import AdakotipathiEnglish from "../Components/adakotipathiEnglish";
import SupiridanaEnglish from "../Components/supiridanaEnglish";
import JayodaEnglish from "../Components/jayodaEnglish";
import FooterEnglish from "../Components/footerEnglish";

// Sinhala Components
import HeaderSinhala from "../Components/headerSinhala";
import LagnaWasanaSinhala from "../Components/lagnawasanawaSinhala";
import SasiriSinhala from "../Components/sasiriSinhala";
import KaprukaSinhala from "../Components/kaprukaSinhala";
import ShanidaSinhala from "../Components/shanidaSinhala";
import SuperballSinhala from "../Components/superballSinhala";
import AdakotipathiSinhala from "../Components/adakotipathiSinhala";
import SupiridanaSinhala from "../Components/supiridanaSinhala";
import JayodaSinhala from "../Components/jayodaSinhala";
import FooterSinhala from "../Components/footerSinhala";

// Tamil Components
import HeaderTamil from "../Components/headerTamil";
import LagnaWasanaTamil from "../Components/lagnawasanawaTamil";
import SasiriTamil from "../Components/sasiriTamil";
import KaprukaTamil from "../Components/kaprukaTamil";
import ShanidaTamil from "../Components/shanidaTamil";
import SuperballTamil from "../Components/superballTamil";
import AdakotipathiTamil from "../Components/adakotipathiTamil";
import SupiridanaTamil from "../Components/supiridanaTamil";
import JayodaTamil from "../Components/jayodaTamil";
import FooterTamil from "../Components/footerTamil";

const Report = () => {
  const englishReportRef = useRef(null);
  const sinhalaReportRef = useRef(null);
  const tamilReportRef = useRef(null);

  const today = new Date().getDay();
  const isMondayOrWednesday = today === 1 || today === 2;
  const isSasiriDay = [0, 3, 4, 5, 6].includes(today);

  const generatePDF = async () => {
    const pdf = new jsPDF("portrait", "mm", "a4");

    // Generate English Report
    if (englishReportRef.current) {
      const canvas = await html2canvas(englishReportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      const verticalOffset = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 0;
      pdf.addImage(imgData, "PNG", 10, verticalOffset, pdfWidth - 20, imgHeight);
      pdf.addPage();
    }

    // Generate Sinhala Report
    if (sinhalaReportRef.current) {
      const canvas = await html2canvas(sinhalaReportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = 210;
      const pdfHeight = 297; 
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      const verticalOffset = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 0;
      pdf.addImage(imgData, "PNG", 10, verticalOffset, pdfWidth - 20, imgHeight);
      pdf.addPage();
    }

    // Generate Tamil Report
    if (tamilReportRef.current) {
      const canvas = await html2canvas(tamilReportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      const verticalOffset = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 0;
      pdf.addImage(imgData, "PNG", 10, verticalOffset, pdfWidth - 20, imgHeight);
    }

   
    pdf.save("lottery-reports.pdf");
  };

  const renderSection = (components) => (
    <div className="report-section">
      {components
        .filter(Boolean)
        .map((Component, index) => (
          <div
            key={index}
            className="component"
          >
            <Component />
          </div>
        ))}
    </div>
  );

  return (
    <div className="report-container">
      {/* English Report */}
      <div
        ref={englishReportRef}
        className="section-padding report-section"
      >
        {renderSection([
          HeaderEnglish,
          LagnaWasanaEnglish,
          isSasiriDay && SasiriEnglish,
          KaprukaEnglish,
          ShanidaEnglish,
          SuperballEnglish,
          AdakotipathiEnglish,
          SupiridanaEnglish,
          isMondayOrWednesday && JayodaEnglish,
          FooterEnglish,
        ])}
      </div>

      <br />

      {/* Sinhala Report */}
      <div ref={sinhalaReportRef} className="section-padding report-section">
        {renderSection([
          HeaderSinhala,
          LagnaWasanaSinhala,
          isSasiriDay && SasiriSinhala,
          KaprukaSinhala,
          ShanidaSinhala,
          SuperballSinhala,
          AdakotipathiSinhala,
          SupiridanaSinhala,
          isMondayOrWednesday && JayodaSinhala,
          FooterSinhala,
        ])}
      </div>

      <br />

      {/* Tamil Report */}
      <div ref={tamilReportRef} className="section-padding report-section">
        {renderSection([
          HeaderTamil,
          LagnaWasanaTamil,
          isSasiriDay && SasiriTamil,
          KaprukaTamil,
          ShanidaTamil,
          SuperballTamil,
          AdakotipathiTamil,
          SupiridanaTamil,
          isMondayOrWednesday && JayodaTamil,
          FooterTamil,
        ])}
      </div>

      <div className="report-button-container">
        <button
          onClick={generatePDF}
          className="report-button"
          aria-label="Download all reports as a single PDF"
        >
          Download All Reports
        </button>
      </div>
    </div>
  );
};

export default Report;
