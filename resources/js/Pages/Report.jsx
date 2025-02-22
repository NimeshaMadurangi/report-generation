import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "../../css/report.css";

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
  const isMondayOrWednesday = today === 1 || today === 2; //change
  const isSasiriDay = [2, 3, 4, 5, 6].includes(today); //change

  const generatePDF = async () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const captureAndAddToPDF = async (elementRef, addPage) => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      element.style.opacity = "1";
      element.style.display = "block";

      window.scrollTo(0, 0); // Ensure page is fully rendered

      await new Promise((resolve) => setTimeout(resolve, 500));

      // Increased scale for better resolution
      const scale = 7; // Higher scale (e.g., 3 for better quality)

      // Capture the image with html2canvas
      const canvas = await html2canvas(element, {
        scale: scale,  // Higher scale for better resolution
        useCORS: true,  // Ensures CORS handling
        logging: false, // Set to `true` if you want to debug issues
        willReadFrequently: true,
        backgroundColor: "white", // Ensure background color is white (avoid transparency)
        scrollX: 0, // Ensure we capture the full content
        scrollY: 0, // Ensure we capture the full content
      });

      const imgData = canvas.toDataURL("image/png");

      const pxWidth = canvas.width;
      const pxHeight = canvas.height;

      // Convert to mm using scale factor
      const mmWidth = (pxWidth * 0.264583) / scale;
      const mmHeight = (pxHeight * 0.264583) / scale;

      // Add image to PDF with adjusted resolution
      pdf.addImage(imgData, "PNG", 0, 0, mmWidth, mmHeight);

      if (addPage) {
        pdf.addPage();
      }
    };

    // Generate PDF sections for each language
    await captureAndAddToPDF(englishReportRef, true);
    await captureAndAddToPDF(sinhalaReportRef, true);
    await captureAndAddToPDF(tamilReportRef, false);

    // Save the PDF
    pdf.save("lottery-reports.pdf");
  };

  const renderSection = (components) => (
    <div className="report-section">
      {components
        .filter(Boolean)
        .map((Component, index) => (
          <div
            key={index}
            className={`component ${index === 0 ? 'first-component' : ''} ${index === components.length - 1 ? 'last-component' : ''}`}
          >
            <Component />
          </div>
        ))}
    </div>
  );
  

  return (
    <div className="report-container">

      {/* English Report */}
      <div ref={englishReportRef} className="section-padding report-section">
        {renderSection([
          HeaderEnglish,
          KaprukaEnglish,
          LagnaWasanaEnglish,
          AdakotipathiEnglish,
          ShanidaEnglish,
          SuperballEnglish,
          isSasiriDay && SasiriEnglish,
          isMondayOrWednesday && JayodaEnglish,
          SupiridanaEnglish,
          FooterEnglish,
        ])}
      </div>

      <br />

      {/* Sinhala Report */}
      <div ref={sinhalaReportRef} className="section-padding report-section">
        {renderSection([
          HeaderSinhala,
          KaprukaSinhala,
          LagnaWasanaSinhala,
          AdakotipathiSinhala,
          ShanidaSinhala,
          SuperballSinhala,
          isSasiriDay && SasiriSinhala,
          isMondayOrWednesday && JayodaSinhala,
          SupiridanaSinhala,
          FooterSinhala,
        ])}
      </div>

      <br />

      {/* Tamil Report */}
      <div ref={tamilReportRef} className="section-padding report-section">
        {renderSection([
          HeaderTamil,
          KaprukaTamil,
          LagnaWasanaTamil,
          AdakotipathiTamil,
          ShanidaTamil,
          SuperballTamil,
          isSasiriDay && SasiriTamil,
          isMondayOrWednesday && JayodaTamil,
          SupiridanaTamil,
          FooterTamil,
        ])}
      </div>

      <div className="report-button-container">
        <button onClick={generatePDF} className="report-button">
          Download All Reports
        </button>
      </div>
    </div>
  );
};

export default Report;
