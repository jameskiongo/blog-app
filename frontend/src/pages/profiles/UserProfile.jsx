import { useGetUserMeQuery } from "../../store";
import toast from "react-hot-toast";
import ProfileForm from "./ProfileForm";
import { useState } from "react";
function UserProfile() {
  const username = localStorage.getItem("user").replace(/"/g, "");
  const [showForm, setShowForm] = useState(false);
  const toggleForm = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  const { data: user, error, isFetching } = useGetUserMeQuery(username);

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
      </>
    );
  }
  // Handle errors
  else if (error) {
    toast.error("Failed to load ");
  }
  // Display post data when available
  else {
    content = (
      <div>
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src={
            user.avatar_url ||
            "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
          }
          alt="Profile picture"
        />
        <h2 className="flex items-center justify-center text-center text-2xl capitalize font-semibold mt-3">
          {user.username}
        </h2>
        <div className="mt-5">
          <div className="text-xl flex items-center justify-center text-center font-semibold">
            Bio
            {user.bio ? (
              <a href="" onClick={toggleForm}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
                  ></path>
                </svg>
              </a>
            ) : (
              <a href="" onClick={toggleForm}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
                  ></path>
                </svg>
              </a>
            )}
          </div>
          {showForm ? (
            <ProfileForm
              bio={user.bio}
              name={user.username}
              showForm={showForm}
              setShowForm={setShowForm}
            />
          ) : (
            <p className="flex items-center justify-center text-gray-600 text-center mt-2">
              {user.bio || "No bio available."}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">{content}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
