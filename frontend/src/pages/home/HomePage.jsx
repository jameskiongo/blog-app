import HomeCard from "../../components/HomeCard";
import { useGetPostsQuery } from "../../store";
import toast from "react-hot-toast";

function HomePage() {
  const { data, error, isFetching } = useGetPostsQuery();

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
  } else if (error) {
    // content = <p>{error}</p>;
    toast.error(error);
  } else {
    content = data.map((post) => <HomeCard key={post.id} post={post} />);
  }
  return (
    <>
      <section className="bg-white container mx-auto max-w-6xl">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">
              Posts
            </h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">{content}</div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
