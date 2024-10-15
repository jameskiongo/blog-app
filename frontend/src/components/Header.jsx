import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import { useNavigate } from "react-router-dom";
// import { useGetUserMeQuery } from "../store";

export default function Header() {
  // const { data } = useGetUserMeQuery();

  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const accessToken = localStorage.getItem("accessToken");

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    handleLogout();
    navigate("/login");
  };

  return (
    <div>
      <div>
        <div className="navbar container mx-auto max-w-6xl bg-base-100">
          <div className="navbar-start">
            <Link to="/" className="text-xl font-semibold p-0">
              Blog
            </Link>
          </div>

          <div className="navbar-end">
            <div className="flex items-center">
              {/* <p>{data.username}</p> */}
              {accessToken ? (
                <>
                  <Link
                    to="/add-post"
                    type="button"
                    // onClick={logout}
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    className="uppercase px-5 text-xs hover:text-info"
                  >
                    Add post
                  </Link>
                  {/* <p>{user.username}</p> */}

                  <div className="dropdown dropdown-bottom dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="uppercase px-5 text-xs hover:text-info"
                    >
                      Account
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                    >
                      <li>
                        <Link to={"/profile"} className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                            ></path>
                          </svg>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/logout" onClick={logout} className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
                            ></path>
                          </svg>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    type="button"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    className="uppercase px-2 text-xs hover:text-info"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    type="button"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    className="uppercase px-5 text-xs hover:text-info"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <Google /> */}
    </div>
  );
}
