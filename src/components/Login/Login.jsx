//firebase
import { db, auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc, collection } from "firebase/firestore";
// hooks & react
import { useReducer, useState, useEffect } from "react";
import { useRouter } from "next/router";
//styles
import styles from "./Login.module.scss";
//Components
import ErrorLoginModal from "../Errorsignmodal/ErrorLoginModal";

const Login = () => {
  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [user, setUser] = useState(null);
  const [swipe, setSwipe] = useState(false);
  const [toggleLogin, setToggleLogin] = useState(true);
  const [errorSignModal, setErrorSignModal] = useState(false);

  const router = useRouter();

  const createUserSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, newEmail, newPassword)
      .then((uC) => {
        

        setDoc(doc(db, "cart", `${uC.user?.uid}`), {
          id: uC.user?.uid,
          name: uC.user?.email,
          cart: [],
          purchases: [],
          favourites: [],
        });
        router.push("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorSignModal(true);
        window.setTimeout(() => {
          
        }, 5000);
        // ..
      });

    setEmail("");
    setPassword("");
  };

  const logInSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

  
        router.push("/");
 
      })
      .catch((error) => {
        setErrorSignModal(true);
        window.setTimeout(() => {
        setErrorSignModal(false);
        }, 5000);
        // ..
      });

    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (us) => {
      if (us) {
        setUser(us);
       
        let uuid = us.uid;
        localStorage.setItem("user", uuid);
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
  }, []);

  const logOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className={`${styles.Login}`}>
        <div className={`${styles.Login_swipe} ${swipe && styles.showSign}`}>
          <div className={styles.welcomeText}>
            {swipe ? (
              <h1 className={styles.h1_content}>Hi friend!</h1>
            ) : (
              <h1>Welcome Back!</h1>
            )}
            <p>
              {swipe
                ? "Join us and explore our products"
                : "Log in to your account and explore news"}
            </p>
            <div className={styles.swipeLinks}>
              <p>
                {swipe
                  ? "If you have an account"
                  : "If you do not have an account"}
              </p>
              <button
                onClick={() => setSwipe((prev) => !prev)}
                className={`${styles.swipeBtn} ${
                  swipe && styles.swipeBtnLight
                }`}
              >
                {swipe ? "Go to Log in" : "Go to Sign Up"}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.sign_container}>
          <form
            action=""
            className={`${styles.sign} ${!swipe && styles.signShowHidden}`}
            onSubmit={(e) => createUserSubmit(e)}
          >
            <label htmlFor="">Sign-up</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Email"
              value={newEmail}
              className={styles.sign_input}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <input
              type="password"
              name=""
              id=""
              placeholder="Password"
              value={newPassword}
              className={styles.sign_input}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input type="submit" value="click" className={styles.signSubmit} />
          </form>
          {errorSignModal && <ErrorLoginModal />}
        </div>
        <div
          className={`${styles.log_container}  ${
            toggleLogin && styles.LoginSwipe
          }`}
        >
          <form
            action=""
            className={`${styles.log} ${swipe && styles.logShowHidden}`}
            onSubmit={(e) => logInSubmit(e)}
          >
            <label htmlFor="">Log-in</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input
              type="password"
              name=""
              id=""
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="Log-in" className={styles.logSubmit} />
          </form>
          {errorSignModal && <ErrorLoginModal logInSide/>}
        </div>
        <div className={styles.mobileSwitch}>
          <p>If you {toggleLogin ? "don't have" : "have"} an account </p>
          <button onClick={() => setToggleLogin((prev) => !prev)}>
            {toggleLogin ? "Sign up" : "log in"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
