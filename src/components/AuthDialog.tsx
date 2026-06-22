import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Eye, EyeOff, X } from "lucide-react";

export type AccountProfile = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
};

interface AuthDialogProps {
  isOpen: boolean;
  registeredAccounts: AccountProfile[];
  onClose: () => void;
  onSignIn: (account: AccountProfile) => void;
  onRegister: (account: AccountProfile) => void;
}

type AuthStep = "email" | "signup";

const blankSignupState = {
  firstName: "",
  lastName: "",
  password: "",
  phone: "",
  agreed: false,
};

function getDisplayName(account: AccountProfile) {
  const fullName = `${account.firstName} ${account.lastName}`.trim();
  return fullName || account.email;
}

export default function AuthDialog({
  isOpen,
  registeredAccounts,
  onClose,
  onSignIn,
  onRegister,
}: AuthDialogProps) {
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [signup, setSignup] = useState(blankSignupState);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [signupError, setSignupError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setStep("email");
      setEmail("");
      setSignup(blankSignupState);
      setShowPassword(false);
      setEmailError("");
      setSignupError("");
    }
  }, [isOpen]);

  const normalizedEmail = email.trim().toLowerCase();
  const existingAccount = useMemo(
    () => registeredAccounts.find((account) => account.email.toLowerCase() === normalizedEmail),
    [normalizedEmail, registeredAccounts]
  );

  if (!isOpen) {
    return null;
  }

  const submitEmail = () => {
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    setEmailError("");

    if (existingAccount) {
      onSignIn(existingAccount);
      return;
    }

    setStep("signup");
  };

  const submitSignup = () => {
    if (!signup.firstName.trim() || !signup.lastName.trim() || !signup.password.trim()) {
      setSignupError("Fill in your first name, last name, and password.");
      return;
    }

    if (!signup.agreed) {
      setSignupError("You need to agree to the terms before continuing.");
      return;
    }

    const nextAccount: AccountProfile = {
      email: normalizedEmail,
      firstName: signup.firstName.trim(),
      lastName: signup.lastName.trim(),
      password: signup.password,
      phone: signup.phone.trim() || undefined,
    };

    setSignupError("");
    onRegister(nextAccount);
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-[3px]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[560px] rounded-[1.75rem] bg-[#f6f6f6] px-4 py-4 text-[#1a1a1a] shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:px-5 sm:py-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative flex items-center justify-center">
          {step === "signup" ? (
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setSignupError("");
              }}
              className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#e8e8e8] text-[#262626] transition hover:bg-[#dddddd]"
            >
              <ArrowLeft size={24} />
            </button>
          ) : null}

          <div className="text-center text-[1.05rem] font-black leading-[0.82] tracking-tight text-[#ff5a43] sm:text-[1.25rem]">
            <span className="block">SEAT</span>
            <span className="block">GEEK</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#e8e8e8] text-[#262626] transition hover:bg-[#dddddd]"
          >
            <X size={24} />
          </button>
        </div>

        {step === "email" ? (
          <div className="mx-auto mt-6 max-w-[420px]">
            <h2 className="text-center text-[1.55rem] font-bold tracking-tight text-[#181818] sm:text-[1.78rem]">
              Sign in or create account
            </h2>
            <p className="mx-auto mt-3 max-w-[360px] text-center text-[0.96rem] leading-7 text-[#5c5c5c] sm:text-[1.06rem]">
              Enter your email to sign in to or create your SeatGeek account.
            </p>

            <div className="mt-6">
              <label className="block">
                <span className="sr-only">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      submitEmail();
                    }
                  }}
                  placeholder="Email"
                  className="w-full rounded-[1rem] border-[3px] border-black bg-[#f7f7f7] px-5 py-3.5 text-[1.05rem] text-[#202020] outline-none placeholder:text-[#787878] focus:border-[#111111]"
                />
              </label>
              {emailError ? <p className="mt-3 text-sm text-[#c23a2b]">{emailError}</p> : null}
            </div>

            <button
              type="button"
              onClick={submitEmail}
              className="mt-4 w-full rounded-[0.95rem] bg-black px-6 py-3.5 text-[1.02rem] font-bold text-white transition hover:bg-[#151515]"
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="mx-auto mt-6 max-w-[460px]">
            <h2 className="text-center text-[1.55rem] font-bold tracking-tight text-[#181818] sm:text-[1.8rem]">
              Sign up for SeatGeek
            </h2>

            <div className="mt-7 rounded-[1.2rem] border-[3px] border-black bg-[#efefef] px-6 py-4">
              <p className="text-sm text-[#8a8a8a]">Email address</p>
              <p className="mt-1 text-[1.15rem] text-[#9a9a9a] sm:text-[1.3rem]">{normalizedEmail}</p>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                value={signup.firstName}
                onChange={(event) => setSignup((current) => ({ ...current, firstName: event.target.value }))}
                placeholder="First name"
                className="rounded-[1rem] border-2 border-[#d6d6d6] bg-[#fafafa] px-6 py-5 text-[1.15rem] text-[#1f1f1f] outline-none placeholder:text-[#8d8d8d] focus:border-[#b9b9b9]"
              />
              <input
                type="text"
                value={signup.lastName}
                onChange={(event) => setSignup((current) => ({ ...current, lastName: event.target.value }))}
                placeholder="Last name"
                className="rounded-[1rem] border-2 border-[#d6d6d6] bg-[#fafafa] px-6 py-5 text-[1.15rem] text-[#1f1f1f] outline-none placeholder:text-[#8d8d8d] focus:border-[#b9b9b9]"
              />
            </div>

            <div className="relative mt-5">
              <input
                type={showPassword ? "text" : "password"}
                value={signup.password}
                onChange={(event) => setSignup((current) => ({ ...current, password: event.target.value }))}
                placeholder="Password"
                className="w-full rounded-[1rem] border-2 border-[#d6d6d6] bg-[#fafafa] px-6 py-5 pr-16 text-[1.15rem] text-[#1f1f1f] outline-none placeholder:text-[#8d8d8d] focus:border-[#b9b9b9]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#202020]"
              >
                {showPassword ? <EyeOff size={28} /> : <Eye size={28} />}
              </button>
            </div>

            <div className="mt-5 flex overflow-hidden rounded-[1rem] border-2 border-[#d6d6d6] bg-[#fafafa]">
              <div className="flex min-w-[108px] items-center gap-3 border-r-2 border-[#d6d6d6] px-6 py-5">
                <img src="/us-flag.svg" alt="USA flag" className="h-[16px] w-[24px] rounded-[3px] border border-black/10" />
                <span className="text-[#5c5c5c]">+</span>
              </div>
              <input
                type="tel"
                value={signup.phone}
                onChange={(event) => setSignup((current) => ({ ...current, phone: event.target.value }))}
                placeholder="Phone number (Optional)"
                className="w-full bg-transparent px-6 py-5 text-[1.15rem] text-[#1f1f1f] outline-none placeholder:text-[#8d8d8d]"
              />
            </div>

            <label className="mt-7 flex items-start gap-4">
              <input
                type="checkbox"
                checked={signup.agreed}
                onChange={(event) => setSignup((current) => ({ ...current, agreed: event.target.checked }))}
                className="mt-1 h-8 w-8 rounded-[0.45rem] border-[#bdbdbd] text-black focus:ring-black"
              />
              <span className="text-[1rem] leading-8 text-[#3a3a3a] sm:text-[1.05rem]">
                By checking this box, you agree to our{" "}
                <a href="#" className="text-[#1858c8] underline">
                  Terms of Use
                </a>
                , and acknowledge having read our{" "}
                <a href="#" className="text-[#1858c8] underline">
                  Privacy Notice
                </a>
                .
              </span>
            </label>

            {signupError ? <p className="mt-4 text-sm text-[#c23a2b]">{signupError}</p> : null}

            <button
              type="button"
              onClick={submitSignup}
              className="mt-7 w-full rounded-[1rem] bg-black px-6 py-5 text-[1.25rem] font-bold text-white transition hover:bg-[#151515]"
            >
              Sign up
            </button>

            <p className="mt-8 text-center text-[1rem] text-[#5c5c5c] sm:text-[1.1rem]">
              Have a promo code?{" "}
              <a href="#" className="underline">
                Redeem now
              </a>
            </p>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-[#9a9a9a]">
          {existingAccount && step === "email" ? `Recognized account: ${getDisplayName(existingAccount)}` : " "}
        </p>
      </div>
    </div>
  );
}
