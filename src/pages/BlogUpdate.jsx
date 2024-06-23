import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../components/Textinput";
import { getBlogById, updateBlog } from "../api/internal";

const BlogUpdate = () => {
  const { id: blogId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const author = useSelector((state) => state.user._id);

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const updateHandler = async () => {
    let data;
    if (photo.includes("http")) {
      data = {
        author,
        title,
        content,
        blogId,
      };
    } else {
      data = {
        author,
        title,
        content,
        photo,
        blogId,
      };
    }
    try {
      const response = await updateBlog(blogId, data);
      if (response.status === 200) {
        navigate("/blog");
      } else {
        setError("Failed to update the blog. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while updating the blog. Please try again.");
    }
  };

  //   useEffect(() => {
  //     async function getBlogDetails() {
  //       try {
  //         const commentsResponse = await getCommentById(blogId);

  //         if (commentsResponse.status === 200) {
  //           setComments(commentsResponse.data.data);
  //         }

  //         const blogResponse = await getBlogById(blogId);

  //         if (blogResponse.status === 200) {
  //           const fetchedBlog = blogResponse.data.blog;
  //           console.log(blogResponse.data.blog);

  //           setOwnsBlog(username === fetchedBlog.authorUsername);
  //           setBlog(fetchedBlog);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching blog details:", error);
  //       }
  //     }

  //     getBlogDetails();
  //   }, [blogId, username, reload]);

  useEffect(() => {
    async function getBlogDetails() {
      try {
        const response = await getBlogById(blogId);
        if (response.status === 200) {
          const fetchedBlog = response.data.blog;
          setTitle(fetchedBlog.title);
          setContent(fetchedBlog.content);
          setPhoto(fetchedBlog.photo);
        } else {
          setError("Failed to fetch blog details.");
        }
      } catch (err) {
        setError("An error occurred while fetching blog details.");
      } finally {
        setLoading(false);
      }
    }
    getBlogDetails();
  }, [blogId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="max_padd_container flex flex-col justify-center pt-40">
      <div className="flexCenter flex-col">
        <h4 className="bold-32 mb-6">Edit your blog</h4>
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
        <div className="flex flex-col gap-y-3 my-2 w-full max-w-[355px]">
          <div className="flex items-center gap-2">
            <p className="flex flex-1">Choose a photo</p>
            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/jpg, image/jpeg, image/png"
              onChange={getPhoto}
              className="text-[14px] font-[500] flex flex-[2]"
            />
          </div>
          {photo && (
            <img
              src={photo}
              alt="photoToUpload"
              height={55}
              width={77}
              className="rounded-md"
            />
          )}
        </div>
        <button
          onClick={updateHandler}
          className="btn_dark_rounded w-[333px] mt-4"
          disabled={title === "" || content === "" || photo === ""}
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default BlogUpdate;
