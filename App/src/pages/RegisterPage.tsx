import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import AppLogo from "../components/icons/AppLogo";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    if (!username || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/v1/signup", {
        username,
        email,
        password,
      }, { withCredentials: true });
          if(res.data.success)
          {    toast.success("Account Created Successfully!");
      setShowSignup(false);
      form.reset();}
  
    } catch (err: any) {
      console.error("Signup Error:", err);
      toast.error("Account already exists");
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/v1/signin", {
        email,
        password,
      }, { withCredentials: true });

      const backendData = res.data;
      localStorage.setItem("token", backendData.token);
      localStorage.setItem("userId", backendData.userID);
      toast.success("Logged in Successfully!");
      setShowLogin(false);
      navigate("/HomePage");
    } catch (err: any) {
      console.error("Login Error:", err);
      toast.error("Login failed. Please check your credentials.");
    }
  }

  // ... (rest of the component remains unchanged)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <nav className="sticky top-0 z-10 bg-sky-100 shadow-sm backdrop-blur-md px-6 py-4">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    {/* Logo and Brand */}
    <div className="flex items-center gap-3">
      <AppLogo />
      <span className="text-2xl font-bold text-blue-600 tracking-wide">MindVault</span>
    </div>

    {/* Auth Buttons */}
    <div className="flex gap-3">
      <button
        onClick={() => { setShowLogin(true); setShowSignup(false); }}
        className="px-5 py-2 rounded-lg text-blue-600 font-semibold border border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
      >
        Login
      </button>
      <button
        onClick={() => { setShowSignup(true); setShowLogin(false); }}
        className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
      >
        Sign Up
      </button>
    </div>
  </div>
</nav>


      <header className="text-center px-6 py-20">
        <h1 className="text-5xl font-bold mb-6 leading-tight">Organize Your <span className="text-blue-600">Digital Life</span></h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          MindVault helps you capture and organize your most valuable content — from videos to tweets and documents — all in one place. Stay focused, save smarter, and never lose an idea again.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => { setShowSignup(true); setShowLogin(false); }}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-lg"
          >Get Started Free</button>
          <button
            onClick={() => { setShowLogin(true); setShowSignup(false); }}
            className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50"
          >Already a member? Login</button>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-blue-50 p-6 rounded-xl hover:shadow-md">
            <div className="text-blue-600 text-4xl mb-2">🧠</div>
            <h3 className="text-xl font-semibold mb-1">Capture Ideas Instantly</h3>
            <p className="text-gray-600 text-sm">Save articles, notes, and resources with one click whenever inspiration strikes.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl hover:shadow-md">
            <div className="text-blue-600 text-4xl mb-2">🗂️</div>
            <h3 className="text-xl font-semibold mb-1">Organize Effortlessly</h3>
            <p className="text-gray-600 text-sm">Smart tags and categories help you organize content without the hassle.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl hover:shadow-md">
            <div className="text-blue-600 text-4xl mb-2">📌</div>
            <h3 className="text-xl font-semibold mb-1">Save What Matters</h3>
            <p className="text-gray-600 text-sm">Quickly capture YouTube videos, tweets, and documents — all in one organized, easy-to-access place.</p>
          </div>
        </div>
      </section>

      {/* Modals */}
      {showLogin && (
        <Modal title="Welcome Back" onClose={() => setShowLogin(false)}>
          <LoginForm handleLogin={handleLogin} toggleToSignup={() => { setShowLogin(false); setShowSignup(true); }} />
        </Modal>
      )}

      {showSignup && (
        <Modal title="Create Your Account" onClose={() => setShowSignup(false)}>
          <SignupForm handleSignup={handleSignup} toggleToLogin={() => { setShowSignup(false); setShowLogin(true); }} />
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ title, onClose, children }: { title: string, onClose: () => void, children: React.ReactNode }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
      </div>
      {children}
    </div>
  </div>
);

const LoginForm = ({ handleLogin, toggleToSignup }: { handleLogin: (e: React.FormEvent) => void, toggleToSignup: () => void }) => (
  <form onSubmit={handleLogin} className="space-y-6">
    <InputField label="Email" type="email" name="email" placeholder="your@email.com" />
    <InputField label="Password" type="password" name="password" placeholder="••••••••" />
    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Login</button>
    <div className="text-center mt-4">
      <button type="button" onClick={toggleToSignup} className="text-blue-600 hover:underline text-sm">Don't have an account? Sign up</button>
    </div>
  </form>
);

const SignupForm = ({ handleSignup, toggleToLogin }: { handleSignup: (e: React.FormEvent) => void, toggleToLogin: () => void }) => (
  <form onSubmit={handleSignup} className="space-y-6">
    <InputField label="Username" type="text" name="username" placeholder="Choose a username" />
    <InputField label="Email" type="email" name="email" placeholder="your@email.com" />
    <InputField label="Password" type="password" name="password" placeholder="••••••••" />
    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Create Account</button>
    <div className="text-center mt-4">
      <button type="button" onClick={toggleToLogin} className="text-blue-600 hover:underline text-sm">Already have an account? Login</button>
    </div>
  </form>
);

const InputField = ({ label, ...props }: { label: string, name: string, type: string, placeholder: string }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
      {...props}
    />
  </div>
);

export default RegisterPage;