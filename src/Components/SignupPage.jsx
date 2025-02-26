import React, { useState } from "react";
import { Mail, Lock, User, Briefcase } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const SignupPage = () => {
  const [role, setRole] = useState("Student");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const payload =
        role === "Student"
          ? { firstName, lastName, email, password, role }
          : { employeeId, password, role };

      const response = await axios.post(`${API_URL}/signup`, payload, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert("Verification email sent. Please check your inbox.");
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error("Error verifying email:", error);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("hero-bg.jpg")' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-around relative z-20 p-4 gap-8">
      <img
          src="../../public/solar-wind.png"
          alt="Solar Wind"
          className="h-64 w-64 md:h-96 md:w-96 lg:h-[500px] lg:w-[500px] object-contain"
        />
        <div className="w-full max-w-sm p-8 rounded-2xl text-center border border-white/50 backdrop-blur-lg shadow-2xl">
          <h2 className="text-3xl font-ovo text-white mb-3">Sign Up</h2>
          <p className="pb-3 text-gray-400">
            {isOtpSent ? "Enter the OTP sent to your email" : "Create a new account"}
          </p>

          <form onSubmit={handleEmailVerification} className="flex flex-col space-y-6">
            {/* Role Selection - Styled Dropdown */}
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-gray-800 text-white text-lg pl-4 pr-4 py-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
              >
                <option value="Student" className="text-black">Student</option>
                <option value="Faculty" className="text-black">Faculty</option>
              </select>
            </div>

            {!isOtpSent && (
              <>
                {role === "Student" ? (
                  <>
                    {/* First Name & Last Name */}
                    <div className="flex gap-4">
                      <div className="relative w-1/2">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          placeholder="First Name"
                          className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>

                      <div className="relative w-1/2">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          placeholder="Last Name"
                          className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email Address"
                        className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </>
                ) : (
                  /* Employee ID Input (for Faculty) */
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                    <input
                      type="text"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      required
                      placeholder="Employee ID"
                      className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                )}

                {/* Password Input */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                    className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                {/* Confirm Password Input */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm Password"
                    className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </>
            )}

            {/* Dynamic Button Text */}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-blue-500 transition-all shadow-md"
            >
              {role === "Faculty" ? "Update Password" : "Verify Email"}
            </button>
            {/* Login Link */}
            <div className="text-white text-sm">
              <p>
                Already have an account?{" "}
                <a href="/login" className="underline hover:text-gray-300">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
