import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// icons 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faChartSimple, faComments, faAtom, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

import { SparklesIcon } from "@heroicons/react/24/solid";


import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "OKReator",
  description: "Manage your OKRs effectively!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col antialiased">
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="hidden w-10 shrink-0 flex-col items-center bg-primary py-4 text-white md:flex">
            {/* Logo */}
            <Link href="/" className="mb-6">
              <Image
                src="/gt_logo.png"
                alt="GovTechSg Stack Logo"
                width={32}
                height={32}
                priority
              />
            </Link>

            {/* Navigation Icons Only */}
            <nav className="flex flex-col items-center gap-10">
              <Link href="/" className="mt-8">
                <FontAwesomeIcon icon={faHouse} className="h-5 w-5 text-white" />
              </Link>
              <Link
                href="https://aibots.gov.sg/chats/askbernard"
                target="_blank"
              >
                <SparklesIcon className="h-5 w-5" />
              </Link>
              <Link href="/dependency">
                <FontAwesomeIcon icon={faChartSimple} className="h-5 w-5 text-white" />
              </Link>
              <Link
                href="https://form.gov.sg/67f342999ee26e0ce9a644b7"
                target="_blank"
              >
                <FontAwesomeIcon icon={faComments} className="h-5 w-5 text-white" />
              </Link>

              <Link href="/beta">
                <div className="flex flex-col items-center text-[10px] text-white space-y-0.5 font-bold">
                  <FontAwesomeIcon icon={faAtom} className="h-4 w-4" />
                  <span>Beta</span>
                </div>
              </Link>
            </nav>

            {/* Spacer */}
            <div className="flex-grow" />

            {/* Help Icon or Footer Icon (bottom-most) */}
            <Link href="/help">
              <FontAwesomeIcon icon={faCircleQuestion} className="h-4 w-4" />
            </Link>
          </div>

          {/* Main Content */}
          <div className="flex size-full flex-col">
            <div className="grow overflow-auto">{children}</div>
            <Toaster />
            <footer className="flex justify-end gap-4 bg-muted px-4 py-2 text-xs">
              <Link href="/terms" className="underline">
                Terms of Use
              </Link>
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              <p>© 2025 GovTech</p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
