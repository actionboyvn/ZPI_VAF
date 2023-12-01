import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { changeProfile } from "../../utils/User/changeProfileAPI";
import { getUserData } from "../../utils/User/getUserDataAPI";

import Loading from "../../components/Spinner/Loading";

import { COPYRIGHT } from "../../constants/mainConstants";
import {
  CHANGE_PROFILE_FAILED,
  CHANGE_PROFILE_SUCCESSFUL,
} from "../../constants/alertMessagesConstants";
import {
  ERROR_NAME_VALIDATION,
  ERROR_EMAIL_VALIDATION,
  ERROR_CHANGE_PROFILE,
} from "../../constants/validationErrorsConstants";

const ChangeProfile = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email_address: "",
    password: "",
    change_failed: false,
  });

  const redirectToSurvey = () => {
    navigate("/survey");
  };

  const validateName = (value) => {
    const pattern = /^[A-Za-z-]+$/;
    if (value.length < 2 || value.length > 100 || !pattern.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: ERROR_NAME_VALIDATION,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "",
      }));
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length < 3 || value.length > 50 || !emailRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: ERROR_EMAIL_VALIDATION,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getUserData().then((result) => {
        setFormData((formData) => ({
          ...formData,
          name: result.name,
          email_address: result.email,
        }));
        setIsLoading(false);
      });
    }, 500);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, change_failed: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email_address, password } = formData;
    if (
      !formData.change_failed &&
      formData.password !== "" &&
      isFieldsFilledValidate()
    ) {
      try {
        const result = await changeProfile(name, email_address, password);
        if (result) {
          alert(CHANGE_PROFILE_SUCCESSFUL);
          navigate(0);
        } else {
          alert(CHANGE_PROFILE_FAILED);
          setFormData({ ...formData, change_failed: true });
        }
      } catch (error) {
        console.error("Error with changing profile data: ", error.message);
      }
    } else {
      setFormData({ ...formData, change_failed: true });
    }
  };

  const isFieldsFilledValidate = () => {
    if (errors.name || errors.email) {
      return false;
    } else if (formData.name === "" || formData.email === "") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="flex flex-col border rounded-md border-accent-900 w-2/5 max-xl:w-3/5 max-lg:w-3/4 mt-6">
        <div className="flex flex-col items-center justify-center">
          {/* Header for Change Profile Data */}
          <div className="flex items-center justify-between w-full px-6 pt-6 border-b mb-4">
            <p className="text-2xl text-primary-500 m-4 max-lg:text-lg">
              Account Settings
            </p>
            <button
              className="py-2 px-6 text-lg max-lg:text-base max-sm:text-xs font-bold bg-primary-900 hover:bg-primary-500 text-background-color rounded-md focus:outline-none focus:shadow-outline ease-in-out duration-200"
              onClick={redirectToSurvey}
            >
              Survey &#8594;
            </button>
          </div>
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-80 m-3">
              <Loading width={80} height={80} radius={12} />
            </div>
          ) : (
            <form className="w-2/3 max-md:w-3/4" onSubmit={handleSubmit}>
              <div className="mb-3 flex flex-col space-y-4">
                {/* Change Name Input */}
                <div className="flex flex-col space-y-2">
                  <p
                    className={`${
                      errors.name ? "text-error-900" : "text-primary-900"
                    }  font-bold`}
                  >
                    Your name
                  </p>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => {
                      handleChange(e);
                      if (errors.name) {
                        validateName(e.target.value);
                      }
                    }}
                    onBlur={(e) => {
                      let inputValue = e.target.value;
                      if (!errors.name) {
                        validateName(inputValue);
                      }
                    }}
                    className={`${
                      errors.name
                        ? "border-error-900 text-error-900"
                        : "border-accent-700 text-text-color focus:border-primary-900"
                    } border leading-tight focus:outline-none text-lg max-2xl:text-base rounded-lg w-full py-2 px-4 focus:shadow-outline`}
                  />

                  {/* Change Name Error */}
                  {errors.name && (
                    <p className="text-error-900 text-base max-2xl:text-sm text-center">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Change Email Input */}
                <div className="flex flex-col space-y-2">
                  <p
                    className={`${
                      errors.email ? "text-error-900" : "text-primary-900"
                    }  font-bold`}
                  >
                    Your email
                  </p>
                  <input
                    type="text"
                    name="email_address"
                    value={formData.email_address}
                    onChange={(e) => {
                      handleChange(e);
                      if (errors.email) {
                        validateEmail(e.target.value);
                      }
                    }}
                    onBlur={(e) => {
                      let inputValue = e.target.value;
                      if (!errors.email) {
                        validateEmail(inputValue);
                      }
                    }}
                    className={`${
                      errors.email
                        ? "border-error-900 text-error-900"
                        : "border-accent-700 text-text-color focus:border-primary-900"
                    } border leading-tight focus:outline-none text-lg max-2xl:text-base rounded-lg w-full py-2 px-4 focus:shadow-outline`}
                  />

                  {/* Change Email Error */}
                  {errors.email && (
                    <p className="text-error-900 text-base max-2xl:text-sm text-center">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Current Password Input */}
                <div className="flex flex-col space-y-2">
                  <p className="text-primary-900 font-bold">Current password</p>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border border-accent-700 text-text-color focus:border-primary-900 leading-tight focus:outline-none text-lg max-2xl:text-base rounded-lg w-full py-2 px-4 focus:shadow-outline"
                  />
                </div>
              </div>

              {/* Form Submit Error */}
              <p
                className={`text-error-900 w-full text-center ${
                  !formData.change_failed ? "hidden" : ""
                }`}
              >
                {ERROR_CHANGE_PROFILE}
              </p>

              {/* Confirm Button */}
              <button
                className="bg-primary-900 w-full hover:bg-primary-500 text-background-color font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline mt-3 mb-3 ease-in-out duration-200"
                type="submit"
              >
                Update profile
              </button>

              {/* Link to Change Password */}
              <div className="flex text-center mb-3">
                <Link
                  className="text-primary-500 text-center w-full hover:text-primary-900 ease-in-out duration-200"
                  to="/change-password"
                >
                  Change password here
                </Link>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-accent-700 mb-3">{COPYRIGHT}</div>
      </div>
    </div>
  );
};

export default ChangeProfile;
