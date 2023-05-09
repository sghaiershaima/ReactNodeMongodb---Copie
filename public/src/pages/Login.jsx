import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function Login() {
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

  login:{
    left: '50px'
},
  };
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/login");
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
        "http://localhost:4000/login",
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
        } 
        else {
          navigate("/allrecettes");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div style={styles.login} >
    
      <h2 style={styles.h1}>Login to your Account</h2>
      <form onSubmit={(e) => handleSubmit(e)} >
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
        <button  style={styles.button} className="form-control btn btn-primary submit px-3" type="submit">Submit</button>
        <span>
          Don't have an account ?<Link to="/register"> Register </Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default Login;