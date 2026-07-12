import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import "./math-styles"; // Import global math styles

const inter = Inter({ subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-display",
    axes: ["opsz"],
});

export const metadata: Metadata = {
    title: {
        default: "Edmund | Mechanical Engineering Portfolio",
        template: "%s | Edmund",
    },
    description:
        "Portfolio of Edmund, Mechanical Engineering student at UC Berkeley & UCL — structural mechanics, computational modeling, and energy systems.",
    keywords: [
        "Mechanical Engineering",
        "UC Berkeley",
        "UCL",
        "Portfolio",
        "Structural Mechanics",
        "Computational Modeling",
    ],
    openGraph: {
        title: "Edmund | Mechanical Engineering Portfolio",
        description:
            "Mechanical Engineering student at UC Berkeley & UCL — structural mechanics, computational modeling, and energy systems.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} ${fraunces.variable} antialiased selection:bg-blue-100 selection:text-blue-900`}>
                <Navbar />
                <main className="min-h-screen flex flex-col bg-background text-foreground pt-20">
                    {children}
                </main>
            </body>
        </html>
    );
}
