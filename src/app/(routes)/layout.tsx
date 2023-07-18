import Footer from "@/components/client/ui/Footer";
import Navbar from "@/components/client/ui/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="store-client">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
