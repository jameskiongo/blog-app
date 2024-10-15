import { redirect } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import toast from "react-hot-toast";
export const handleGoogleCallback = async ({ request }) => {
  // const { handleLogin } = useAuth();

  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code) {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/google/",
        {
          method: "POST",
          body: JSON.stringify({ code }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const jwtData = await response.json();
      const { access, refresh, user } = jwtData;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("user", JSON.stringify(user.username));
      toast.success("Logged in successfully");
      return redirect("/");
    } catch (err) {
      console.error(err);
      throw new Response("Bad request", { status: 400 });
    }
  }

  throw new Response("Not Found", { status: 404 });
};
