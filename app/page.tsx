import Header from "@/components/Header";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

const resources = [
  {
    title: "Plant Taint",
    subtitle:
      "Caused by environmental factors such as wildfires, plant taint presents a health risk for consumers, and thus liability for the insurer.",
    url: "/learn",
    icon: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z",
  },
  {
    title: "Soil Collection",
    subtitle:
      "Previously, plant taint could only be detected by expensive lab analysis. Our algorithm only depends on soil sample collection: less than 10% of the lab cost.",
    url: "/learn",
    icon: "M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33",
  },
  {
    title: "Our Algorithm",
    subtitle:
      "With just two soil samples, our algorithm provides an accurate risk assessment for plant quality, empowering the insurer to provide accurate rates.",
    url: "/learn",
    icon: "M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8",
  },
];

const examples = [
  { type: "Client Components", src: "app/_examples/client-component/page.tsx" },
  { type: "Server Components", src: "app/_examples/server-component/page.tsx" },
  { type: "Server Actions", src: "app/_examples/server-action/page.tsx" },
  { type: "Route Handlers", src: "app/_examples/route-handler.ts" },
  { type: "Middleware", src: "app/middleware.ts" },
  { type: "Protected Routes", src: "app/_examples/protected/page.tsx" },
];

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="w-full flex flex-col items-center">
      <Header />

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <div className="flex gap-8 justify-center items-center">
            <p className="font-bold tracking-widest text-3xl">
              <Link href="https://altumlabs.co" target="_blank">
                Altum <span className="hidden sm:inline">Labs</span>
              </Link>
            </p>
            <span className="border-l rotate-45 h-6" />
            <p className="font-bold tracking-widest text-3xl">
              Good<span className="text-green-500">Plant</span>Bad
              <span className="text-green-500">Plant</span>
            </p>
          </div>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12 tracking-wide font-medium">
            Identify{" "}
            <span className="italic underline decoration-4 underline-offset-4 decoration-yellow-500">
              taint
            </span>
            , ensure quality, reduce liability
          </p>
          <div className="bg-foreground py-3 px-6 rounded-lg font-mono text-sm text-background">
            Get started
          </div>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">How it works</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {resources.map(({ title, subtitle, url, icon }) => (
              <Link
                key={title}
                className="relative flex flex-col group rounded-lg border p-6 hover:border-foreground"
                href={url}
                rel="noreferrer"
              >
                <h3 className="font-bold mb-4">{title}</h3>
                <div className="flex flex-col grow gap-4 justify-between">
                  <p className="text-sm opacity-70">{subtitle}</p>
                  <div className="flex justify-between items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="opacity-80 group-hover:opacity-100"
                    >
                      <path
                        d={icon}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <div className="flex items-center opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                      <p className="ml-2 text-sm tracking-wider">learn more</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 ml-2"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-center text-center text-xs">
          <p>
            Powered by{" "}
            <Link
              href="https://altumlabs.co"
              target="_blank"
              className="font-bold"
            >
              Altum Labs
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
