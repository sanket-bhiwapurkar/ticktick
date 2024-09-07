'use client'
import Header from "@/components/header";
import { CalenderProvider, useCalender } from "context/calenderContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <CalenderProvider>
        <body>
          <Header />
          {children}
        </body>
      </CalenderProvider>
    </html>
  );
}
