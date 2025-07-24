import { signIn, sendOTP } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SignInPage() {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="max-w-md space-y-8 px-4 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Sign in with TechPass</h2>
          <p className="text-sm text-gray-500">
            All TechPass users can sign in with one click.
          </p>
          <form
            action={async () => {
              "use server";
              await signIn("techpass", { redirectTo: "/" });
            }}
          >
            <Button className="w-full">Sign in with TechPass</Button>
          </form>
        </div>
        <Separator />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Sign in with OTP</h2>
          <p className="text-sm text-gray-500">
            For non-TechPass users, please log in with a .gov.sg email address
          </p>
          <form
            action={async (formData: FormData) => {
              "use server";
              const email = formData.get("email") as string;
              await sendOTP(email);
            }}
          >
            <Input name="email" type="email" placeholder="john@tech.gov.sg" />
            <Button className="w-full">Get OTP</Button>
          </form>
          <form
            action={async (formData: FormData) => {
              "use server";
              await signIn("otp", formData);
            }}
          >
            <Input name="otp" type="text" placeholder="Enter OTP from email" />
            <Button className="w-full">Verify OTP</Button>
            <input type="hidden" name="redirectTo" value="/" />
          </form>
        </div>
      </div>
    </div>
  );
}
