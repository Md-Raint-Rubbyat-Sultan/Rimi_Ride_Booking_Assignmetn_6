import React, { type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

const CommonLayout: React.FC<Props> = ({ children }) => {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto grow-1">{children}</div>
      <Footer />
    </main>
  );
};

export default CommonLayout;
