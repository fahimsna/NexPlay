import { useEffect, useState } from "react";

import UserProfileCard from "../../components/user/UserProfileCard";

import ProfileStats from "../../components/user/ProfileStats";

import RecentlyViewed from "../../components/user/RecentlyViewed";

import ActivityHistory from "../../components/user/ActivityHistory";

import FavouriteGenres from "../../components/user/FavouriteGenres";

import FavouriteSports from "../../components/user/FavouriteSports";

import {
  getRecentActivity,
  getActivityHistory,
} from "../../services/activityService";

function UserProfile() {
  // =======================
  // Existing User
  // =======================

  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  // =======================
  // Existing UI State
  // =======================

  const [showEditMessage, setShowEditMessage] = useState(false);

  // =======================
  // Activity State
  // =======================

  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const [activities, setActivities] = useState([]);

  const [activityLoading, setActivityLoading] = useState(true);

  const [activityError, setActivityError] = useState("");

  // =======================
  // Favourite Genres
  // =======================

  const [favouriteGenres, setFavouriteGenres] = useState([]);

  // =======================
  // Favourite Sports
  // =======================

  const [favouriteSports, setFavouriteSports] = useState([]);

  // =======================
  // Load Activity
  // =======================

  useEffect(() => {
    if (!user) {
      setActivityLoading(false);
      return;
    }

    loadActivity();
  }, []);

  async function loadActivity() {
    try {
      setActivityLoading(true);

      setActivityError("");

      const [recentData, historyData] = await Promise.all([
        getRecentActivity(),
        getActivityHistory(),
      ]);

      /*
       * The existing activity service already returns
       * response.data.activities.
       *
       * We normalize the backend fields here so that
       * the existing UI components remain untouched.
       */

      const normalizedRecent = normalizeActivities(recentData);

      const normalizedHistory = normalizeActivities(historyData);

      setRecentlyViewed(normalizedRecent);

      setActivities(normalizedHistory);
    } catch (error) {
      console.error("Failed to load activity:", error);

      setActivityError(
        error.response?.data?.message ||
          "Unable to load your activity right now.",
      );

      setRecentlyViewed([]);

      setActivities([]);
    } finally {
      setActivityLoading(false);
    }
  }

  // =======================
  // Normalize Activity
  // =======================

  function normalizeActivities(items = []) {
    return items.map((activity) => ({
      id: activity.contentId || activity.id,

      type: activity.contentType || activity.type || "movie",

      title: activity.title || "Unknown Content",

      poster_path: activity.posterPath || activity.poster_path || null,

      createdAt: activity.createdAt,

      updatedAt: activity.updatedAt,

      metadata: activity.metadata || {},
    }));
  }

  // =======================
  // Profile Statistics
  // =======================

  const stats = {
    moviesViewed: activities.filter((activity) => activity.type === "movie")
      .length,

    seriesViewed: activities.filter(
      (activity) => activity.type === "series" || activity.type === "tv",
    ).length,

    sportsViewed: activities.filter((activity) => activity.type === "sports")
      .length,

    /*
     * Reviews are handled by the existing review system.
     * We will connect the real review count separately.
     */
    reviews: 0,

    totalActivity: activities.length,
  };

  // =======================
  // Favourite Genres
  // =======================

  const handleSaveGenres = async (genres) => {
    console.log("Favourite genres:", genres);

    setFavouriteGenres(genres);
  };

  // =======================
  // Favourite Sports
  // =======================

  const handleSaveSports = async (sports) => {
    console.log("Favourite sports:", sports);

    setFavouriteSports(sports);
  };

  // =======================
  // Not Logged In
  // =======================

  if (!user) {
    return (
      <main
        className="
          min-h-screen
          bg-[#17191D]
          text-white
          flex
          items-center
          justify-center
          px-6
        "
      >
        <div className="text-center">
          <h1 className="text-3xl font-black">Profile unavailable</h1>

          <p className="text-gray-400 mt-3">
            Please log in to view your profile.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
        min-h-screen
        bg-[#17191D]
        text-white
        px-5
        sm:px-8
        lg:px-12
        py-10
      "
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* =======================
            PAGE HEADER
        ======================= */}

        <div>
          <p
            className="
              text-[#D4A017]
              font-semibold
              text-sm
              uppercase
              tracking-[2px]
            "
          >
            My Account
          </p>

          <h1
            className="
              text-4xl
              sm:text-5xl
              font-black
              mt-2
            "
          >
            My Profile
          </h1>

          <p className="text-gray-400 mt-3">
            Manage your NexPlay profile and track your entertainment activity.
          </p>
        </div>

        {/* =======================
            PROFILE CARD
        ======================= */}

        <UserProfileCard user={user} onEdit={() => setShowEditMessage(true)} />

        {/* =======================
            EDIT MESSAGE
        ======================= */}

        {showEditMessage && (
          <div
            className="
              bg-[#D4A017]/10
              border
              border-[#D4A017]/20
              rounded-2xl
              px-5
              py-4
              text-[#D4A017]
            "
          >
            Profile editing will be available in the next Sprint 4 step.
          </div>
        )}

        {/* =======================
            ACTIVITY ERROR
        ======================= */}

        {activityError && (
          <div
            className="
              bg-red-500/10
              border
              border-red-500/20
              rounded-2xl
              px-5
              py-4
              text-red-400
            "
          >
            {activityError}
          </div>
        )}

        {/* =======================
            PROFILE STATISTICS
        ======================= */}

        <ProfileStats stats={stats} />

        {/* =======================
            FAVOURITE GENRES
        ======================= */}

        <FavouriteGenres genres={favouriteGenres} onSave={handleSaveGenres} />

        {/* =======================
            FAVOURITE SPORTS
        ======================= */}

        <FavouriteSports sports={favouriteSports} onSave={handleSaveSports} />

        {/* =======================
            RECENTLY VIEWED
        ======================= */}

        {activityLoading ? (
          <section>
            <div className="mb-5">
              <p
                className="
                  text-[#D4A017]
                  text-sm
                  font-semibold
                  uppercase
                  tracking-wider
                "
              >
                Continue Exploring
              </p>

              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  font-black
                  text-white
                  mt-1
                "
              >
                Recently Viewed
              </h2>
            </div>

            <div
              className="
                bg-[#24272D]
                border
                border-white/10
                rounded-2xl
                p-8
                text-center
                text-gray-400
              "
            >
              Loading recently viewed...
            </div>
          </section>
        ) : (
          <RecentlyViewed items={recentlyViewed} />
        )}

        {/* =======================
            ACTIVITY HISTORY
        ======================= */}

        {activityLoading ? (
          <section>
            <div className="mb-5">
              <p
                className="
                  text-[#D4A017]
                  text-sm
                  font-semibold
                  uppercase
                  tracking-wider
                "
              >
                Your History
              </p>

              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  font-black
                  text-white
                  mt-1
                "
              >
                Activity History
              </h2>
            </div>

            <div
              className="
                bg-[#24272D]
                border
                border-white/10
                rounded-3xl
                p-8
                text-center
                text-gray-400
              "
            >
              Loading activity history...
            </div>
          </section>
        ) : (
          <ActivityHistory activities={activities} />
        )}
      </div>
    </main>
  );
}

export default UserProfile;
