"use client";

import React, { useState } from "react";

// --- Authentic Icons matching Pantera Corp. screenshots ---
function UserIcon({ className = "w-[22px] h-[22px] text-[#090b0e]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Outer circular ring */}
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.2" />
      {/* Head */}
      <circle cx="12" cy="9.5" r="3.2" fill="currentColor" />
      {/* Torso */}
      <path
        d="M6.6 18.2a5.4 5.4 0 0 1 10.8 0"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

function KeyIcon({ className = "w-[22px] h-[22px] text-[#090b0e]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Outer circular ring */}
      <circle cx="12" cy="12" r="10" strokeWidth="2.2" />
      {/* Key head (circular top-right) */}
      <circle cx="15.2" cy="8.8" r="2.6" strokeWidth="2.2" />
      {/* Key shaft (diagonally down-left) */}
      <path d="m13.2 10.8-6.4 6.4" strokeWidth="2.2" />
      {/* Key teeth */}
      <path d="m8.6 15.4-1.6 1.6" strokeWidth="2.2" />
      <path d="m10.4 13.6-1.6 1.6" strokeWidth="2.2" />
    </svg>
  );
}

function EyeSlashIcon({ className = "w-[20px] h-[20px] text-[#090b0e]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="3" y1="3" x2="21" y2="21" strokeWidth="2.2" />
    </svg>
  );
}

function EyeIcon({ className = "w-[20px] h-[20px] text-[#090b0e]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" strokeWidth="2.2" />
    </svg>
  );
}

type ScreenMode = "login" | "activate" | "update" | "forgot";

export default function PanteraAuthPortal() {
  const [screen, setScreen] = useState<ScreenMode>("login");

  // Login form state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Activate form state
  const [activateEmployeeId, setActivateEmployeeId] = useState("");
  const [activateUsername, setActivateUsername] = useState("");

  // Update credentials form state
  const [updateUsername, setUpdateUsername] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updateConfirmPassword, setUpdateConfirmPassword] = useState("");
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [showUpdateConfirmPassword, setShowUpdateConfirmPassword] = useState(false);
  const [updateErrors, setUpdateErrors] = useState<{
    username?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});

  // Forgot password form state
  const [forgotInput, setForgotInput] = useState("");

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const triggerUpdateErrorState = () => {
    setScreen("update");
    setUpdateUsername("@j@ne doeejadodo_0");
    setUpdatePassword("1234-XXXX-XXXX");
    setUpdateConfirmPassword("1234-XXXX-XXXX");
    setUpdateErrors({
      username: true,
      password: true,
      confirmPassword: true,
    });
  };

  // Sync with URL query parameter if present
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const view = params.get("view");
      if (view === "error") {
        setScreen("login");
        setHasError(true);
      } else if (view === "activate") {
        setScreen("activate");
      } else if (view === "update-error" || view === "credentials-error") {
        triggerUpdateErrorState();
      } else if (view === "update") {
        setScreen("update");
        setUpdateErrors({});
      } else if (view === "forgot") {
        setScreen("forgot");
      }
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername.trim() || !loginPassword.trim()) {
      setHasError(true);
    } else {
      setHasError(false);
      showToast(`Welcome, ${loginUsername}! Logging in...`);
    }
  };

  const handleActivateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activateEmployeeId.trim() || !activateUsername.trim()) {
      showToast("Please provide Employee ID and Username.");
    } else {
      showToast(`Account activated for ${activateUsername}!`);
      setTimeout(() => setScreen("login"), 1000);
    }
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { username?: boolean; password?: boolean; confirmPassword?: boolean } = {};

    // Validate username: error if empty or contains spaces or multiple @
    if (
      !updateUsername.trim() ||
      updateUsername.includes(" ") ||
      (updateUsername.match(/@/g) || []).length > 1 ||
      !/^@[a-zA-Z0-9_.]+$/.test(updateUsername)
    ) {
      errors.username = true;
    }

    // Validate password: error if empty or placeholder
    if (!updatePassword.trim() || updatePassword === "1234-XXXX-XXXX") {
      errors.password = true;
    }

    // Validate confirm password: error if mismatch or empty
    if (
      !updateConfirmPassword.trim() ||
      updateConfirmPassword !== updatePassword ||
      updateConfirmPassword === "1234-XXXX-XXXX"
    ) {
      errors.confirmPassword = true;
    }

    setUpdateErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    showToast("User credentials updated successfully!");
    setTimeout(() => setScreen("login"), 1000);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Password reset request sent.");
    setTimeout(() => setScreen("login"), 1000);
  };

  return (
    <div
      className="relative min-h-screen w-full select-none bg-[#c8c8c8] bg-cover bg-center font-sans antialiased text-white flex flex-col md:flex-row overflow-x-hidden p-3.5 sm:p-4 border-[6px] sm:border-[8px] border-black"
      style={{
        backgroundImage: "url('/bg-clean.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Floating feedback alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#090b0e] border border-[#546881] text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-2xl">
          {toastMessage}
        </div>
      )}

      {/* Screen Mode Quick Switcher Toolbar (Top Right) */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-1.5 bg-[#090b0e]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-lg text-[11px] text-[#8a96a6]">
        <span className="text-white/40 mr-1 hidden sm:inline">Views:</span>
        <button
          type="button"
          onClick={() => {
            setScreen("login");
            setHasError(false);
          }}
          className={`px-2.5 py-1 rounded-full cursor-pointer transition ${
            screen === "login" && !hasError
              ? "bg-[#546881] text-white font-medium"
              : "hover:text-white"
          }`}
        >
          Login (Img 1/3)
        </button>
        <button
          type="button"
          onClick={() => {
            setScreen("login");
            setHasError(true);
          }}
          className={`px-2.5 py-1 rounded-full cursor-pointer transition ${
            screen === "login" && hasError
              ? "bg-[#b84a4b] text-white font-medium"
              : "hover:text-white"
          }`}
        >
          Login Error (Img 2/4)
        </button>
        <button
          type="button"
          onClick={() => {
            setScreen("activate");
            setHasError(false);
          }}
          className={`px-2.5 py-1 rounded-full cursor-pointer transition ${
            screen === "activate"
              ? "bg-[#546881] text-white font-medium"
              : "hover:text-white"
          }`}
        >
          Activate (Img 5)
        </button>
        <button
          type="button"
          onClick={triggerUpdateErrorState}
          className={`px-2.5 py-1 rounded-full cursor-pointer transition ${
            screen === "update" && updateErrors.username
              ? "bg-[#b84a4b] text-white font-medium"
              : "hover:text-white"
          }`}
        >
          Update Error (New Img)
        </button>
      </div>

      {/* --- Left Sidebar (Pantera Corp.) --- */}
      <aside className="w-full md:w-[205px] lg:w-[215px] h-auto md:h-[calc(100vh-2.5rem)] rounded-[22px] md:rounded-[26px] bg-[#090b0e] p-6 flex flex-row md:flex-col justify-between items-center md:items-start shrink-0 shadow-2xl shadow-black/40">
        <div className="flex items-center gap-3">
          {/* Logo Circle */}
          <div className="w-8 h-8 rounded-full bg-[#d0d5dc] shrink-0" />
          <span className="text-[14.5px] font-normal tracking-normal text-white/95">
            Pantera Corp.
          </span>
        </div>
      </aside>

      {/* --- Main Workspace (Center Modal) --- */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 my-auto">
        {/* ========================================================= */}
        {/* 1. LOGIN ACCOUNT VIEW (Matches Image 1, 2, 3, 4)          */}
        {/* ========================================================= */}
        {screen === "login" && (
          <div className="w-full max-w-[340px] sm:max-w-[360px] rounded-[26px] bg-[#090b0e] px-7 py-8 sm:px-8 sm:py-8 shadow-2xl shadow-black/60">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-[32px] sm:text-[34px] font-normal tracking-tight text-white leading-tight">
                Login Account
              </h1>
              <p className="text-[11px] text-[#748090] mt-1.5 mb-6">
                Welcome to our Company. Login to access your dashboard
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} noValidate>
              {/* Field 1: Username */}
              <div className="mb-3">
                <label className="block text-[11.5px] text-[#9aa7b8] mb-1.5 text-left font-normal">
                  Username:
                </label>
                <div
                  className={`h-11 w-full rounded-2xl px-3 flex items-center gap-2.5 transition-colors ${
                    hasError
                      ? "bg-[#a8b4c2] border-[1.5px] border-[#b04546]"
                      : "bg-[#a8b4c2] border-[1.5px] border-transparent"
                  }`}
                >
                  <UserIcon
                    className={`w-[22px] h-[22px] shrink-0 transition-colors ${
                      hasError ? "text-[#7d2c2e]" : "text-[#090b0e]"
                    }`}
                  />
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => {
                      setLoginUsername(e.target.value);
                      if (hasError) setHasError(false);
                    }}
                    placeholder="Ex. @JaneDoe"
                    className={`w-full bg-transparent text-[13px] font-normal outline-none transition-colors ${
                      hasError
                        ? "text-[#7d2c2e] placeholder:text-[#7d2c2e]"
                        : "text-[#090b0e] placeholder:text-[#475569]"
                    }`}
                  />
                </div>
                {/* Red Error Message from Image 2 & 4 */}
                {hasError && (
                  <p className="text-[#b04546] text-[11px] mt-1 text-left font-normal">
                    Invalid Username
                  </p>
                )}
              </div>

              {/* Field 2: Password */}
              <div className="mb-3">
                <label className="block text-[11.5px] text-[#9aa7b8] mb-1.5 text-left font-normal">
                  Password:
                </label>
                <div
                  className={`h-11 w-full rounded-2xl px-3 flex items-center gap-2.5 transition-colors ${
                    hasError
                      ? "bg-[#a8b4c2] border-[1.5px] border-[#b04546]"
                      : "bg-[#a8b4c2] border-[1.5px] border-transparent"
                  }`}
                >
                  <KeyIcon
                    className={`w-[22px] h-[22px] shrink-0 transition-colors ${
                      hasError ? "text-[#7d2c2e]" : "text-[#090b0e]"
                    }`}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (hasError) setHasError(false);
                    }}
                    placeholder="1234-XXXX-XXXX"
                    className={`w-full bg-transparent text-[13px] font-normal outline-none transition-colors ${
                      hasError
                        ? "text-[#7d2c2e] placeholder:text-[#7d2c2e]"
                        : "text-[#090b0e] placeholder:text-[#475569]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 cursor-pointer focus:outline-none hover:opacity-75"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeIcon
                        className={`w-[20px] h-[20px] ${
                          hasError ? "text-[#7d2c2e]" : "text-[#090b0e]"
                        }`}
                      />
                    ) : (
                      <EyeSlashIcon
                        className={`w-[20px] h-[20px] ${
                          hasError ? "text-[#7d2c2e]" : "text-[#090b0e]"
                        }`}
                      />
                    )}
                  </button>
                </div>
                {/* Red Error Message from Image 2 & 4 */}
                {hasError && (
                  <p className="text-[#b04546] text-[11px] mt-1 text-left font-normal">
                    Invalid Password
                  </p>
                )}
              </div>

              {/* Stay sign in? Toggle */}
              <div className="flex items-center justify-between mt-3">
                <span className="text-[12px] text-[#a4b0c0] font-normal">
                  Stay sign in?
                </span>
                <button
                  type="button"
                  onClick={() => setStaySignedIn(!staySignedIn)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 cursor-pointer flex items-center ${
                    staySignedIn ? "bg-[#546881]" : "bg-[#46515f]"
                  }`}
                  aria-pressed={staySignedIn}
                  title="Toggle stay signed in"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-[#c8d3e0] shadow-sm transform transition-transform duration-200 ${
                      staySignedIn ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Forgot password? */}
              <div className="mt-3 text-left">
                <button
                  type="button"
                  onClick={() => setScreen("forgot")}
                  className="text-[11.5px] text-[#7a8697] hover:text-[#c0ccd9] transition-colors cursor-pointer text-left"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full h-11 bg-[#546881] hover:bg-[#607794] active:bg-[#48596e] text-[#090b0e] font-normal text-[13px] rounded-2xl transition-all duration-150 flex items-center justify-center cursor-pointer shadow-sm tracking-normal"
              >
                Click to Login
              </button>

              {/* Footer Links (Activate Account / Update User Account) */}
              <div className="flex items-center justify-between mt-5 text-[11.5px] text-[#7a8697]">
                <button
                  type="button"
                  onClick={() => {
                    setScreen("activate");
                    setHasError(false);
                  }}
                  className="hover:text-[#c0ccd9] transition-colors cursor-pointer"
                >
                  Activate Account
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setScreen("update");
                    setUpdateErrors({});
                  }}
                  className="hover:text-[#c0ccd9] transition-colors cursor-pointer"
                >
                  Update User Account
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. ACTIVATE ACCOUNT VIEW (Matches Image 5)                */}
        {/* ========================================================= */}
        {screen === "activate" && (
          <div className="w-full max-w-[340px] sm:max-w-[360px] rounded-[26px] bg-[#090b0e] px-7 py-8 sm:px-8 sm:py-8 shadow-2xl shadow-black/60">
            {/* Header (No subtitle as per Image 5) */}
            <div className="text-center mb-6 sm:mb-7">
              <h1 className="text-[32px] sm:text-[34px] font-normal tracking-tight text-white leading-tight">
                Activate Account
              </h1>
            </div>

            <form onSubmit={handleActivateSubmit} noValidate>
              {/* Field 1: Employee ID */}
              <div className="mb-3">
                <label className="block text-[11.5px] text-[#9aa7b8] mb-1.5 text-left font-normal">
                  Employee ID
                </label>
                <div className="h-11 w-full rounded-2xl px-3 flex items-center gap-2.5 bg-[#a8b4c2]">
                  <UserIcon className="w-[22px] h-[22px] shrink-0 text-[#090b0e]" />
                  <input
                    type="text"
                    value={activateEmployeeId}
                    onChange={(e) => setActivateEmployeeId(e.target.value)}
                    placeholder="1234-XXXX-XXXX"
                    className="w-full bg-transparent text-[13px] font-normal text-[#090b0e] placeholder:text-[#475569] outline-none"
                  />
                </div>
              </div>

              {/* Field 2: Username */}
              <div className="mb-4">
                <label className="block text-[11.5px] text-[#9aa7b8] mb-1.5 text-left font-normal">
                  Username:
                </label>
                <div className="h-11 w-full rounded-2xl px-3 flex items-center gap-2.5 bg-[#a8b4c2]">
                  <UserIcon className="w-[22px] h-[22px] shrink-0 text-[#090b0e]" />
                  <input
                    type="text"
                    value={activateUsername}
                    onChange={(e) => setActivateUsername(e.target.value)}
                    placeholder="@janedoe"
                    className="w-full bg-transparent text-[13px] font-normal text-[#090b0e] placeholder:text-[#475569] outline-none"
                  />
                </div>
              </div>

              {/* Links row placed ABOVE button (Matches Image 5) */}
              <div className="flex items-center justify-between mt-5 mb-4 text-[11.5px] text-[#7a8697]">
                <button
                  type="button"
                  onClick={() => setScreen("login")}
                  className="hover:text-[#c0ccd9] transition-colors cursor-pointer"
                >
                  Login Account
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setScreen("update");
                    setUpdateErrors({});
                  }}
                  className="hover:text-[#c0ccd9] transition-colors cursor-pointer"
                >
                  Update User Account
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-11 bg-[#546881] hover:bg-[#607794] active:bg-[#48596e] text-[#090b0e] font-normal text-[13px] rounded-2xl transition-all duration-150 flex items-center justify-center cursor-pointer shadow-sm tracking-normal"
              >
                Click to Activate Account
              </button>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. UPDATE USER CREDENTIALS VIEW (Matches New Image)       */}
        {/* ========================================================= */}
        {screen === "update" && (
          <div className="w-full max-w-[340px] sm:max-w-[360px] rounded-[26px] bg-[#090b0e] px-7 py-8 sm:px-8 sm:py-8 shadow-2xl shadow-black/60">
            {/* Header (Two lines, centered, no subtitle as per screenshot) */}
            <div className="text-center mb-6 sm:mb-7">
              <h1 className="text-[32px] sm:text-[34px] font-normal tracking-tight text-white leading-[1.15]">
                Update User<br />Credentials
              </h1>
            </div>

            <form onSubmit={handleUpdateSubmit} noValidate>
              {/* Field 1: Username */}
              <div className="mb-3">
                <label
                  className={`block text-[11.5px] mb-1.5 text-left font-normal transition-colors ${
                    updateErrors.username ? "text-[#b04546]" : "text-[#9aa7b8]"
                  }`}
                >
                  Username:
                </label>
                <div
                  className={`h-11 w-full rounded-2xl px-3 flex items-center gap-2.5 transition-colors ${
                    updateErrors.username
                      ? "bg-[#a8b4c2] border-[1.5px] border-[#b04546]"
                      : "bg-[#a8b4c2] border-[1.5px] border-transparent"
                  }`}
                >
                  <UserIcon
                    className={`w-[22px] h-[22px] shrink-0 transition-colors ${
                      updateErrors.username ? "text-[#7d2c2e]" : "text-[#090b0e]"
                    }`}
                  />
                  <input
                    type="text"
                    value={updateUsername}
                    onChange={(e) => {
                      setUpdateUsername(e.target.value);
                      if (updateErrors.username) {
                        setUpdateErrors((prev) => ({ ...prev, username: false }));
                      }
                    }}
                    placeholder="Ex. @JaneDoe"
                    className={`w-full bg-transparent text-[13px] font-normal outline-none transition-colors ${
                      updateErrors.username
                        ? "text-[#7d2c2e] placeholder:text-[#7d2c2e]"
                        : "text-[#090b0e] placeholder:text-[#475569]"
                    }`}
                  />
                </div>
                {updateErrors.username && (
                  <p className="text-[#b04546] text-[11px] mt-1 text-left font-normal">
                    Invalid Username
                  </p>
                )}
              </div>

              {/* Field 2: Password */}
              <div className="mb-3">
                <label
                  className={`block text-[11.5px] mb-1.5 text-left font-normal transition-colors ${
                    updateErrors.password ? "text-[#b04546]" : "text-[#9aa7b8]"
                  }`}
                >
                  Password:
                </label>
                <div
                  className={`h-11 w-full rounded-2xl px-3 flex items-center gap-2.5 transition-colors ${
                    updateErrors.password
                      ? "bg-[#a8b4c2] border-[1.5px] border-[#b04546]"
                      : "bg-[#a8b4c2] border-[1.5px] border-transparent"
                  }`}
                >
                  <KeyIcon
                    className={`w-[22px] h-[22px] shrink-0 transition-colors ${
                      updateErrors.password ? "text-[#7d2c2e]" : "text-[#090b0e]"
                    }`}
                  />
                  <input
                    type={showUpdatePassword ? "text" : "password"}
                    value={updatePassword}
                    onChange={(e) => {
                      setUpdatePassword(e.target.value);
                      if (updateErrors.password) {
                        setUpdateErrors((prev) => ({ ...prev, password: false }));
                      }
                    }}
                    placeholder="1234-XXXX-XXXX"
                    className={`w-full bg-transparent text-[13px] font-normal outline-none transition-colors ${
                      updateErrors.password
                        ? "text-[#7d2c2e] placeholder:text-[#7d2c2e]"
                        : "text-[#090b0e] placeholder:text-[#475569]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowUpdatePassword(!showUpdatePassword)}
                    className="p-1 cursor-pointer focus:outline-none hover:opacity-75"
                    title={showUpdatePassword ? "Hide password" : "Show password"}
                  >
                    {showUpdatePassword ? (
                      <EyeIcon
                        className={`w-[20px] h-[20px] ${
                          updateErrors.password ? "text-[#7d2c2e]" : "text-[#090b0e]"
                        }`}
                      />
                    ) : (
                      <EyeSlashIcon
                        className={`w-[20px] h-[20px] ${
                          updateErrors.password ? "text-[#7d2c2e]" : "text-[#090b0e]"
                        }`}
                      />
                    )}
                  </button>
                </div>
                {updateErrors.password && (
                  <p className="text-[#b04546] text-[11px] mt-1 text-left font-normal">
                    Invalid Password
                  </p>
                )}
              </div>

              {/* Field 3: Confirm Password */}
              <div className="mb-4">
                <label
                  className={`block text-[11.5px] mb-1.5 text-left font-normal transition-colors ${
                    updateErrors.confirmPassword ? "text-[#b04546]" : "text-[#9aa7b8]"
                  }`}
                >
                  Confirm Password:
                </label>
                <div
                  className={`h-11 w-full rounded-2xl px-3 flex items-center gap-2.5 transition-colors ${
                    updateErrors.confirmPassword
                      ? "bg-[#a8b4c2] border-[1.5px] border-[#b04546]"
                      : "bg-[#a8b4c2] border-[1.5px] border-transparent"
                  }`}
                >
                  <KeyIcon
                    className={`w-[22px] h-[22px] shrink-0 transition-colors ${
                      updateErrors.confirmPassword ? "text-[#7d2c2e]" : "text-[#090b0e]"
                    }`}
                  />
                  <input
                    type={showUpdateConfirmPassword ? "text" : "password"}
                    value={updateConfirmPassword}
                    onChange={(e) => {
                      setUpdateConfirmPassword(e.target.value);
                      if (updateErrors.confirmPassword) {
                        setUpdateErrors((prev) => ({ ...prev, confirmPassword: false }));
                      }
                    }}
                    placeholder="1234-XXXX-XXXX"
                    className={`w-full bg-transparent text-[13px] font-normal outline-none transition-colors ${
                      updateErrors.confirmPassword
                        ? "text-[#7d2c2e] placeholder:text-[#7d2c2e]"
                        : "text-[#090b0e] placeholder:text-[#475569]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowUpdateConfirmPassword(!showUpdateConfirmPassword)}
                    className="p-1 cursor-pointer focus:outline-none hover:opacity-75"
                    title={showUpdateConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showUpdateConfirmPassword ? (
                      <EyeIcon
                        className={`w-[20px] h-[20px] ${
                          updateErrors.confirmPassword ? "text-[#7d2c2e]" : "text-[#090b0e]"
                        }`}
                      />
                    ) : (
                      <EyeSlashIcon
                        className={`w-[20px] h-[20px] ${
                          updateErrors.confirmPassword ? "text-[#7d2c2e]" : "text-[#090b0e]"
                        }`}
                      />
                    )}
                  </button>
                </div>
                {updateErrors.confirmPassword && (
                  <p className="text-[#b04546] text-[11px] mt-1 text-left font-normal">
                    Passwords do not match. Please try again
                  </p>
                )}
              </div>

              {/* Navigation links above the button (Matches Screenshot) */}
              <div className="flex items-center justify-between mt-5 mb-4 text-[11.5px] text-[#7a8697]">
                <button
                  type="button"
                  onClick={() => {
                    setScreen("login");
                    setHasError(false);
                  }}
                  className="hover:text-[#c0ccd9] transition-colors cursor-pointer"
                >
                  Login Account
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setScreen("activate");
                    setHasError(false);
                  }}
                  className="hover:text-[#c0ccd9] transition-colors cursor-pointer"
                >
                  Activate Account
                </button>
              </div>

              {/* Submit Button ("Save") */}
              <button
                type="submit"
                className="w-full h-11 bg-[#546881] hover:bg-[#607794] active:bg-[#48596e] text-[#090b0e] font-normal text-[13px] rounded-2xl transition-all duration-150 flex items-center justify-center cursor-pointer shadow-sm tracking-normal"
              >
                Save
              </button>
            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. FORGOT PASSWORD VIEW                                   */}
        {/* ========================================================= */}
        {screen === "forgot" && (
          <div className="w-full max-w-[340px] sm:max-w-[360px] rounded-[26px] bg-[#090b0e] px-7 py-8 sm:px-8 sm:py-8 shadow-2xl shadow-black/60">
            <div className="text-center">
              <h1 className="text-[30px] sm:text-[32px] font-normal tracking-tight text-white leading-tight">
                Reset Password
              </h1>
              <p className="text-[11px] text-[#748090] mt-1.5 mb-6">
                Enter your details to receive password recovery instructions
              </p>
            </div>

            <form onSubmit={handleForgotSubmit} noValidate>
              <div className="mb-4">
                <label className="block text-[11.5px] text-[#9aa7b8] mb-1.5 text-left font-normal">
                  Employee ID or Username:
                </label>
                <div className="h-11 w-full rounded-2xl px-3 flex items-center gap-2.5 bg-[#a8b4c2]">
                  <UserIcon className="w-[22px] h-[22px] shrink-0 text-[#090b0e]" />
                  <input
                    type="text"
                    value={forgotInput}
                    onChange={(e) => setForgotInput(e.target.value)}
                    placeholder="1234-XXXX-XXXX or @JaneDoe"
                    className="w-full bg-transparent text-[13px] text-[#090b0e] placeholder:text-[#475569] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-5 mb-4 text-[11.5px] text-[#7a8697]">
                <button
                  type="button"
                  onClick={() => setScreen("login")}
                  className="hover:text-[#c0ccd9] transition-colors cursor-pointer"
                >
                  Back to Login
                </button>
                <button
                  type="button"
                  onClick={() => setScreen("activate")}
                  className="hover:text-[#c0ccd9] transition-colors cursor-pointer"
                >
                  Activate Account
                </button>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#546881] hover:bg-[#607794] text-[#090b0e] font-normal text-[13px] rounded-2xl transition-all duration-150 flex items-center justify-center cursor-pointer shadow-sm"
              >
                Send Reset Request
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
