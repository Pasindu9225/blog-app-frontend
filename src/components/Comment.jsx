const Comment = ({ comment }) => {
  const date = new Date(comment.createdAt).toDateString();

  return (
    <div className=" bgslate-500/5 text-[14px] font-[500] mb-2 px-5 py-2 rounded-full shadow-md">
      <div className=" flexBetween gap-x-4">
        <div className=" text-[15px] font-[600] text-black">
          {comment.authorUsername}
        </div>
        <div className="text-[14px] font-[500]">{date}</div>
      </div>
      <p className=" text-[14px] font-[500]">{comment.content}</p>
    </div>
  );
};

export default Comment;
