import Header from "@/components/Header";
import Footer from "@/components/Footer"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from 'next/image';
import gpbp_logo_cream from 'components/assets/img/Icon_cream.svg';
import gpbp_logo_white from 'components/assets/img/Icon_white.svg';
import logo from 'components/assets/img/Icon_no bg.png';
import about_image from 'components/assets/img/about_image_2_cropped.jpg';

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
    <div className="w-full animate-in">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>GPBP by Altum Labs</title>
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      {/* Favicons */}
      <link rel="icon" href="assets/img/favicon.png" />
      <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png" />
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap"
        rel="stylesheet"
      />

      <div className="h-screen bg-opacity-70">
        {/* ======= Header ======= */}
        <Header />
        {/* End Header */}

        {/* ======= Hero Section ======= */}
        <div className="text-black flex flex-col items-center font-['DM_Sans'] mt-12 lg:mb-12">
            {/* TODO: Need Better Image (background components make up logo; needs to be addressed) */}
            <Image src={gpbp_logo_cream} className="w-20 h-16 mb-5" alt="GPBP_Logo" />
            <div className="flex justify-center items-center mb-2">
              <p className="font-bold tracking-widest text-4xl">
              <span className="text-primary">GOOD</span>Plant
              <span className="text-bad_plant_red">BAD</span>Plant
              </p>
            </div>
            <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12 tracking-wide font-medium ">
              Identify{" "}
              <span className="italic decoration-4 underline-offset-4 border-b-yellow-500 border-b-4">
                biological risk
              </span>
              , ensure quality, reduce liability
            </p>

            {/* Get Started Button */}
            <button
                type="button"
                className="flex items-center px-6 py-3 font-sans rounded-3xl text-xs bg-primary text-white hover:bg-secondary_01 hover:text-black transition-colors duration-200"
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
            {/* End of Get Started Button */}

          {/* ======= End of Hero Section ======= */}
          </div>
          
          
          {/* ======= How it works ======= */}
          <div className="flex flex-col items-center font-['DM_Sans'] gap-14 text-foreground mx-20">
            <h2 className="text-3xl font-bold text-center text-primary mt-20 mx-10">How it works</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 mx-10 container ">
              {resources.map(({ title, subtitle, url, icon }) => (
                <Link
                  key={title}
                  className=" drop-shadow-lg relative flex flex-col group rounded-xl border p-5 hover:border-foreground bg-white text-paragragh_text lg:mx-4 lg:w-66 lg:h-96"
                  href={url}
                  rel="noreferrer"
                >
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-80 group-hover:opacity-100 mt-6 text-black"
                  >
                    <path
                      d={icon}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3 className="font-bold mb-4 text-2xl text-primary">{title}</h3>
                  <div className="flex flex-col grow gap-4 justify-between">
                    <p className="opacity-70 text-base">{subtitle}</p>
                    <div className="flex justify-between items-center pb-5">
                      <div className="flex items-center opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                        <p className="ml-0 text-sm tracking-wider font-bold">Learn more</p>
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
                          className="h-4 w-4 ml-0 mt-1"
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
          {/* ======= End of How it works ======= */}

          {/* ======= About Section ======= */}
          <div className="container mx-auto mt-44 px-4 md:px-8 lg:px-36 flex justify-center items-center">
            {/* Left Main Image */}
            <div className="w-full md:w-1/2 lg:w-1/3 mb-8 md:mb-0">
              <Image src={about_image} alt="About Image" className="w-full h-auto rounded-lg shadow" />
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2 lg:w-2/3 md:ml-20">
              <h2 className="text-3xl font-bold mb-4 text-primary font-['DM_Sans']">About Altum Labs</h2>
              <p className="text-lg text-paragraph_text ">
                Altum Labs is a next-generation technology company focused on digitizing the natural world. 
                Our platforms empower our partners to make more informed business decisions. reduce costs, 
                communicate more effectively, save time, avoids risks, and operate with less friction.
              </p>
            </div>
          </div>  
          {/* ======= End of About Section ======= */}        

          {/* ======= Other Section ======= */}
          <div className="mt-20 font-['DM_Sans']">
            <div className="max-w-4xl mx-auto px-8 py-16">
              {/* Separate Box */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                {/* Logo */}
                <div className="flex justify-left">
                  <Image src={gpbp_logo_white} alt="Logo" className="w-12 h-12" />
                </div>

                {/* Header */}
                <h1 className="text-3xl text-primary font-bold mt-4">Predict Growth Outcomes</h1>

                {/* Paragraph */}
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget elit nec urna venenatis
                  tempor a nec risus. Duis interdum ullamcorper arcu nec tristique. Fusce commodo, ligula
                  consectetur bibendum hendrerit, felis purus bibendum ex, ac vestibulum quam libero id ex.
                  Integer tincidunt mollis augue, vitae tristique nulla eleifend nec. Quisque eget eros eget
                  justo accumsan euismod. Sed sodales tortor vel arcu porttitor, in tristique purus malesuada.
                </p>
              </div>
            </div>
          </div>
          {/* ======= End of Other Section ======= */}

          {/* ======= Footer ======= */}
          <Footer />
          {/* ======= End of Footer ======= */}
          
    </div>
  </div>
  );
}