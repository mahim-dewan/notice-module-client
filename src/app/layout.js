import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400","500", "600", "700"],
});

export const metadata = {
  title: "Notice Module — Create & Manage Notices",
  description:
    "Create, publish and manage notices — responsive Next.js UI with validation, publish/unpublish toggles, and pagination.",
  keywords: [
    "notice",
    "create notice",
    "publish notice",
    "Next.js",
    "React",
    "form validation",
    "pagination",
    "admin",
    "MERN",
    "dashboard",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <main className="max-w-[1440px] mx-auto bg-dark-white text-dark-navy min-h-screen flex">
          {/* ✅ Sidebar - Left */}
          <Sidebar />

          {/* ✅ Right Content Area */}
          <div className="flex flex-col flex-1 min-h-screen">
            {/* ✅ Header - Top */}
            <Header />

            {/* ✅ Page Content */}
            <div className="flex-1">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
