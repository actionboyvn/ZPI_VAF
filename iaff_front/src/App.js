import { React, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Documents from "./pages/Documents/Documents";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Assistant from "./pages/Assistant/Assistant";
import Accommodation from "./pages/Accommodation/Accommodation";
import Map from "./pages/Map/Map";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import ChangeProfile from "./pages/Profile/ChangeProfile";
import ChangePassword from "./pages/Profile/ChangePassword";
import Survey from "./pages/Survey/Survey";
import { isLogged } from "./utils/User/isLoggedAPI";
// import LoggedUserRoutes from "./routes/LoggedUserRoutes";
// import GuestRoutes from "./routes/GuestRoutes";
// import SurveyRoutes from "./routes/SurveyRoutes";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleIsLogged = async () => {
    try {
      const result = await isLogged();
      if (result) {
        console.log("User is logged in");
      } else {
        console.log("User is not logged in");
      }
      setIsLogin(result);
    } catch (error) {
      console.error("Error: " + error.message);
    }
  };

  return (
    <>
      <Navbar isLogin={isLogin} handleIsLogged={handleIsLogged} />
      <Routes>
        <Route element={<Home />} path="/" isLogin={isLogin} />
        <Route element={<Documents />} path="/documents" />
        <Route element={<Assistant />} path="/assistant" />
        <Route element={<Accommodation />} path="/accommodation" />
        <Route element={<Map />} path="/map" />
        {/* <Route element={<LoggedUserRoutes />}>
          <Route element={<ChangeProfile />} path="/changeprofile" />
          <Route element={<ChangePassword />} path="/changepassword" />
          <Route element={<SurveyRoutes />}>
            <Route element={<Survey />} path="/survey" />
          </Route>
        </Route>  
        <Route element={<GuestRoutes />}>
          <Route element={<Registration />} path="/signup" />
          <Route element={<Login />} path="/login" />
        </Route> */}
        <Route element={<Registration />} path="/signup" />
        <Route element={<Login />} path="/login" />
        <Route element={<ChangeProfile />} path="/changeprofile" />
        <Route element={<ChangePassword />} path="/changepassword" />
        <Route element={<Survey />} path="/survey" />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
