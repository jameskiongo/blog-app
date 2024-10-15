function TestPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Blog Post Section */}
      <article className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-5 text-gray-500">
          <div className="flex items-center space-x-4">
            <img
              className="w-10 h-10 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
              alt="Author Avatar"
            />
            <span className="font-medium">John Doe</span>
          </div>
          <span className="text-sm">2 hours ago</span>
        </div>

        <h2 className="text-3xl font-bold mb-4">Blog Post Title</h2>

        <p className="text-gray-700 mb-4">
          This is the content of the blog post. It can be several paragraphs
          long and include details, examples, or whatever the blog post is
          about. You can extend this as needed to match your actual post
          content. This is the second part of the blog content. You can describe
          more here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </article>

      {/* Comment Form */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Leave a Comment</h3>
        <form className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Comment
            </label>
            <textarea
              id="comment"
              rows="4"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write your comment here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none"
          >
            Post Comment
          </button>
        </form>
      </section>

      {/* Comment Section */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Comments</h3>

        {/* Single Comment */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-4">
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                alt="User Avatar"
              />
              <span className="font-medium">Jane Doe</span>
            </div>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </div>
          <p className="text-gray-700">
            This is a sample comment. Users can share their thoughts here after
            reading the blog post.
          </p>
        </div>

        {/* Another Comment */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-4">
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                alt="User Avatar"
              />
              <span className="font-medium">John Smith</span>
            </div>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <p className="text-gray-700">
            This is another comment. Users can engage with the post and leave
            their opinions here.
          </p>
        </div>
      </section>
    </div>
  );
}

export default TestPage;
