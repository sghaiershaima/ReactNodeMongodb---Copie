import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UserData() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [cookies, , removeCookie] = useCookies();
  const [newEmail, setNewEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/chek",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          setIsLoggedIn(true);
          setUserEmail(data.user);
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
        }
      }
    };
    verifyUser();
  }, [cookies, removeCookie]);
  const logOut = () => {
    removeCookie("jwt");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:4000/update-user",
        {
          email: newEmail,
        },
        {
          withCredentials: true,
        }
      );
      setUserEmail(data.user.email);
      setNewEmail("");
      toast(`User email updated to ${data.user.email}`, {
        theme: "dark",
      });

    } catch (error) {
      console.log(error);
      toast(`write ur new email please  `, {
        theme: "dark",
      });
    }
  };

  
  return (
    <div className="containeruser">
    {isLoggedIn ? (
      <>
        <p className="user-email">You are logged in as: {userEmail}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="new-email">New Email:</label>
            <input
              type="email"
              id="new-email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="new-email-input"
            />
          </div>
          <button type="submit" className="update-email-button">
            Update Email
          </button>
        </form>
        <button onClick={logOut} className="logout-button">
          Log out
        </button>
      </>
    ) : (
      <p className="not-logged-in-message">You are not logged in.</p>
    )}
    <ToastContainer />
  </div>
  
  );
}

export default UserData;
