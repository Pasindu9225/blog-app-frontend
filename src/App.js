import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import News from "./pages/Home";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import BlogUpdate from "./pages/BlogUpdate";
import Submitblog from "./pages/Submitblog";
import Protected from "./components/Protected";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Error from "./pages/Errror";
import { useSelector } from "react-redux";
import useAutoLogin from "./hooks/useAutoLogin";
import Loader from "./components/Loader";

export default function App() {
  const isAuth = useSelector((state) => state.user.auth);
  const loading = useAutoLogin();
  return loading ? (
    <Loader text={""} />
  ) : (
    <>
      <BrowserRouter>
        <main className=" bg-white text-primary">
          <Header />
          <Routes>
            <Route path="/" exact element={<Blog />} />
            <Route path="/news" exact element={<News />} />
            <Route
              path="blog"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <Blog />
                </Protected>
              }
            />
            <Route
              path="blog/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <BlogDetails />
                </Protected>
              }
            />
            <Route
              path="blog-update/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <BlogUpdate />
                </Protected>
              }
            />
            <Route
              path="submit"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <Submitblog />
                </Protected>
              }
            />
            <Route path="signup" exact element={<Signup />} />
            <Route path="login" exact element={<Login />} />
            <Route path="logut" exact element={<div>Logout page</div>} />
            <Route path="*" exact element={<Error />} />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </>
  );
}
