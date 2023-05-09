import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const styles = {
    h1: {
      color: 'red',
      fontSize: '24px',
      textAlign: 'center',
      margin: '0 auto',
      textAlign: 'center'
    },
    p: {
      color: 'blue',
      fontSize: '16px'
    },
    input:{
      width: '100%',
      padding:'10px 0',
      margin: '5px 0',
      outline: 'none',
      borderLeft: 0,
      borderTop: 0,
      borderRight: 0,
      borderBottom: '1px solid #999',
     background:'transparent'
    },
    button:{
      width: '85',
      padding:'10px 30px' ,
      cursor: 'pointer',
      display: 'block',
      margin: 'auto',
      background: 'linear-gradient(to right, #ff105f, #ffad06)',
      border:'0' ,
      outline: 'none'
    },
    span:{
      color: '#777',
      fontSize: '12px',
      bottom: '68px',
      position: 'absolute'
  },
  login:{
    left: '50px'
},
  };
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/register");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/login");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div style={styles.login}>
      <h2 style={styles.h1}>Register Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
            <input style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <input style={styles.input}
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button  style={styles.button} className="submit" type="submit">Submit</button>
        <span>
          Already have an account ?<Link to="/login"> Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;