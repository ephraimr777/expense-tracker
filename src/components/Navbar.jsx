import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-700 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}

        <div className="flex items-center gap-4">

          <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center text-3xl shadow-lg">
            💰
          </div>

          <div>

            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Expense Tracker
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome back, {user?.email?.split("@")[0]}
            </p>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-4">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="h-11 px-5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:scale-105 transition font-medium"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <div className="hidden md:flex items-center gap-3 rounded-2xl bg-gray-100 dark:bg-slate-800 px-4 py-2">

            <div className="h-11 w-11 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white flex items-center justify-center font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>

            <div>

              <p className="font-semibold text-gray-800 dark:text-white">
                {user?.email?.split("@")[0]}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>

            </div>

          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold transition shadow-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;