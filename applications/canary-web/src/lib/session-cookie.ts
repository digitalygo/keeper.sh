const SESSION_COOKIE = "keeper.has_session=1";

export function hasSessionCookie(): boolean {
  return document.cookie.split("; ").some((cookie) => cookie.startsWith(SESSION_COOKIE));
}
