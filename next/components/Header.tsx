import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header id="header" className="fixed-top">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-9 d-flex align-items-center justify-content-lg-between">
              <a
                href="https://altumlabs.co"
                target="_blank"
                className="logo me-auto me-lg-0"
              >
                <img src="components/assets/img/logo.png" alt="" className="img-fluid" />
              </a>
              <nav id="navbar" className="navbar order-last">
                <ul>
                  <li>
                    <a className="nav-link" href="#hero">
                      Home
                    </a>
                  </li>
                </ul>
                <a
                  href="/login"
                  style={{ color: "white" }}
                  className="get-started-btn scrollto"
                >
                  Login
                </a>

                <a
                  href="/register"
                  style={{ color: "white" }}
                  className="get-started-btn scrollto "
                >
                  Register
                </a>

                <i className="bi bi-list mobile-nav-toggle"></i>
              </nav>
              {/* .navbar */}
            </div>
          </div>
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