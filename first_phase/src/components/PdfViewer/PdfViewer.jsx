import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import {Buttons} from '../InputFields'
import './PdfViewer.css'

export default function PdfViewer(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    console.log('offset ' + offset)
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    console.log('next page ')
    changePage(1);
  }

  const { pdf } = props;

  return (
    <div className = 'PDFContainer'>
     {/* <div>
         <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
         <div style = {{display:'flex'}}>
         <Buttons  disabled={pageNumber <= 1} onClick={previousPage} bgColor={'#F9E24D'}>Previous</Buttons>
         <Buttons  disabled={pageNumber >= numPages} onClick={nextPage} bgColor={'#F9E24D'}>Next</Buttons>
         </div>
      </div>
     <br />*/}
      <div style={{ width: 600 }}>
      <Document
        file={pdf}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
        className = 'customPdfContainer'
      >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
       {/*<Page pageNumber={pageNumber} width={600} /> */}
      </Document>
      </div>
      
    </div>
  );
}