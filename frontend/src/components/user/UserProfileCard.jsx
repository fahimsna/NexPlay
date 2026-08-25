import { HiUserCircle, HiPencilSquare, HiEnvelope } from "react-icons/hi2";

function UserProfileCard({ user, onEdit }) {
  if (!user) return null;

  const displayName = user.fullName || user.username || "NexPlay User";

  return (
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
      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          justify-between
          gap-6
        "
      >
        <div className="flex items-center gap-5">
          {/* Avatar */}

          <div
            className="
              w-20
              h-20
              sm:w-24
              sm:h-24
              rounded-full
              bg-[#D4A017]
              flex
              items-center
              justify-center
              overflow-hidden
              shrink-0
            "
          >
            {user.profilePicture || user.avatar ? (
              <img
                src={user.profilePicture || user.avatar}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <HiUserCircle size={70} className="text-[#17191D]" />
            )}
          </div>

          {/* User information */}

          <div>
            <p className="text-sm text-[#D4A017] font-semibold">NEXPLAY USER</p>

            <h1
              className="
                mt-1
                text-2xl
                sm:text-3xl
                font-black
                text-white
              "
            >
              {displayName}
            </h1>

            {user.username && (
              <p className="mt-1 text-gray-400">@{user.username}</p>
            )}

            {user.email && (
              <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
                <HiEnvelope className="text-[#D4A017]" />
                {user.email}
              </div>
            )}
          </div>
        </div>

        {/* Edit button */}

        <button
          type="button"
          onClick={onEdit}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            px-5
            py-3
            rounded-xl
            bg-[#D4A017]
            text-[#17191D]
            font-bold
            hover:bg-[#e7b52b]
            transition
          "
        >
          <HiPencilSquare size={20} />
          Edit Profile
        </button>
      </div>
    </section>
  );
}

export default UserProfileCard;
