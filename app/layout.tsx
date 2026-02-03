import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import "./math-styles"; // Import global math styles

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Edmund | Mechanical Engineering Portfolio",
    description: "Portfolio of Edmund, Mechanical Engineering Student specializing in Robotics and Thermal Systems.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased selection:bg-blue-100 selection:text-blue-900`}>
                <Navbar />
                <main className="min-h-screen flex flex-col bg-background text-foreground pt-20">
                    {children}
                </main>
            </body>
        </html>
    );
}
// Triggering fresh build
