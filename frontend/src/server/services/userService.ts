export const userService = {
  authenticate,
};

async function authenticate(username: string, password: string) {
  try {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const user = await response.json();

    if (user.success) {
      console.log("User successfully logged in");
      return Promise.resolve(user);
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return Promise.resolve(null);
  }
}
