const STORAGE_KEY = "nexplay_anonymous_id";

export function getAnonymousId() {
  let id = localStorage.getItem(STORAGE_KEY);

  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `guest-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    localStorage.setItem(STORAGE_KEY, id);
  }

  return id;
}