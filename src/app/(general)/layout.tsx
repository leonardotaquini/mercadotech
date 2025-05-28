import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";

export default function GeneralLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen">
     <Navbar />
     {children}
     <Footer />
    </div>
  );
}