import { useState } from "react";

import UserProfileCard from "../../components/user/UserProfileCard";
import ProfileStats from "../../components/user/ProfileStats";
import RecentlyViewed from "../../components/user/RecentlyViewed";
import ActivityHistory from "../../components/user/ActivityHistory";
import FavouriteGenres from "../../components/user/FavouriteGenres";
import FavouriteSports from "../../components/user/FavouriteSports";

function UserProfile() {
  /*
   * Read the existing authenticated user
   * from localStorage.
   *
   * This does NOT change authentication logic.
   */

  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  const [showEditMessage, setShowEditMessage] = useState(false);

  /*
   * Sprint 4 statistics.
   *
   * Backend integration can be connected later.
   */
  const stats = {
    moviesViewed: 0,
    seriesViewed: 0,
    sportsViewed: 0,
    reviews: 0,
    totalActivity: 0,
  };

  /*
   * Existing Sprint 4 activity data.
   *
   * These remain untouched for now.
   */
  const recentlyViewed = [];

  const activities = [];

  /*
   * Favourite Genres & Sports
   *
   * UI is implemented first.
   * Database persistence will be connected separately.
   */
  const favouriteGenres = [];

  const favouriteSports = [];

  const handleSaveGenres = async (genres) => {
    console.log("Favourite genres:", genres);

    // Backend persistence will be added next.
  };

  const handleSaveSports = async (sports) => {
    console.log("Favourite sports:", sports);

    // Backend persistence will be added next.
  };

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
        {/* =========================
            PAGE HEADER
        ========================== */}

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

        {/* =========================
            PROFILE CARD
        ========================== */}

        <UserProfileCard user={user} onEdit={() => setShowEditMessage(true)} />

        {/* =========================
            EDIT PLACEHOLDER
        ========================== */}

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

        {/* =========================
            PROFILE STATISTICS
        ========================== */}

        <ProfileStats stats={stats} />

        {/* =========================
            FAVOURITE GENRES
        ========================== */}

        <FavouriteGenres genres={favouriteGenres} onSave={handleSaveGenres} />

        {/* =========================
            FAVOURITE SPORTS
        ========================== */}

        <FavouriteSports sports={favouriteSports} onSave={handleSaveSports} />

        {/* =========================
            RECENTLY VIEWED
        ========================== */}

        <RecentlyViewed items={recentlyViewed} />

        {/* =========================
            ACTIVITY HISTORY
        ========================== */}

        <ActivityHistory activities={activities} />
      </div>
    </main>
  );
}

export default UserProfile;
