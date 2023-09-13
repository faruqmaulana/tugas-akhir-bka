import React from "react";
import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewer = (props: { url: string; className?: string }) => {
  const { url, className = "" } = props;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleResource = () => {
    return url;
  };

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div
        className={className}
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          height: "500px",
          width: "100%",
        }}
      >
        <Viewer
          fileUrl={handleResource()}
          defaultScale={SpecialZoomLevel.PageWidth}
          plugins={[defaultLayoutPluginInstance]}
        />
      </div>
    </Worker>
  );
};

export default PdfViewer;
