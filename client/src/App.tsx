import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetails from "./pages/CourseDetails";
import EnrollmentsPage from "./pages/EnrollmentsPage";
import LecturesPage from "./pages/LecturesPage";
import StudentProtected from "./utils/studentProtectedRoute";
import InstructorProtected from "./utils/instructorProtectedRoute";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { useLoadingBar } from "react-top-loading-bar";
// import { userUpdate } from "./store/slices/authSlice";
import { fetchUser } from "./services/authService"; 

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isLoading = false;
  const { start, complete } = useLoadingBar({ color: "#000000", height: 3 });
  const location = useLocation();

  useEffect(() => {
    isLoading ? start() : complete();
  }, [isLoading, start, complete]);

  useEffect(() => {
    start();
    return () => complete();
  }, [location.pathname, start, complete]);

  useEffect(() => {
    fetchUser(dispatch);
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Navbar />
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<CoursesPage />} />
        <Route path="/course/:id" element={<CourseDetails />} />

        {/* Protected Routes for Students */}
        <Route element={<StudentProtected />}>
          <Route path="/enrollments" element={<EnrollmentsPage />} />
          <Route path="/lectures/:courseId" element={<LecturesPage />} />
        </Route>

        {/* Protected Routes for Instructors */}
        <Route element={<InstructorProtected />}>
          <Route path="/instructor/courses" element={<CoursesPage instructorView />} />
          <Route path="/instructor/course/:id" element={<CourseDetails instructorView />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
};

export default App;
