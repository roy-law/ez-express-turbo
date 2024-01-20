import React from "react";

interface ProgressBarOverlayProps {
  processedRows: number;
  totalRows: number;
}

export const SubmissionProgressBarOverlay: React.FC<
  ProgressBarOverlayProps
> = ({ processedRows, totalRows }) => {
  const progress = (processedRows / totalRows) * 100;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "50%",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          Processing {processedRows} of {totalRows} rows
        </h2>
        <div
          style={{
            width: "100%",
            height: "20px",
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#007aff",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
