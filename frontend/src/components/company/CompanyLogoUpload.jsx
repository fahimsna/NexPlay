import { useRef } from "react";

function CompanyLogoUpload({ preview, setPreview, setLogoFile }) {
  const inputRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setLogoFile(file);

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  return (
    <div className="mb-8">
      <label className="block mb-3 text-gray-300 font-medium">
        Company Logo
      </label>

      <div
        onClick={() => inputRef.current.click()}
        className="
          w-36
          h-36
          rounded-2xl
          border-2
          border-dashed
          border-gray-600
          bg-[#22252B]
          cursor-pointer
          hover:border-[#D4A017]
          transition
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >
        {preview ? (
          <img
            src={preview}
            alt="Logo Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center text-gray-400">
            <p className="text-4xl mb-2">+</p>

            <p className="text-sm">Upload Logo</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImage}
      />
    </div>
  );
}

export default CompanyLogoUpload;
