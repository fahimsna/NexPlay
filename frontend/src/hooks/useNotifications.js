import { useCallback, useEffect, useState } from "react";

import { discoverContent } from "../services/tmdbService";
import { getLiveMatches } from "../services/sportsService";

/*
|--------------------------------------------------------------------------
| USE NOTIFICATIONS
|--------------------------------------------------------------------------
|
| Loads the same three notification sources (new movies, new series,
| live matches) and keeps track of which ones the user has already
| opened, using localStorage (so it's remembered per-browser, without
| needing a database table just for this).
|
| The "unseen count" shown as a badge next to the bell icon is simply:
| total items right now, minus how many of those exact items are
| already marked seen.
|
|--------------------------------------------------------------------------
*/

const STORAGE_KEY = "nexplay-seen-notifications";

function loadSeenIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (error) {
    return new Set();
  }
}

function saveSeenIds(seenSet) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(seenSet)));
  } catch (error) {
    // ignore (e.g. private browsing / storage disabled)
  }
}

export default function useNotifications() {
  const [newMovies, setNewMovies] = useState([]);
  const [newSeries, setNewSeries] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);

  const [loading, setLoading] = useState(true);

  const [seenIds, setSeenIds] = useState(() => loadSeenIds());

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    try {
      setLoading(true);

      const [movies, series, matches] = await Promise.all([
        discoverContent({
          type: "movie",
          sortBy: "primary_release_date.desc",
          page: 1,
        }),
        discoverContent({
          type: "tv",
          sortBy: "first_air_date.desc",
          page: 1,
        }),
        getLiveMatches().catch(() => []),
      ]);

      setNewMovies((movies || []).slice(0, 8));
      setNewSeries((series || []).slice(0, 8));
      setLiveMatches(matches || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Every notification gets a unique key, prefixed by type so a movie
  // id can never collide with a series id or a match id.

  const allIds = [
    ...newMovies.map((movie) => `movie-${movie.id}`),
    ...newSeries.map((show) => `series-${show.id}`),
    ...liveMatches.map((match) => `match-${match.id}`),
  ];

  const unseenCount = allIds.filter((id) => !seenIds.has(id)).length;

  const markSeen = useCallback((id) => {
    setSeenIds((prev) => {
      if (prev.has(id)) {
        return prev;
      }

      const next = new Set(prev);

      next.add(id);

      saveSeenIds(next);

      return next;
    });
  }, []);

  // Marks every notification currently loaded as seen in one go - used
  // when the Notifications page itself is opened, so the badge clears
  // immediately instead of only shrinking one click at a time.
  const markAllSeen = useCallback((ids) => {
    if (!ids || ids.length === 0) {
      return;
    }

    setSeenIds((prev) => {
      const next = new Set(prev);

      let changed = false;

      ids.forEach((id) => {
        if (!next.has(id)) {
          next.add(id);
          changed = true;
        }
      });

      if (!changed) {
        return prev;
      }

      saveSeenIds(next);

      return next;
    });
  }, []);

  return {
    loading,
    newMovies,
    newSeries,
    liveMatches,
    unseenCount,
    markSeen,
    markAllSeen,
    allIds,
  };
}