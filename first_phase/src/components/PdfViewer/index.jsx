import React from "react";
import SinglePagePDFViewer from "./PdfViewer";
import './PdfViewer.css'
/* This is required only if the project file is located 
inside the app. Otherwise you can use the external link of the pdf file*/
import medicalPDF from "./Medical_checkup_pdf_low.pdf";
import physicalPDF from "./Physical_wellbeing_pdf_low.pdf";

//import "./styles.css";

export default function PdfViewerDoc(props) {
  return (
    <div className="App">
     
      {/*<h4>All Pages</h4>*/}
      <div className="all-page-container">
       {props.location.state.pdfName === 'physicalPDF' ? <SinglePagePDFViewer pdf={physicalPDF} /> :<SinglePagePDFViewer pdf={medicalPDF} />} 
      </div>

      <hr />
    </div>
  );
}
