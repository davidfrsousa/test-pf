import { useState, useEffect } from "react";
import NavBar from "../partials/NavBar";
import axios from "../axios.js";
import LogForm from "../partials/Login/LoginForm.jsx";

function Login() {
  const [username, setUsername] = useState();
  const [user, setUser] = useState();
  const [pw, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    async function getLogin() {
      const res = await axios.get("http://localhost:3000/login");
      console.log(res.data.user);
      if (res.data.user) {
        setSuccess(true);
        setUsername(res.data.user);
      } else setSuccess(false);
      setAuth(true);
    }
    getLogin();
  }, []);

  return (
    <>
      <NavBar />
      {auth ? (
        success ? (
          <div>
            <h1>Logged in as {username}</h1>
          </div>
        ) : (
          <>
            <h1 className="text-center">Faça login para continuar</h1>
            <LogForm
              user={user}
              setUser={setUser}
              username={username}
              setUsername={setUsername}
              pw={pw}
              setPwd={setPwd}
              errMsg={errMsg}
              setErrMsg={setErrMsg}
              success={success}
              setSuccess={setSuccess}
              auth={auth}
              setAuth={setAuth}
            />
            <p style={{ color: "white" , fontSize:"2rem", textAlign: "center", backgroundColor:"red"}}>{errMsg}</p>
          </>
        )
      ) : null}
    </>
  );
}

export default Login;
