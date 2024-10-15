import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
function HomeCard({ post }) {
  function timeSince(date) {
    const result = formatDistanceToNow(new Date(date), { addSuffix: true });
    return result.replace(/^about\s/, "");
  }

  return (
    <>
      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md ">
        <div className="flex justify-between items-center mb-5 text-gray-500">
          <div className="flex items-center space-x-4">
            <img
              className="w-7 h-7 rounded-full"
              src={
                post.user_avatar ||
                "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
              }
              referrerPolicy="no-referrer"
              alt="Author Avatar"
            />
            <Link to={`/profile/${post.user_details.username}`}>
              <span className="font-medium capitalize hover:underline">
                {post.user_details.username}
              </span>
            </Link>
          </div>

          <span className="text-sm capitalize">
            {timeSince(post.created_at)}
          </span>
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          <a href="#" className="capitalize">
            {post.title}
          </a>
        </h2>
        <p className="mb-5 font-light text-gray-500 ">
          {post.content}
          {/* Static websites are now used to bootstrap lots of websites and are */}
          {/* becoming the basis for a variety of tools that even influence both web */}
          {/* designers and developers influence both web designers and developers. */}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* like and comment icon */}
            <div className="relative inline-flex">
              <button
                className="flex items-center rounded-md px-2  text-center text-sm  transition-all"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z"
                  ></path>
                </svg>
              </button>
              <span className="absolute top-0.5 right-0.5 grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full py-1 px-1 text-xs font-medium leading-none content-['']">
                {post.likes}
              </span>
            </div>
            <div className="relative inline-flex">
              <Link
                to={`/post/${post.id}`}
                className="flex items-center rounded-md px-2  text-center text-sm  transition-all"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M8 13c3.866 0 7-2 7-6s-3.134-6-7-6s-7 2-7 6c0 2.16.914 3.737 2.364 4.73l.09 2.161a1.157 1.157 0 0 0 1.857.872l2.322-1.77Q7.816 13 8 13"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
              <span className="absolute top-0.5 right-0.5 grid min-h-[24px] min-w-[24px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full py-1 px-1 text-xs font-medium leading-none content-['']">
                {post.comments.length}
              </span>
            </div>
          </div>
          <Link
            to={`/post/${post.id}`}
            className="inline-flex items-center font-medium hover:underline"
          >
            Read more
            <svg
              className="ml-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </article>
    </>
  );
}

export default HomeCard;
