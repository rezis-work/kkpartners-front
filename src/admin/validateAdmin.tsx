export function validateAdminInputs(email: string, password: string, confirmPassword: string): string | null {
  if (!email) return "Email is required";
  if (!password) return "Password is required";
  if (!confirmPassword) return "Please confirm your password";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format";

  if (password.length < 6) return "Password must be at least 6 characters";

  if (password !== confirmPassword) return "Passwords do not match";

  return null;
}
