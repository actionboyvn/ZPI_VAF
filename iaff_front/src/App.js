import { React, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { isLogged } from "./utils/User/isLoggedAPI";
import { isFilledSurvey } from "./utils/Survey/isFilledSurveyAPI";

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
import DocumentPage from "./pages/DocumentPage/DocumentPage";
import ChangeSurvey from "./pages/Profile/ChangeSurvey";

import LoggedUserRoutes from "./routes/LoggedUserRoutes";
import GuestRoutes from "./routes/GuestRoutes";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleIsLogged = async () => {
      try {
        const result = await isLogged();
        setIsLogin(result);
      } catch (error) {
        console.error("Error in Login: " + error.message);
      }
    };

    handleIsLogged();
  }, []);

  useEffect(() => {
    const handleIsFilled = async () => {
      try {
        const result = await isFilledSurvey();
        setIsFilled(result);
      } catch (error) {
        console.error(
          "Error in checking is survey was filled: " + error.message
        );
      }
    };

    setTimeout(() => {
      if (isLogin) {
        handleIsFilled();
      }
    }, 500);
  }, [isLogin]);

  return (
    <div>
      <Navbar isLogin={isLogin} />
      <Routes>
        <Route
          element={<Home isLogin={isLogin} isSurvey={isFilled} />}
          path="/"
        />
        <Route
          element={<Documents isLogin={isLogin} isSurvey={isFilled} />}
          path="/documents"
        />
        <Route element={<Assistant />} path="/assistant" />
        <Route element={<Accommodation />} path="/accommodation" />
        <Route element={<Map />} path="/map" />
        <Route element={<DocumentPage />} path="documents/:id" />

        <Route element={<LoggedUserRoutes isLogin={isLogin} />}>
          <Route element={<ChangeProfile />} path="/change-profile" />
          <Route element={<ChangePassword />} path="/change-password" />

          <Route
            element={isFilled ? <ChangeSurvey /> : <Survey />}
            path="/survey"
          />
        </Route>

        <Route element={<GuestRoutes isLogin={isLogin} />}>
          <Route element={<Registration />} path="/sign-up" />
          <Route element={<Login />} path="/login" />
        </Route>
      </Routes>
      {location.pathname !== "/assistant" && <Footer />}
    </div>
  );
};

export default App;
