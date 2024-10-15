import Google from "../../components/Google";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../../store";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password1: "",
      password2: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      last_name: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password1: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      password2: Yup.string()
        .label("password2")
        .required()
        .oneOf([Yup.ref("password1"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await register(values).unwrap();
        toast.success("Account created successfully");
        navigate("/login");
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
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </h1>
              <Google />
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  OR
                </p>
              </div>

              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={formik.handleSubmit}
              >
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      className="bg-white border border-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
                      placeholder="Enter First Name"
                      onChange={formik.handleChange}
                      value={formik.values.first_name}
                    />
                    {formik.touched.first_name && formik.errors.first_name ? (
                      <div className="mt-1 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {formik.errors.first_name}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      className="bg-white border border-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
                      placeholder="Enter Last Name"
                      onChange={formik.handleChange}
                      value={formik.values.last_name}
                    />
                    {formik.touched.last_name && formik.errors.last_name ? (
                      <div className="mt-1 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        {formik.errors.last_name}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-white border border-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
                    placeholder="name@company.com"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="mt-1 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="password1"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password1"
                    id="password"
                    placeholder="••••••••"
                    className="bg-white border border-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
                    onChange={formik.handleChange}
                    value={formik.values.password1}
                  />
                  {formik.touched.password1 && formik.errors.password1 ? (
                    <div className="mt-1 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {formik.errors.password1}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="password2"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-white border border-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
                    onChange={formik.handleChange}
                    value={formik.values.password2}
                  />
                  {formik.touched.password2 && formik.errors.password2 ? (
                    <div className="mt-1 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {formik.errors.password2}
                    </div>
                  ) : null}
                </div>
                <button type="submit" className="btn btn-info w-full btn-md">
                  {/* Create an account */}
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Create an account"
                  )}
                </button>
                <p className="">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
