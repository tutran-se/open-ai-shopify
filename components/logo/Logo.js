import React from "react";
import logoSrc from "../../public/assets/logo-small.png";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

const Logo = ({ isClickable = false, className = "", ...props }) => {
  return (
    <Box
      className={className}
      width="50px"
      height="50px"
      position="relative"
      cursor={isClickable && "pointer"}
      {...props}
    >
      <Image
        src={logoSrc}
        alt="Open AI - Shopify"
        layout="fill"
        objectFit="cover"
      />
    </Box>
  );
};

export default Logo;
