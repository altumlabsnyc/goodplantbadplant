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
    <footer id="footer absolute bottom-0 w-full flex">
        <div className="container mx-auto pt-20 flex justify-between text-paragragh_text">
          <h3 className="text-left">
            Copyright{" "}&copy; {" "}2023 <strong>Altum Labs</strong>
          </h3>
          <h3 className="text-right">
            All Rights Reserved | Terms and Conditions | Privacy Policy
          </h3>
        </div>
      </footer>      
  );
}
