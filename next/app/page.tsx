import Header from "@/components/Header";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from 'next/image';
import gpbp_logo from 'components/assets/img/Icon.svg';
import logo from 'components/assets/img/logo.png';

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
    <div className="w-full flex flex-col items-center ">
      <Header />

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground ">
        <div className="text-black flex flex-col items-center mb-4 lg:mb-12">
          {/* TODO: Need Better Image (background components make up logo; needs to be addressed) */}
          <Image src={gpbp_logo} className="w-20 h-16 mb-5" alt="GPBP_Logo" />
          <div className="flex gap-8 justify-center items-center">
            <p className="font-bold tracking-widest text-4xl">
            <span className="text-primary">GOOD</span>Plant
            <span className="text-bad_plant_red">BAD</span>Plant
            </p>
          </div>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12 tracking-wide font-medium ">
            Identify{" "}
            <span className="italic underline decoration-4 underline-offset-4 decoration-yellow-500">
              biological risk
            </span>
            , ensure quality, reduce liability
          </p>
          {/* Get Started Button */}
          <button
              type="button"
              className="flex items-center px-6 py-3 font-sans rounded-3xl text-xs bg-primary text-white hover:bg-secondary_02 transition-colors duration-200"
            >
              Get started
              <svg
                className="w-3 h-3 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          {/* End Get Started Button */}
          {/* <div className="bg-foreground py-4 px-8  font-mono text-sm text-background inline-flex space-x-1.5 > * + *">
            Get started
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" className="">
              <path d="M9.4043 2.65436L15.7499 9.00001L9.4043 15.3457" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15.7499 9L2.25 9" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              
            </svg>
          </div> */}
        </div>

        {/* <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" /> */}

        <div className="flex flex-col gap-8 text-foreground ">
          <h2 className="text-3xl font-bold text-center text-primary mt-20 ">How it works</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10  ">
            {resources.map(({ title, subtitle, url, icon }) => (
              <Link
                key={title}
                className=" drop-shadow-lg relative flex flex-col group rounded-lg border p-6 hover:border-foreground bg-white text-paragragh_text"
                href={url}
                rel="noreferrer"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-80 group-hover:opacity-100 pb-1 text-black"
                >
                  <path
                    d={icon}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="font-bold mb-4 text-primary">{title}</h3>
                <div className="flex flex-col grow gap-4 justify-between">
                  <p className="text-sm opacity-70 text-">{subtitle}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                      <p className="ml-0 text-sm tracking-wider">Learn more</p>
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

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        {/* ======= Footer ======= */}
        <footer id="footer">
          <div className="container text-black">
            <h3>
              <span className="text-primary text-bold">Good</span>Plant
              <span className="text-bad_plant_red text-bold">Bad</span>Plant
              by Altum Labs
            </h3>
            <p>Ensuring your wellness, empowering, consumer trust.</p>
            <div className="social-links">
              <a href="#" className="twitter">
                <i className="bx bxl-twitter"></i>
              </a>
              <a href="#" className="instagram">
                <i className="bx bxl-instagram"></i>
              </a>
              <a href="#" className="linkedin">
                <i className="bx bxl-linkedin"></i>
              </a>
            </div>
            <div className="copyright">
              {" "}
              &copy; Copyright{" "}
              <strong>
                <span>Altum Labs</span>
              </strong>
              . All Rights Reserved{" "}
            </div>
          </div>
        </footer>
      {/* End Footer */}
        {/* <div className="flex justify-center text-center text-xs">
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
        </div> */}
      </div>
    </div>
  );
}
