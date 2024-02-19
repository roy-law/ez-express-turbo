import React from "react";

interface SquareProps {
  color: string;
  label: string;
  onClick: () => void;
}

function getContrastColor(hexColor: string) {
  // Convert the hex color to RGB values
  const r = parseInt(hexColor.slice(1, 3), 16) / 255;
  const g = parseInt(hexColor.slice(3, 5), 16) / 255;
  const b = parseInt(hexColor.slice(5, 7), 16) / 255;

  // Calculate relative luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Choose text color based on luminance
  return luminance > 0.5 ? "black" : "white";
}

export const RouteColorPaint: React.FC<SquareProps> = ({
  color,
  label,
  onClick,
}) => {
  const style = {
    backgroundColor: color,
    padding: 10,
    borderRadius: 5,
  };

  const labelColor = getContrastColor(color);

  return (
    <button style={style} onClick={onClick}>
      <p style={{ color: labelColor }}>{label}</p>
    </button>
  );
};
