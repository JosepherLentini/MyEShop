import styles from "./Card.module.scss";
//hooks
import { useState, useEffect, useRef, useContext } from "react";
//next
import Image from "next/image";
//global state settings
import { useReducer } from "react";
import { userReducer } from "@/global state/reducers";
import { UserContext, initialUserState } from "@/global state/products-state";
//firebase
import { db, auth } from "@/firebase";
import { doc, setDoc, updateDoc, getDoc, collection } from "firebase/firestore";



const Card = ({
  data,
  setNoLoggedMessage,
}) => {
  const [rotateCard, setRotateCard] = useState(false);

  //global state
  const { state, dispatch } = useContext(UserContext);
  const starRef = useRef(0);

  const percentRating = (rate) => {
    let rating = 100 - rate * 20;
    return rating.toString() + "%";
  };

  const addItemToDb = async (el) => {
    let uuid = localStorage.getItem("user");

    const docRef = doc(db, "cart", `${uuid}`);
    const docSnap = await getDoc(docRef);
    let ob;

    if (docSnap.exists()) {
      ob = docSnap.data().cart;

      let itemExist = ob.find((item) => item.id === el.id);
      if (itemExist) {
        let ab = ob.map((item) =>
          item.id === el.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateDoc(doc(db, "cart", `${uuid}`), {
          cart: [...ab],
        });
      } else {
        let ab;
        ab = [...ob, { ...el, quantity: 1 }];
        updateDoc(doc(db, "cart", `${uuid}`), {
          cart: [...ab],
        });
      }
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      setNoLoggedMessage(true)
    }
  };

  useEffect(() => {

  }, []);

  return (
    <div className={styles.Card_wrapper}>
      <div className={`${styles.Card} ${rotateCard && styles.rotate_card}`}>
        <div className={styles.front}>
          <div className={styles.Card_image}>
            <img src={data.image} alt="Card image"></img>
          </div>
          <div className={styles.Card_title}>
            <h3>{data.title.slice(0, 11)}</h3>
            <p>${data.price}</p>
          </div>
          <div className={styles.Card_buttons}>
            <button
              className={`${styles.Card_button} ${styles.addToCart}`}
              onClick={() => addItemToDb(data)}
            >
              Add to cart
            </button>
            <button
              className={`${styles.Card_button} ${styles.seeMore}`}
              onClick={() => setRotateCard((prev) => !prev)}
            >
              See more
            </button>
          </div>
        </div>
        <div className={styles.back}>
          <p className={styles.Card_description}>
            {data.description.slice(0, 200)}
          </p>
          <div className={styles.Card_buttons}>
            <button
              className={styles.addToCart}
              onClick={() => addItemToCart()}
            >
              Add to cart
            </button>
            <button
              className={`${styles.Card_button} ${styles.seeLess}`}
              onClick={() => setRotateCard((prev) => !prev)}
            >
              See less
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

//  {
//    items.length > 0
//      ? items.map((el) => <div className="">{el.id + "-" + " " + el.title}</div>)
//      : data.map((el) => <div className="">{el.id + "-" + " " + el.title}</div>);
//  }

// {
//   items.length > 0
//     ? items.map((el) => <div className="">{el.id + "-" + " " + el.price}</div>)
//     : data.map((el) => <div className="">{el.id + "-" + " " + el.price}</div>);
// }
