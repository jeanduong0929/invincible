"use client";
import FormButton from "@/components/form/form-button";
import FormInput from "@/components/form/form-input";
import GithubButton from "@/components/form/github-button";
import { WebhookIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPage = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-[350px]  mx-auto h-[70vh]">
        <LoginForm />
      </div>
    </>
  );
};

/* ######################################## LOGIN FORM ######################################## */

const LoginForm = () => {
  // Form states
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  // Form errors
  const [error, setError] = React.useState<string>("");

  // Loading state
  const [signInLoading, setSignInLoading] = React.useState<boolean>(false);

  // Custom hooks
  const router = useRouter();

  const handleForm = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setSignInLoading(true);
    try {
      const data = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (data && data.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/collections/tops");
    } catch (error: any) {
      console.error(error);
    } finally {
      setSignInLoading(false);
    }
  };

  return (
    <>
      {/* Form container */}
      <form
        className="flex flex-col items-center gap-5 w-full"
        onSubmit={handleForm}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-1 w-full">
          <WebhookIcon size={30} />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <h2 className="text-slate-500">
            Enter your email to sign in to your account
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col w-full gap-2">
          {/* Email */}
          <FormInput
            placeholder={"name@example.com"}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />

          {/* Password */}
          <FormInput
            placeholder={"Password"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Password */}
          <FormButton
            label={"Sign In with Email"}
            loading={signInLoading}
            type={"submit"}
          />

          {/* Footer */}
          <div className="flex items-center w-full gap-2">
            <hr className="w-full" />
            <p>OR</p>
            <hr className="w-full" />
          </div>

          <GithubButton />
          <Link
            href={"/register"}
            className="text-center underline underline-offset-4 mt-2"
          >
            Dont have an account? Sign up
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
