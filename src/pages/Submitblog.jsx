import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/Textinput";
import { submitBlog } from "../api/internal";

const Submitblog = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();
  const author = useSelector((state) => state.user._id);

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const submitHandler = async () => {
    const data = {
      author,
      title,
      content,
      photo,
    };
    const response = await submitBlog(data);

    if (response.status === 201) {
      navigate("/blog");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 flex flex-col justify-center pt-40">
      <div className="flex flex-col items-center">
        <h4 className="text-2xl font-bold mb-6">Create a blog</h4>
        <TextInput
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Your content goes here..."
          maxLength={400}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="py-3 px-7 m-2 outline-none w-full max-w-[355px] h-full min-h-56 bg-[#f7f7f7] rounded-3xl resize-none"
        />
        <div className="flex flex-col gap-y-3 my-2 w-full max-w-md">
          <div className="flex items-center gap-2">
            <p className="flex-1">Choose a photo</p>
            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/jpg, image/jpeg, image/png"
              onChange={getPhoto}
              className="flex-2 text-sm font-medium"
            />
          </div>
        </div>
        {photo !== "" && (
          <img
            src={photo}
            alt="photoToUpload"
            className="w-24 h-auto rounded-md"
          />
        )}
        <button
          className="bg-blue-600 text-white rounded-lg py-2 px-6 mt-4 w-full max-w-xs disabled:bg-gray-600"
          disabled={title === "" || content === "" || photo === ""}
          onClick={submitHandler}
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default Submitblog;
