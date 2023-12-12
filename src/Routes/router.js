import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NewsContainer from "../pages/newsContainer/NewsContainer";
import NewsDetails from "../pages/newsDetails/NewsDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import PostNews from "../pages/postNews/PostNews";
import ControlUsers from "../pages/controlUsers/ControlUsers";
import SignUp from "../pages/authentication/signUp/SignUp";
import UserProfile from "../pages/userProfile/UserProfile";
import SignIn from "../pages/authentication/signIn/SignIn";
import UpdateNews from "../pages/updateNews/UpdateNews";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <NewsContainer />
            },
            {
                path: '/categories/:id',
                element: <NewsContainer />
            },
            {
                path: '/news-details/:id',
                element: <NewsDetails />
            },
            {
                path: '/sign-up',
                element: <SignUp />
            },
            {
                path: '/sign-in',
                element: <SignIn />
            },
            {
                path: '/user-profile',
                element: <UserProfile />,
            },
        ]
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute> <DashboardLayout /> </ProtectedRoute>,
        children: [
            {
                path: '/dashboard',
                element: <ControlUsers />,
            },
            {
                path: 'post-news',
                element: <PostNews />,
            },
            {
                path: 'update-news/:id',
                element: <UpdateNews />,
            },
        ]
    }
]);

export default router;