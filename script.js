// URL of the PDF file
const pdfUrl = "https://cis.fhstp.ac.at/addons/STPCore/menueplan.php";

// Setting up PDF.js
const pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";

// Load the PDF
const loadingTask = pdfjsLib.getDocument(pdfUrl);
loadingTask.promise.then(
  (pdf) => {
    // Fetch the first page
    pdf.getPage(1).then((page) => {
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      // Prepare canvas using PDF page dimensions
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Append the canvas to the viewer div
      document.getElementById("pdf-viewer").appendChild(canvas);

      // Render the PDF page into the canvas context
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      page.render(renderContext);
    });
  },
  (reason) => {
    // PDF loading error
    console.error(reason);
  }
);
