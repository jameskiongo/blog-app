import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../../store";
import toast from "react-hot-toast";

const validFileExtensions = {
  image: ["jpg", "png", "jpeg", "webp"],
};

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}

export default function AddPost() {
  const navigate = useNavigate();
  const [create, { isLoading }] = useCreatePostMutation();
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      // thumbnail: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      content: Yup.string().required("Required"),
      // thumbnail: Yup.mixed().test(
      //   "is-valid-type",
      //   "Not a valid image type",
      //   (value) =>
      //     !value || isValidFileType(value && value.toLowerCase(), "image"),
      // ),
    }),
    onSubmit: async (values) => {
      try {
        const result = await create(values);
        toast.success("Post created successfully");
        navigate("/");
      } catch (error) {
        if (error.data) {
          // error.data.non_field_errors?.forEach((err) => toast.error(err));
          // Object.values(error.data).forEach((errors) => {
          //   errors.forEach((err) => toast.error(err));
          // });
          toast.error("An unexpected error occurred.");
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    },
  });

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="bg-white border border-black text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
                    placeholder="Title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <div className="mt-1 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {formik.errors.title}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="content"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Content
                  </label>
                  <textarea
                    type="text"
                    name="content"
                    id="content"
                    rows="4"
                    placeholder="Start Writing"
                    className="bg-white border border-black text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
                    onChange={formik.handleChange}
                    value={formik.values.content}
                  />
                  {formik.touched.content && formik.errors.content ? (
                    <div className="mt-1 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {formik.errors.content}
                    </div>
                  ) : null}
                </div>
                <button type="submit" className="btn w-full btn-md">
                  {/* Create an account */}
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Add Post"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
