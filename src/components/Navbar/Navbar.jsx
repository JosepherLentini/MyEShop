import styles from "./Navbar.module.scss";
import { UserContext, initialUserState } from "@/global state/products-state";
//components
import CartList from "../Cartlist";
//
import Image from "next/image";
import logo from "../../../public/Images/logo-myeshop.png";
// icons
import Cart from "@/Icons/Cart";
import User from "@/Icons/User";
//hooks
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
//firebase
import { db, auth } from "@/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc, collection } from "firebase/firestore";

const Navbar = ({ cartList, setCartList }) => {
  const [toggleCart, setToggleCart] = useState(true);
  const [loggedUser, setLoggedUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [userLoggedModal, setUserLoggedModal] = useState(false);

  const router = useRouter();
  ///

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sucessfully logged out");
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const userExists = async () => {
      let uuid = localStorage.getItem("user");

      const docRef = doc(db, "cart", `${uuid}`);
      const docSnap = await getDoc(docRef);
      let ob;

      if (docSnap.exists()) {
       
        setLoggedUser(true);
        setUserName(docSnap.data().name);
      } else {
        setLoggedUser(false);
        setUserLoggedModal(false)
      }
    };

    onAuthStateChanged(auth, (us) => {
      if (us) {
    
         userExists();
      } else {
        localStorage.removeItem("user");
        setLoggedUser(false);
        setUserLoggedModal(false);
      }
    });

   
  }, []);

  const onUserClick = () => {
    setUserLoggedModal((prev) => !prev);

    !toggleCart && setToggleCart(true);
      
  
  }

  const onCartClick = () => {
    setToggleCart((prev) => !prev);

    userLoggedModal && setUserLoggedModal(false)
  }
 
  return (
    <div className={styles.Navbar} onClick={(e) => console.log(e)}>
      <ul>
        <li onClick={() => console.log("ciao")}>
          <Image src={logo} className={styles.Navbar_logo} />
        </li>
        <li className={styles.Navbar_user}>
          <User className={styles.user} onClick={() => onUserClick()} />
          {loggedUser && (
            <Cart
              className={styles.cart}
              onClick={() => {onCartClick();}}
            />
          )}
          {loggedUser && cartList.length > 0 && (
            <div className={styles.cartQuantity}>
              <p>{cartList.length}</p>
            </div>
          )}
        </li>
      </ul>
      {userLoggedModal && (
        <div className={styles.userModal}>
          {loggedUser ? (
            <div className={styles.userModal_logged}>
              <p>{userName}</p>
              <button
                onClick={() => {
                  handleLogOut();
                }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className={styles.userModal_noLogged}>
              <p>Hi, join us!</p>
              <button
                onClick={() => {
                  router.push("/login/log");
                }}
              >
                Log In
              </button>
            </div>
          )}
        </div>
      )}
      <CartList
        cartList={cartList}
        setCartList={setCartList}
        toggleCart={toggleCart}
        setToggleCart={setToggleCart}
      />
    </div>
  );
};

export default Navbar;
