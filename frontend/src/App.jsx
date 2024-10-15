import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/home/HomePage";
import { handleGoogleCallback } from "./pages/google/googleLoader";
import { Toaster } from "react-hot-toast";
import Register from "./pages/account/Register";
import Login from "./pages/account/Login";
import Blog from "./pages/protected/Blog";
import PrivateRoutes from "./utils/ProtectedRoutes";
import { AuthProvider } from "./utils/AuthProvider";
import AddPost from "./pages/protected/AddPost";
import SinglePost from "./pages/post/singlePost";
import TestPage from "./components/TestPage";
import Profile from "./pages/profiles/Profile";
import UserProfile from "./pages/profiles/UserProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/post/:id" element={<SinglePost />} />
      <Route path="/profile/:slug" element={<Profile />} />
      <Route
        path="/logout"
        // loader={Logout}
        element={<Navigate to="/login" replace />}
      />
      <Route element={<PrivateRoutes />}>
        {/* All other routes that you want to protect will go inside here */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>
      <Route path="google/callback" loader={handleGoogleCallback} />
    </Route>,
  ),
);

function App() {
  return (
    <div>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
