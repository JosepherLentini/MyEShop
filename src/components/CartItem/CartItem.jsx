import { useEffect, useState } from "react";
import styles from "./CartItem.module.scss";
//icons
import Delete from "@/Icons/Delete";
import Garbage from "@/Icons/Garbage";
// firebase
import { db, auth } from "@/firebase";
import { doc, setDoc, updateDoc, getDoc, collection } from "firebase/firestore";

const CartItem = ({ prod, cartList, setCartList }) => {
  const addQuantity = (event, el) => {
    let uuid = localStorage.getItem("user");
    let operator = event.target.innerText;

    let decrese = cartList.map((item) =>
      item.id === el.id ? { ...item, quantity: item.quantity - 1 } : item
    );
    let increase = cartList.map((item) =>
      item.id === el.id ? { ...item, quantity: item.quantity + 1 } : item
    );

    switch (operator) {
      case "+":
        updateDoc(doc(db, "cart", `${uuid}`), {
          cart: [...increase],
        });

        break;
      case "-":
        updateDoc(doc(db, "cart", `${uuid}`), {
          cart: [...decrese],
        });
    }
  };

  let deleteItem = () => {
    let uuid = localStorage.getItem("user");
    let deleteItem = cartList.filter((item) => item.id !== prod.id);

    updateDoc(doc(db, "cart", `${uuid}`), {
      cart: [...deleteItem],
    });
  };

  useEffect(() => {
    let uuid = localStorage.getItem("user");
    let deleteItem = cartList.filter((item) => item.id !== prod.id);
    prod.quantity == 0 &&
      updateDoc(doc(db, "cart", `${uuid}`), {
        cart: [...deleteItem],
      });
  }, [prod.quantity]);

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem_delete}>
        <Garbage
          onClick={() => deleteItem()}
          className={styles.cartItem_delete_icon}
        />
      </div>
      <div className={styles.cartItem_image}>
        <img src={prod.image} alt="" />
      </div>
      <div className={styles.cartItem_title}>
        <h4>{prod.title?.slice(0, 10)}</h4>
      </div>
      <div className={styles.cartItem_quantity}>
        <button className={styles.remove} onClick={(e) => addQuantity(e, prod)}>
          -
        </button>
        <p>{prod.quantity}</p>
        <button className={styles.add} onClick={(e) => addQuantity(e, prod)}>
          +
        </button>
      </div>
      <div className={styles.cartItem_price}>
        <p>${prod.price * prod.quantity}</p>
      </div>
    </div>
  );
};

export default CartItem;

// setCartList(
//   cartList.map((item) =>
//     item.id === el.id ? { ...item, quantity: item.quantity + 1 } : item
//   )
// );
