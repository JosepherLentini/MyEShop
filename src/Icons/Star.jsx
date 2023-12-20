import * as React from "react";
const Star = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    data-name="star outlined"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0z" data-name="Rectangle 4" />
    <path
      fill="#EED561"
      stroke="#EED561"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m12 18-5.878 3.09 1.123-6.545L2.489 9.91l6.572-.955L12 3l2.939 5.955 6.572.955-4.755 4.635 1.123 6.545Z"
    />
  </svg>
);
export default Star;
