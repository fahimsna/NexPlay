import { HiMegaphone } from "react-icons/hi2";

function EmptyState({ onCreate }) {
  return (
    <div
      className="
      bg-[#393E46]
      border
      border-dashed
      border-white/10
      rounded-3xl
      p-12
      text-center
      "
    >
      <div
        className="
        w-24
        h-24
        mx-auto
        rounded-full
        bg-[#222831]
        flex
        items-center
        justify-center
        "
      >
        <HiMegaphone size={48} className="text-[#D4A017]" />
      </div>

      <h2
        className="
        mt-6
        text-2xl
        font-bold
        text-white
        "
      >
        No Advertisements Yet
      </h2>

      <p
        className="
        mt-3
        text-gray-400
        max-w-md
        mx-auto
        leading-7
        "
      >
        You haven't created any advertisements yet. Create your first
        advertisement to promote your entertainment content.
      </p>

      <button
        onClick={onCreate}
        className="
        mt-8
        bg-[#D4A017]
        text-black
        px-8
        py-3
        rounded-xl
        font-bold
        hover:opacity-90
        transition
        "
      >
        Create Advertisement
      </button>
    </div>
  );
}

export default EmptyState;
