import "./globals.css";

export const metadata = {
  title: "GoodPlantBadPlant",
  description: "Identify taint, ensure quality, reduce liability",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
