import React from "react";
import Svg, { Path } from "react-native-svg";

function HomeIcon({ color, size }) {
  return (
    <Svg
      width={size || "800px"}
      height={size || "800px"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M5 10L12 3L19 10L19 20H5L5 10Z"
        stroke={color || "#000000"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HomeIcon;
