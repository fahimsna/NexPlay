import { useState } from "react";

import UserProfileCard from "../../components/user/UserProfileCard";
import ProfileStats from "../../components/user/ProfileStats";
import RecentlyViewed from "../../components/user/RecentlyViewed";
import ActivityHistory from "../../components/user/ActivityHistory";

function UserProfile() {
  /*
   * For the first UI implementation we read the
   * already-existing authenticated user from localStorage.
   *
   * This does NOT change authentication logic.
   *
   * Backend profile/activity integration will be added
   * separately.
   */

  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  const [showEditMessage, setShowEditMessage] = useState(false);

  /*
   * Temporary empty data.
   *
   * These will later come from the Sprint 4 API.
   */
  const stats = {
    moviesViewed: 0,
    seriesViewed: 0,
    sportsViewed: 0,
    reviews: 0,
    totalActivity: 0,
  };

  const recentlyViewed = [];

  const activities = [];

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
        {/* Page Header */}

        <div>
          <p className="text-[#D4A017] font-semibold text-sm uppercase tracking-[2px]">
            My Account
          </p>

          <h1 className="text-4xl sm:text-5xl font-black mt-2">My Profile</h1>

          <p className="text-gray-400 mt-3">
            Manage your NexPlay profile and track your entertainment activity.
          </p>
        </div>

        {/* Profile */}

        <UserProfileCard user={user} onEdit={() => setShowEditMessage(true)} />

        {/* Edit placeholder */}

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

        {/* Statistics */}

        <ProfileStats stats={stats} />

        {/* Recently Viewed */}

        <RecentlyViewed items={recentlyViewed} />

        {/* Activity */}

        <ActivityHistory activities={activities} />
      </div>
    </main>
  );
}

export default UserProfile;
