import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "IKAPIAR Platform",
    description: "Your gateway to innovative solutions",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
            >
                <main className="flex-1">{children}</main>
                <footer className="py-6 px-4 bg-gray-100 border-t border-gray-200">
                    <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                        <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                            © {new Date().getFullYear()} IKAPIAR Platform. All
                            rights reserved.
                        </div>
                        <nav className="flex space-x-4">
                            <a
                                href="/legal/privacy-policy"
                                className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/legal/terms-of-service"
                                className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                            >
                                Terms of Service
                            </a>
                        </nav>
                    </div>
                </footer>
            </body>
        </html>
    );
}
