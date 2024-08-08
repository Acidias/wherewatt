import React from "react";
import Svg, { Path } from "react-native-svg";

function HomeIcon({ color, size }) {
  return (
    <Svg
      width={size || "800px"}
      height={size || "800px"}
      viewBox="0 0 1024 1024"
    >
      <Path
        fill={color || "#000000"}
        d="M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z"
      />
    </Svg>
  );
}

export default HomeIcon;
