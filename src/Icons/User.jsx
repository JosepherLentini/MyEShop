import * as React from "react";
const User = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="#0000" d="M0 0h24v24H0z" />
    <path
      fill="#000000"
      fillRule="evenodd"
      d="M6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8ZM5.43 16.902C7.057 16.223 9.224 16 12 16c2.771 0 4.935.22 6.559.898 1.742.727 2.812 1.963 3.382 3.76A1.03 1.03 0 0 1 20.959 22H3.035c-.69 0-1.188-.67-.978-1.335.568-1.797 1.634-3.033 3.374-3.762Z"
      clipRule="evenodd"
    />
  </svg>
);
export default User;
