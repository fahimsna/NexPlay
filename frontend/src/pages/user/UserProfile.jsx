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

import {
  getUserProfile,
  updateUserProfile,
  updateFavouriteGenres,
  updateFavouriteSports,
} from "../../services/userService";

function UserProfile() {
  // =======================
  // Existing User
  // =======================

  const storedUser = localStorage.getItem("user");

  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [user, setUser] = useState(initialUser);

  // =======================
  // Edit Profile
  // =======================

  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    fullName: initialUser?.fullName || "",
    username: initialUser?.username || "",
    email: initialUser?.email || "",
  });

  const [savingProfile, setSavingProfile] = useState(false);

  const [profileMessage, setProfileMessage] = useState("");

  const [profileError, setProfileError] = useState("");

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
  // Load User Profile
  // =======================

  useEffect(() => {
    if (!initialUser) {
      return;
    }

    loadUserProfile();
  }, []);

  async function loadUserProfile() {
    try {
      const profile = await getUserProfile();

      // Keep the latest user information
      setUser(profile);

      // Keep localStorage synchronized
      localStorage.setItem("user", JSON.stringify(profile));

      // Populate edit form
      setEditForm({
        fullName: profile?.fullName || "",
        username: profile?.username || "",
        email: profile?.email || "",
      });

      // Favourite genres
      setFavouriteGenres(
        Array.isArray(profile?.favouriteGenres) ? profile.favouriteGenres : [],
      );

      // Favourite sports
      setFavouriteSports(
        Array.isArray(profile?.favouriteSports) ? profile.favouriteSports : [],
      );
    } catch (error) {
      console.error("Failed to load user profile:", error);
    }
  }

  // =======================
  // Handle Edit Input
  // =======================

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =======================
  // Start Editing
  // =======================

  const handleStartEditing = () => {
    setProfileMessage("");
    setProfileError("");

    setEditForm({
      fullName: user?.fullName || "",
      username: user?.username || "",
      email: user?.email || "",
    });

    setIsEditing(true);
  };

  // =======================
  // Cancel Editing
  // =======================

  const handleCancelEditing = () => {
    setEditForm({
      fullName: user?.fullName || "",
      username: user?.username || "",
      email: user?.email || "",
    });

    setProfileMessage("");
    setProfileError("");

    setIsEditing(false);
  };

  // =======================
  // Save Profile
  // =======================

  const handleSaveProfile = async (event) => {
    event.preventDefault();

    try {
      setSavingProfile(true);
      setProfileMessage("");
      setProfileError("");

      const updatedUser = await updateUserProfile(editForm);

      // Update React state
      setUser(updatedUser);

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update form
      setEditForm({
        fullName: updatedUser?.fullName || "",
        username: updatedUser?.username || "",
        email: updatedUser?.email || "",
      });

      setIsEditing(false);

      setProfileMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update profile:", error);

      setProfileError(
        error?.response?.data?.message || "Failed to update profile.",
      );
    } finally {
      setSavingProfile(false);
    }
  };

  // =======================
  // Load Activity
  // =======================

  useEffect(() => {
    if (!initialUser) {
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
    if (!Array.isArray(items)) {
      return [];
    }

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

    reviews: 0,

    totalActivity: activities.length,
  };

  // =======================
  // Favourite Genres
  // =======================

  const handleSaveGenres = async (genres) => {
    try {
      const savedGenres = await updateFavouriteGenres(genres);

      setFavouriteGenres(savedGenres);
    } catch (error) {
      console.error("Failed to save favourite genres:", error);

      throw error;
    }
  };

  // =======================
  // Favourite Sports
  // =======================

  const handleSaveSports = async (sports) => {
    try {
      const savedSports = await updateFavouriteSports(sports);

      setFavouriteSports(savedSports);
    } catch (error) {
      console.error("Failed to save favourite sports:", error);

      throw error;
    }
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

        {!isEditing && (
          <UserProfileCard user={user} onEdit={handleStartEditing} />
        )}

        {/* =======================
            EDIT PROFILE
        ======================= */}

        {isEditing && (
          <section
            className="
              bg-[#24272D]
              border
              border-white/10
              rounded-3xl
              p-6
              sm:p-8
              shadow-xl
            "
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-wider">
                  Account Settings
                </p>

                <h2 className="text-2xl sm:text-3xl font-black mt-1">
                  Edit Profile
                </h2>

                <p className="text-gray-400 text-sm mt-2">
                  Update your basic NexPlay account information.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Full Name */}

              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={editForm.fullName}
                  onChange={handleProfileChange}
                  required
                  maxLength={100}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-[#17191D]
                    px-4
                    py-3
                    text-white
                    outline-none
                    transition
                    focus:border-[#D4A017]
                  "
                  placeholder="Enter your full name"
                />
              </div>

              {/* Username */}

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleProfileChange}
                  required
                  maxLength={50}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-[#17191D]
                    px-4
                    py-3
                    text-white
                    outline-none
                    transition
                    focus:border-[#D4A017]
                  "
                  placeholder="Enter your username"
                />
              </div>

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-300 mb-2"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleProfileChange}
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-[#17191D]
                    px-4
                    py-3
                    text-white
                    outline-none
                    transition
                    focus:border-[#D4A017]
                  "
                  placeholder="Enter your email"
                />
              </div>

              {/* Error */}

              {profileError && (
                <div
                  className="
                    rounded-xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    px-4
                    py-3
                    text-sm
                    text-red-400
                  "
                >
                  {profileError}
                </div>
              )}

              {/* Success */}

              {profileMessage && (
                <div
                  className="
                    rounded-xl
                    border
                    border-green-500/20
                    bg-green-500/10
                    px-4
                    py-3
                    text-sm
                    text-green-400
                  "
                >
                  {profileMessage}
                </div>
              )}

              {/* Buttons */}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="
                    px-6
                    py-3
                    rounded-xl
                    bg-[#D4A017]
                    text-[#17191D]
                    font-bold
                    transition
                    hover:bg-[#e7b52b]
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  {savingProfile ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={handleCancelEditing}
                  disabled={savingProfile}
                  className="
                    px-6
                    py-3
                    rounded-xl
                    bg-white/10
                    text-white
                    font-semibold
                    transition
                    hover:bg-white/15
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
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

        <FavouriteGenres
          favouriteGenres={favouriteGenres}
          onSave={handleSaveGenres}
        />

        {/* =======================
            FAVOURITE SPORTS
        ======================= */}

        <FavouriteSports
          favouriteSports={favouriteSports}
          onSave={handleSaveSports}
        />

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
