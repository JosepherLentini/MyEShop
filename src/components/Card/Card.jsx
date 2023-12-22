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
//
import { useRouter } from "next/router";

const Card = ({ data, setNoLoggedMessage }) => {
  const [rotateCard, setRotateCard] = useState(false);

  const router = useRouter();
  const seeMoreRef = useRef(null);
  const seeLessRef = useRef(null);
  const cardWrapperRef = useRef(null);
  const addToCardRef = useRef(null);

  const percentRating = (rate) => {
    let rating = 100 - rate * 20;
    return rating.toString() + "%";
  };

  const onRotateClick = (e, ref) => {
    if (e.target == ref) {
      setRotateCard((prev) => !prev);
    }
  };

  const goToProductPage = (e, ref1, ref2, ref3) => {
    if (
      e.target !== ref1.current &&
      e.target !== ref2.current &&
      e.target !== ref3.current
    ) {
      router.push(`/product/${data.id}`);
    } else {
    }
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
      setNoLoggedMessage(true);
    }
  };

  useEffect(() => {}, []);

  return (
    <div
      className={styles.Card_wrapper}
      ref={cardWrapperRef}
      onClick={(e) => goToProductPage(e, seeMoreRef, seeLessRef, addToCardRef)}
    >
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
              ref={addToCardRef}
              onClick={() => addItemToDb(data)}
            >
              Add to cart
            </button>
            <button
              className={`${styles.Card_button} ${styles.seeMore}`}
              ref={seeMoreRef}
              onClick={(e) => {
                // console.log(e.target, seeMoreRef);
                onRotateClick(e, seeMoreRef.current);
              }}
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
              ref={addToCardRef}
              onClick={() => addItemToDb(data)}
            >
              Add to cart
            </button>
            <button
              className={`${styles.Card_button} ${styles.seeLess}`}
              ref={seeLessRef}
              onClick={(e) => onRotateClick(e, seeLessRef.current)}
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

