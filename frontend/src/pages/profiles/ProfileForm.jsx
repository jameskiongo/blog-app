import { useFormik } from "formik";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../../store";
import toast from "react-hot-toast";
function ProfileForm({ bio, name, setShowForm, showForm }) {
  // const navigate = useNavigate();
  const [update, { isLoading }] = useUpdateUserMutation();
  const formik = useFormik({
    initialValues: {
      slug: name,
      bio: bio || "",
    },
    validationSchema: Yup.object({
      bio: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        await update(values);
        toast.success("Bio updated successfully");
        setShowForm(!showForm);
        window.location.reload();
      } catch (error) {
        if (error.data) {
          error.data.non_field_errors?.forEach((err) => toast.error(err));
          Object.values(error.data).forEach((errors) => {
            errors.forEach((err) => toast.error(err));
          });
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    },
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center">
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="flex flex-col items-center"
        >
          <textarea
            type="text"
            rows="2"
            name="bio"
            onChange={formik.handleChange}
            value={formik.values.bio}
            id="bio"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
            placeholder={bio || "Enter Bio"}
          />
          <button type="submit" className="btn mt-3">
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
