import { useParams } from "react-router-dom";
import { useGetProfileQuery } from "../../store";
import toast from "react-hot-toast";
function Profile() {
  const { slug } = useParams();
  const { data: profile, error, isFetching } = useGetProfileQuery(slug);

  // Loading skeleton
  let content;
  if (isFetching) {
    content = (
      <>
        <div className="flex w-full items-center flex-col gap-4">
          <div className="skeleton h-32 w-32 shrink-0 rounded-full"></div>
          <div className="skeleton h-4 w-2/4"></div>
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
      <div>
        <img
          className="w-32 h-32 rounded-full mx-auto"
          // src="https://picsum.photos/200"
          src={
            profile.avatar_url ||
            "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
          }
          alt="Profile picture"
        />
        <h2 className="text-center text-2xl font-semibold mt-3">
          {profile.username}
        </h2>
        <div className="mt-5">
          <h3 className="text-xl text-center font-semibold">Bio</h3>
          <p className="text-gray-600 text-center mt-2">
            {profile.bio || "No bio available."}
          </p>
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

export default Profile;
