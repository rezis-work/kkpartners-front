interface RegisterResult {
  success: boolean;
  message: string;
}

export async function registerAdmin(email: string, password: string): Promise<RegisterResult> {
  try {
    const res = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 201) {
      return { success: true, message: "Admin registered successfully" };
    } else if (res.status === 400) {
      const data = await res.json();
      return { success: false, message: data.message || "Validation error" };
    } else {
      return { success: false, message: "Something went wrong" };
    }
  } catch (error) {
    return { success: false, message: "Network error" };
  }
}
