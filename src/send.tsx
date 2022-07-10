import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 36" {...props}>
    <path d="M.02 36 42 18 .02 0 0 14l30 4-30 4z" />
  </svg>
);

export default SvgComponent;
