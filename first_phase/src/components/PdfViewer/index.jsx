import React from "react";

import SinglePagePDFViewer from "./PdfViewer";

/* This is required only if the project file is located 
inside the app. Otherwise you can use the external link of the pdf file*/
import samplePDF from "./sample.pdf";

//import "./styles.css";

export default function PdfViewerDoc() {
  return (
    <div className="App">
     
      <h4>All Pages</h4>
      <div className="all-page-container">
        <SinglePagePDFViewer pdf={samplePDF} />
      </div>

      <hr />
    </div>
  );
}
