import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
function SingleComment({ comment }) {
  function timeSince(date) {
    const result = formatDistanceToNow(new Date(date), { addSuffix: true });
    return result.replace(/^about\s/, "");
  }

  return (
    <div>
      <div
        key={comment.id}
        className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-4"
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-4">
            <img
              className="w-8 h-8 rounded-full"
              // src={comment.user_avatar || "https://via.placeholder.com/50"}
              src={
                comment.user_avatar ||
                "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
              }
              alt="User Avatar"
            />
            <Link to={`/profile/${comment.user_details.username}`}>
              <span className="font-medium capitalize hover:underline">
                {comment.user_details.username}
                {/* hello */}
              </span>
            </Link>
          </div>
          <span className="text-sm text-gray-500">
            {timeSince(comment.created_at)}
          </span>
        </div>
        <p className="text-gray-700">{comment.content}</p>
      </div>
    </div>
  );
}

export default SingleComment;
