import { formatDistanceToNow } from "date-fns";
import { useGetSinglePostQuery } from "../../store";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function SinglePost() {
  const { id } = useParams(); // Get post ID from the URL parameters
  const token = localStorage.getItem("accessToken");

  // Format time ago
  function timeSince(date) {
    const result = formatDistanceToNow(new Date(date), { addSuffix: true });
    return result.replace(/^about\s/, "");
  }

  // Fetch single post data using the ID
  const { data: post, error, isFetching } = useGetSinglePostQuery(id);

  // Loading skeleton
  let content;
  if (isFetching) {
    content = (
      <>
        <div className="flex w-full flex-row gap-4">
          <div className="skeleton h-32 w-full"></div>
        </div>
        <div className="flex w-full flex-row gap-4">
          <div className="skeleton h-32 w-full"></div>
        </div>
        <div className="flex w-full flex-row gap-4">
          <div className="skeleton h-32 w-full"></div>
        </div>
      </>
    );
  }
  // Handle errors
  else if (error) {
    toast.error("Failed to load post.");
  }
  // Display post data when available
  else {
    content = (
      <div className=" mx-auto w-full">
        {/* Blog Post Section */}
        <article className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-5 text-gray-500">
            <div className="flex items-center space-x-4">
              <img
                className="w-10 h-10 rounded-full"
                // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                src={
                  post.user_avatar ||
                  "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
                }
                alt="Author Avatar"
              />
              <span className="font-medium">{post.user_email}</span>
            </div>
            <span className="text-sm">{timeSince(post.created_at)}</span>
          </div>

          <h2 className="text-3xl font-bold mb-4">{post.title}</h2>

          <p className="text-gray-700 mb-4">{post.content}</p>
        </article>
        {token ? (
          <CommentForm id={post.id} />
        ) : (
          <p className="text-gray-700 text-center my-4">
            <Link className="underline" to={"/login"}>
              Login
            </Link>
            {""} to comment
          </p>
        )}

        <CommentList id={post.id} />
      </div>
    );
  }

  return (
    <>
      <section className="bg-white container mx-auto max-w-6xl">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-1">{content}</div>
        </div>
      </section>
    </>
  );
}

export default SinglePost;
