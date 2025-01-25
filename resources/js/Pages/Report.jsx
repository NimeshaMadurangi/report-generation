import React, { useRef, useState } from "react";
import "../../css/report.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import HeaderEnglish from "../Components/headerEnglish";
import LagnaWasanaEnglish from "../Components/lagnawasanaEnglish";
import SasiriEnglish from "../Components/sasiriEnglish";
import KaprukaEnglish from "../Components/kaprukaEnglish";
import ShanidaEnglish from "../Components/kaprukaEnglish";
import SuperballEnglish from "../Components/superballEnglish";
import AdakotipathiEnglish from "../Components/adakotipathiEnglish";
import SupiridanaEnglish from "../Components/supiridanaEnglish";
import JayodaEnglish from "../Components/jayodaEnglish";
import FooterEnglish from "../Components/footerEnglish";

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
  const isMondayOrWednesday = today === 1 || today === 3;
  const isSasiriDay = [0, 2, 4, 5, 6].includes(today);

  const downloadPDFSeparately = async () => {
    // English PDF
    const englishReportElement = englishReportRef.current;
    const englishCanvas = await html2canvas(englishReportElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#fff",
    });

    const englishPdf = new jsPDF("landscape", "mm", "a4");
    const englishImgData = englishCanvas.toDataURL("image/png");
    const imgWidth = 297;
    const imgHeight = (englishCanvas.height * imgWidth) / englishCanvas.width;
    englishPdf.addImage(englishImgData, "PNG", 0, 0, imgWidth, imgHeight);
    englishPdf.save("lottery-report-english.pdf");

    // Sinhala PDF
    const sinhalaReportElement = sinhalaReportRef.current;
    const sinhalaCanvas = await html2canvas(sinhalaReportElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#fff",
    });

    const sinhalaPdf = new jsPDF("landscape", "mm", "a4");
    const sinhalaImgData = sinhalaCanvas.toDataURL("image/png");
    const sinhalaImgHeight = (sinhalaCanvas.height * imgWidth) / sinhalaCanvas.width;
    sinhalaPdf.addImage(sinhalaImgData, "PNG", 0, 0, imgWidth, sinhalaImgHeight);
    sinhalaPdf.save("lottery-report-sinhala.pdf");

    // Tamil PDF
    const tamilReportElement = tamilReportRef.current;
    const tamilCanvas = await html2canvas(tamilReportElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#fff",
    });

    const tamilPdf = new jsPDF("landscape", "mm", "a4");
    const tamilImgData = tamilCanvas.toDataURL("image/png");
    const tamilImgHeight = (tamilCanvas.height * imgWidth) / tamilCanvas.width;
    tamilPdf.addImage(tamilImgData, "PNG", 0, 0, imgWidth, tamilImgHeight);
    tamilPdf.save("lottery-report-tamil.pdf");
  };

  const renderSection = (components) => {
    const validComponents = components.filter(Boolean);
    return validComponents.length > 0 ? (
      <div className="section-container">
        {validComponents.map((Component, index) => (
          <div key={index} className="component-wrapper">
            <Component />
          </div>
        ))}
      </div>
    ) : null;
  };

  return (
    <div className="report-wrapper">
      <div className="download-container">
        <button onClick={downloadPDFSeparately} className="download-button">
          Download PDFs
        </button>
      </div>

      {/* English Report */}
      <div className="report-sections language-report" ref={englishReportRef}>
        <div className="column">
          {renderSection([
            HeaderEnglish,
            LagnaWasanaEnglish,
            isSasiriDay ? SasiriEnglish : null,
            KaprukaEnglish,
            ShanidaEnglish,
            SuperballEnglish,
            AdakotipathiEnglish,
            SupiridanaEnglish,
            isMondayOrWednesday ? JayodaEnglish : null,
            FooterEnglish,
          ])}
        </div>
      </div>

      {/* Sinhala Report */}
      <div className="report-sections language-report" ref={sinhalaReportRef}>
        <div className="column">
          {renderSection([
            HeaderSinhala,
            LagnaWasanaSinhala,
            isSasiriDay ? SasiriSinhala : null,
            KaprukaSinhala,
            ShanidaSinhala,
            SuperballSinhala,
            AdakotipathiSinhala,
            SupiridanaSinhala,
            isMondayOrWednesday ? JayodaSinhala : null,
            FooterSinhala,
          ])}
        </div>
      </div>

      {/* Tamil Report */}
      <div className="report-sections language-report" ref={tamilReportRef}>
        <div className="column">
          {renderSection([
            HeaderTamil,
            LagnaWasanaTamil,
            isSasiriDay ? SasiriTamil : null,
            KaprukaTamil,
            ShanidaTamil,
            SuperballTamil,
            AdakotipathiTamil,
            SupiridanaTamil,
            isMondayOrWednesday ? JayodaTamil : null,
            FooterTamil,
          ])}
        </div>
      </div>
    </div>
  );
};

export default Report;