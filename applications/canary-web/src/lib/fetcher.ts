export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

export async function apiFetch(
  url: string,
  options: RequestInit,
): Promise<Response> {
  const response = await fetch(url, { credentials: "include", ...options });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response;
}
