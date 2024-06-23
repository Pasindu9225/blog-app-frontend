import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  deleteBlog,
  getBlogById,
  getCommentById,
  postComment,
} from "../api/internal";
import CommentList from "../components/CommentList";
import Loader from "../components/Loader";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [ownsBlog, setOwnsBlog] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  const { id: blogId } = useParams();
  console.log(blogId);

  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user._id);

  const deleteBlogHandler = async () => {
    const response = await deleteBlog(blogId);
    if (response.status === 200) {
      navigate("/blog   ");
    }
  };

  useEffect(() => {
    async function getBlogDetails() {
      try {
        const commentsResponse = await getCommentById(blogId);

        if (commentsResponse.status === 200) {
          setComments(commentsResponse.data.data);
        }

        const blogResponse = await getBlogById(blogId);

        if (blogResponse.status === 200) {
          const fetchedBlog = blogResponse.data.blog;
          console.log(blogResponse.data.blog);

          setOwnsBlog(username === fetchedBlog.authorUsername);
          setBlog(fetchedBlog);
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    }

    getBlogDetails();
  }, [blogId, username, reload]);

  const postCommentHandler = async () => {
    const data = {
      author: userId,
      blog: blogId,
      comment: newComment,
    };
    const response = await postComment(data);
    if (response.status === 201) {
      setNewComment("");
      setReload(!reload);
    }
  };

  if (blog.length === 0) {
    return <Loader text={"blog"} />;
  }

  return (
    <section className="max_padd_container flex items-start justify-center flex-col gap-8 pt-32 md:flex-row">
      <div className=" flex flex-1 flex-col p-4 bg-slate-500/5 ring-1 ring-slate-900/5 rounded-3xl overflow-hidden cursor-default transition-all duration-300 shadow-sm">
        <h4 className="bold-20 capitalize">{blog.title}</h4>
        <div className=" my-5">
          <p>
            @
            {blog.authorUsername +
              " on " +
              new Date(blog.createdAt).toDateString()}
          </p>
        </div>
        <div>
          <img src={blog.photo} alt={blog.title} className="mb-6 rounded-3xl" />
        </div>
        <p>{blog.content}</p>
        {ownsBlog && (
          <div className=" flexStart gap-2 my-6 ">
            <button
              onClick={() => navigate(`/blog-update/${blog._id}`)}
              className="btn_dark_rounded"
            >
              Edit
            </button>
            <button
              onClick={deleteBlogHandler}
              className="btn_secondary_rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div className=" flex flex-1">
        <div className="">
          <CommentList comments={comments} />
          <div className=" flexCenter gap-x-3">
            <input
              placeholder="Add a comment"
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
              type="text"
            />
            <button onClick={postCommentHandler} className="btn_dark_rounded">
              Post
            </button>
          </div>
        </div>
      </div>
      {/* <div>
        <h3>Comments</h3>
        <div>
          {comments.map((comment) => (
            <p key={comment._id}>{comment.comment}</p>
          ))}
        </div>
        <div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={postCommentHandler}>Post Comment</button>
        </div>
      </div> */}
    </section>
  );
};

export default BlogDetails;
