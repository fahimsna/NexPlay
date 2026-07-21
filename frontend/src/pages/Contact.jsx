function Contact() {
  return (
    <section
      className="
      min-h-screen
      bg-[#17191D]
      text-white
      pt-32
      pb-20
      "
    >
      <div
        className="
        max-w-3xl
        mx-auto
        px-5
        sm:px-8
        "
      >
        <h1
          className="
          text-center
          text-4xl
          sm:text-5xl
          font-black
          "
        >
          Contact
          <span className="text-[#D4A017]"> NexPlay</span>
        </h1>

        <div
          className="
          mt-10
          bg-[#24272D]
          border
          border-white/10
          rounded-3xl
          p-8
          "
        >
          <p className="text-gray-400">
            Have questions, partnership requests or feedback? Contact our team.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <h3 className="font-semibold">Email</h3>

              <p className="text-gray-400">support@nexplay.com</p>
            </div>

            <div>
              <h3 className="font-semibold">Location</h3>

              <p className="text-gray-400">NexPlay Entertainment Platform</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
