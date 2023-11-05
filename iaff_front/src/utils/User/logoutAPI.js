export async function logout() {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACK_END_URL + "users/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      return true;
    } else if (response.status === 401) {
      return false;
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    throw error;
  }
}
