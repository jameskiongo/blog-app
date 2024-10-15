import { useGetPostCommentsQuery } from "../../store";
import toast from "react-hot-toast";
import SingleComment from "./SingleComment";
function CommentList({ id }) {
  const { data, error, isFetching } = useGetPostCommentsQuery(id);

  let content;
  if (isFetching) {
    content = (
      <>
        <div className="flex w-full flex-row gap-4">
          <div className="skeleton h-32 w-full"></div>
        </div>
      </>
    );
  }
  // Handle errors
  else if (error) {
    toast.error("Failed to load Comment.");
  } else {
    if (data.length === 0) {
      content = <p>No comments yet.</p>;
    } else {
      content = data.map((post) => (
        <SingleComment key={post.id} comment={post} />
      ));
    }
  }
  return (
    <div>
      {/* Comment Section */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Comments</h3>
        {content}
      </section>
    </div>
  );
}

export default CommentList;
