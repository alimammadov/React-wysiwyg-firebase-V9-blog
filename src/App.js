import { useContext } from "react";

import "./App.css";
import Header from "./components/Header/Header";

import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";

import Posts from "./pages/Posts/Posts";
import Post from "./pages/Post/Post";
import Login from "./pages/auth/Login";
import Edit from "./pages/Edit/Edit";


import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

import { AuthContext } from "./contex/AuthContext";
import Notfound from "./pages/NotFound/Notfound";
import Footer from "./components/Footer/Footer";

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const Layout = () => {
    return (
      <div className="App">
        <Header />
        <Outlet />
        <Footer/>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/posts/:id",
          element: <Posts />,
        },
        {
          path: "/post/:id",
          element: <Post />,
        },
        {
          path: "/login",
          element: <Login />,
        },
       {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/edit",
          element: (
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          ),
        }  ,{
          path: "/edit/:id",
          element: (
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          ),
        },{
          path: "*",
          element: <Notfound/>,
        },
      ],
    },
  ]);



  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
