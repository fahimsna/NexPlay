function AnalyticsCard({ title, value, subtitle, icon: Icon }) {
  return (
    <div
      className="
bg-[#1B1D22]
border
border-white/5
rounded-3xl
p-6
hover:border-[#D4A017]/40
transition
"
    >
      <div
        className="
flex
justify-between
items-center
"
      >
        <div>
          <p
            className="
text-gray-400
text-sm
"
          >
            {title}
          </p>

          <h2
            className="
text-3xl
font-bold
text-white
mt-3
"
          >
            {value}
          </h2>

          <p
            className="
text-gray-500
mt-2
"
          >
            {subtitle}
          </p>
        </div>

        <div
          className="
w-14
h-14
rounded-2xl
bg-[#D4A017]/20
flex
items-center
justify-center
"
        >
          <Icon
            size={28}
            className="
text-[#D4A017]
"
          />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard;
