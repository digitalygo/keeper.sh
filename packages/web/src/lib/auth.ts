export async function signIn(username: string, password: string) {
  const response = await fetch("/api/auth/username-only/sign-in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Sign in failed");
  }

  return response.json();
}

export async function signUp(
  username: string,
  password: string,
  name?: string,
) {
  const response = await fetch("/api/auth/username-only/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, name }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Sign up failed");
  }

  return response.json();
}

export async function signOut() {
  const response = await fetch("/api/auth/sign-out", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error("Sign out failed");
  }

  return response.json();
}

export async function getSession() {
  const response = await fetch("/api/auth/get-session");

  if (!response.ok) {
    return null;
  }

  return response.json();
}
