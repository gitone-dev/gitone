import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../pages/NotFoundPage";
import Profile from "../pages/profile";
import Session from "../pages/session";
import Users from "../pages/users";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/session/new", element: <Session.New /> },
  { path: "/users/new", element: <Users.New /> },
  { path: "/users/sent", element: <Users.Sent /> },
  { path: "/users/unactivate", element: <Users.Unactivate /> },
  { path: "/users/activate/:token", element: <Users.Activate /> },
  { path: "/users/forget-password", element: <Users.ForgetPassword /> },
  { path: "/users/reset-password/:token", element: <Users.ResetPassword /> },
  { path: "/users/confirm-email/:token", element: <Users.ConfirmEmail /> },
  { path: "/profile", element: <Profile.Index /> },
  { path: "/profile/account", element: <Profile.Account /> },
  { path: "/profile/emails", element: <Profile.Emails /> },
  { path: "/profile/password", element: <Profile.Password /> },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
