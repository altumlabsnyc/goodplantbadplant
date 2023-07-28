import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function Footer() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <footer className="p-4 mt-8 mx-4">
      <div className="container mx-auto flex font-['DM_Sans'] justify-between text-paragragh_text items-center">
          <div>
            {/* Text on the left */}
            <p className="text-sm">
              Copyright{" "}&copy; {" "}2023 <strong>Altum Labs</strong>
            </p>
          </div>
          <div>
            {/* Text on the right */}
            <p className="text-sm">
              All Rights Reserved | {" "}
              <span className="underline">Terms and Conditions</span> | {" "}
              <span className="underline"> Privacy Policy</span>
            </p>
          </div>
      </div>
    </footer>    
  );
}

