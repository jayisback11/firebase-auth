import "./App.css";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
function App() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const register = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const logout = () => {
    signOut(auth).catch((error) => {
      console.log(error);
    });
  };

  console.log(auth.currentUser);

  return (
    <div className="app">
      {auth.currentUser ? (
        <div>
          <h1>{auth.currentUser.email} IS SIGNED IN!</h1>
          <button onClick={logout}>LOG out</button>
        </div>
      ) : (
        <div>
          {isSignup ? <h1>Registering</h1> : <h1>Logging In</h1>}

          <>
            {isSignup ? (
              <>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={handleEmailChange}
                  value={email}
                />
                <input
                  type="Password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  value={password}
                />
                <button onClick={register}>SignUp</button>
                <button onClick={() => setIsSignup(false)}>X</button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <input
                  type="Password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button onClick={signIn}>Login</button>
                <button
                  onClick={() => {
                    setIsSignup(true);
                    setEmail("");
                    setPassword("");
                  }}
                >
                  Register
                </button>
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
}

export default App;
