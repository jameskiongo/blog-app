const googleCallbackUri = import.meta.env.VITE_GOOGLE_CALLBACK_URI;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
function Google() {
  const googleSignInUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleCallbackUri}&prompt=consent&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&access_type=offline`;

  return (
    <div>
      {/* <a classNameName="" href={googleSignInUrl}> */}
      {/*   Sign in with Google */}
      {/* </a> */}
      <a
        href={googleSignInUrl}
        className="bg-white border border-black text-sm rounded-lg focus:bg-blue-50 active:bg-blue-100 hover:border-blue-400 block w-full p-2.5 text-black"
      >
        <div className="relative flex items-center space-x-4 justify-center">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="absolute left-0 w-5"
            alt="google logo"
          />
          <a className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
            Continue with Google
          </a>
        </div>
      </a>
    </div>
  );
}

export default Google;
