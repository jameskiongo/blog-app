import { useCreatePostCommentMutation } from "../../store";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
function CommentForm({ id }) {
  const [createComment, { isLoading }] = useCreatePostCommentMutation();
  const formik = useFormik({
    initialValues: {
      id: id,
      content: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Required"),
    }),
    onSubmit: async (values, actions) => {
      try {
        await createComment(values);
        toast.success("Comment added");
        actions.resetForm();
      } catch (error) {
        if (error.data) {
          toast.error("An unexpected error occurred.");
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    },
  });

  return (
    <div>
      <section className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Leave a Comment</h3>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
        >
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Comment
            </label>
            <textarea
              name="content"
              id="content"
              rows="4"
              onChange={formik.handleChange}
              value={formik.values.content}
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write your comment here..."
            />
            {formik.touched.content && formik.errors.content ? (
              <div className="mt-1 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                {formik.errors.content}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Comment"
            )}
          </button>
        </form>
      </section>
    </div>
  );
}

export default CommentForm;
