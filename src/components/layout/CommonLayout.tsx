import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow-1 max-w-7xl mx-auto px-4 w-full">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
