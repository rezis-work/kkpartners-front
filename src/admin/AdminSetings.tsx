import { useState, useEffect, useCallback } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { validateAdminInputs } from "./validateAdmin";
import { registerAdmin } from "./registerAdmin";

function debounce<Func extends (...args: any[]) => void>(func: Func, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<Func>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export default function AdminSettings() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const debouncedValidate = useCallback(
    debounce((emailVal: string, passVal: string, confirmVal: string) => {
      const error = validateAdminInputs(emailVal, passVal, confirmVal);
      setErrorMessage(error || "");
    }, 500),
    []
  );

  useEffect(() => {
    debouncedValidate(email, password, confirmPassword);
  }, [email, password, confirmPassword, debouncedValidate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const error = validateAdminInputs(email, password, confirmPassword);
    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    const result = await registerAdmin(email, password);

    if (result.success) {
      toast.success(result.message);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrorMessage("");
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Admin</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center">
          <label htmlFor="email" className="w-32 font-medium text-gray-700">
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="admin@example.com"
            className="flex-1 px-4 py-2 border rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="password" className="w-32 font-medium text-gray-700">
            Password:
          </label>
          <div className="relative flex-1">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-xl pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-600"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <label htmlFor="confirm" className="w-32 font-medium text-gray-700">
            Confirm:
          </label>
          <input
            id="confirm"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="flex-1 px-4 py-2 border rounded-xl"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && (
          <p className="text-red-600 text-sm mt-1 text-center">{errorMessage}</p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !!errorMessage}
            className={`bg-purple-400 text-white px-6 py-2 rounded-xl transition 
              duration-300 ease-in-out hover:bg-purple-500
              ${(loading || errorMessage) ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
