import App from "@/App";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        path: "/",
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
]);
