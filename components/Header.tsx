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
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
        <div />
        <div className="flex items-center">
          <Link
            href="/learn"
            className="py-2 px-4 mr-4 rounded-md no-underline bg-green-200 transition-all duration-200 hover:bg-green-300"
          >
            Learn
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              Hey, {user.email}!
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
