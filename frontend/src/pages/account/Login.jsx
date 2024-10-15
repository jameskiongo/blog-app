import Google from "../../components/Google";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../../store";
import toast from "react-hot-toast";
import { useAuth } from "../../utils/AuthProvider";

export default function Register() {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const [login, { isLoading }] = useLoginMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();
        const { access, refresh, user } = result;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("user", user.username);
        handleLogin(result.user);
        toast.success("Logged in successfully");

        navigate("/");
      } catch (error) {
        if (error.data) {
          error.data.non_field_errors?.forEach((err) => toast.error(err));
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
                Sign in to your Account
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
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-white border border-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="mt-1 text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <button type="submit" className="btn btn-info w-full btn-md">
                  {/* Create an account */}
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Login"
                  )}
                </button>

                <p className="">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Register here
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
