import styles from "./CartList.module.scss";
import { useState } from "react";
import React from "react";
import CartItem from "../CartItem";

const CartList = ({ cartList, setCartList, toggleCart, setToggleCart }) => {
  return (
    <div className={`${styles.Cartlist} ${toggleCart && styles.openCloseCart}`}>
      <div className={styles.Cartlist_items}>
        {cartList.map((prod) => (
          <CartItem
            key={prod.id}
            prod={prod}
            cartList={cartList}
            setCartList={setCartList}
          />
        ))}
      </div>
      <div className={styles.Cartlist_buttons}>
        {/* <button>Go to cart</button> */}
        <button onClick={() => setToggleCart(true)}>Close</button>
      </div>
    </div>
  );
};

export default CartList;
