import { Button } from "#/components/ui/button";
import { UserCircleIcon } from "lucide-react";

export function AuthButton() {
  // TODO: add different auth-states: logged in, logged out, loading
  return (
    <Button
      variant="outline"
      className="rounded-full border-blue-500/20 px-4 text-sm font-medium text-blue-600 shadow-none hover:text-blue-500 [&_svg]:size-6"
    >
      <UserCircleIcon className="size-4 pl-2" />
      <p className="pr-2 pb-0.5 align-middle">Sign In</p>
    </Button>
  );
}
