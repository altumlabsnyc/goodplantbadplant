import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image"
import LogoutButton from "./LogoutButton";
import logo from 'components/assets/img/Icon_no bg.png';

export default async function Header() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-transparent py-4 w-full">
      <div className="container mx-auto flex items-center justify-between px-8 text-black">
        <a
          href="https://altumlabs.co"
          target="_blank"
          className="logo me-auto w-10 h-10"
        >
          <Image src={logo} alt="" className="img-fluid" />
        </a>

        <nav className="space-x-4">
          <a href="login">Home</a>
          <a href="login">About</a>
        </nav>
        <button className="px-8 py-2 bg-primary text-white rounded-3xl ml-4 hover:bg-secondary_01 hover:text-black transition-colors duration-200">
          Login
        </button>
      </div>
    </header>  
  );
}

// <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
    //   <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
    //     <div />
    //     <div className="flex items-center">
    //       <Link
    //         href="/learn"
    //         className="py-2 px-4 mr-4 rounded-md no-underline bg-green-200 transition-all duration-200 hover:bg-green-300"
    //       >
    //         Learn
    //       </Link>
    //       {user ? (
    //         <div className="flex items-center gap-4">
    //           Hey, {user.email}!
    //           <LogoutButton />
    //         </div>
    //       ) : (
    //         <Link
    //           href="/login"
    //           className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    //         >
    //           Login
    //         </Link>
    //       )}
    //     </div>
    //   </div>
    // </nav>