import { LoginForm } from "@/components/login-form"
import { useLayoutEffect } from "react"

export default function AuthPage() {

  useLayoutEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.padding = "0px";
    }
  }, [])

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium text-2xl suez-one-regular">
            <img src="/img/logo.png" alt="PULSE logo" className="h-8 w-8" />
            PULSE
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/img/login-banner.jpg"
          alt="Login Banner"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2]"
        />
      </div>
    </div>
  )
}