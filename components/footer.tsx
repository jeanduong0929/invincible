import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="border-t text-center py-10">
        &copy; {year} All rights reserved
      </footer>
    </>
  );
};

export default Footer;
