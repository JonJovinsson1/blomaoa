import { useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { PDFDocument } from 'pdf-lib';

const inter = Inter({ subsets: ['latin'] });

export default function Pdf() {
  const [uploadedPDFs, setUploadedPDFs] = useState([]);
  const [textBoxContent, setTextBoxContent] = useState(''); // Add a state for the text box content

  const handleFileUpload = async (event) => {
    const files = event.target.files;
  
    for (const file of files) {
      try {
        const pdfBytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(pdfBytes);
        const pages = pdf.getPages();
        let text = '';
        for (const page of pages) {
          text += await page.getTextContent();
        }
        // Update the text box content with the extracted text
        setTextBoxContent(textBoxContent + text);
      } catch (error) {
        console.error('Error parsing PDF:', error);
      }
    }
  };

  // Delete a PDF from the list by index
  const handleFileDelete = (index) => {
    const updatedPDFs = [...uploadedPDFs];
    const deletedPDF = updatedPDFs.splice(index, 1)[0]; // Get the deleted PDF
    setUploadedPDFs(updatedPDFs);
    setTextBoxContent(textBoxContent.replace(deletedPDF.text, '')); // Remove the text from the text box content
  };

  // Toggle the visibility of the text for a PDF by index
  const handleTextToggle = (index) => {
    const updatedPDFs = [...uploadedPDFs];
    updatedPDFs[index].showText = !updatedPDFs[index].showText; // Add or flip the showText property
    setUploadedPDFs(updatedPDFs);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      {/* Create a two-column layout with CSS */}
      <div className="mt-8 flex w-full">
        {/* Left column for the text box */}
        <div className="w-1/3 h-full mr-4">
          {/* Use textarea element to create a text box */}
          <textarea
            className="w-full h-full p-2 border border-gray-300 rounded"
            value={textBoxContent}
            readOnly // Make the text box read-only
          />
        </div>

        {/* Right column for the file upload and list of PDFs */}
        <div className="w-2/3 h-full">
          {/* File Upload */}
          <div>
            <input type="file" accept=".pdf" onChange={handleFileUpload} />
          </div>

          {/* Display List of PDFs and Text Content */}
          <div className="mt-4">
            {uploadedPDFs.map((pdf, index) => (
              <div
                key={index}
                className="p-2 rounded border border-gray-300 mt-2 flex items-center justify-between"
              >
                <span>{pdf.name}</span>
                <div className="flex space-x-2">
                  {/* Add a button to toggle the text display */}
                  <button onClick={() => handleTextToggle(index)}>
                    {pdf.showText ? 'Hide Text' : 'Show Text'}
                  </button>
                  {/* Add a button to delete the PDF */}
                  <button onClick={() => handleFileDelete(index)}>Delete</button>
                </div>
                {/* Display the text if showText is true */}
                {pdf.showText && <pre className="p-2 bg-gray-100">{pdf.text}</pre>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
