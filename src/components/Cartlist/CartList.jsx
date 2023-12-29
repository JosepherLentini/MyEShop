import styles from "./CartList.module.scss";
import React from "react";
import CartItem from "../CartItem";

const CartList = ({ cartList, setCartList, toggleCart, setToggleCart }) => {
  return (
    <div className={`${styles.Cartlist} ${toggleCart && styles.openCloseCart}`}>
      <div className={styles.Cartlist_items}>
        {
          cartList.length > 0 ? cartList.map((prod) => (
          <CartItem
            key={prod.id}
            prod={prod}
            cartList={cartList}
            setCartList={setCartList}
          />
        ))
        :
        <div className={styles.emptyCart}>
          <p>Your cart is empty..</p>
          <p>let's buy something!</p>
        </div>
        }
      </div>
      <div className={styles.Cartlist_buttons}>
        <button onClick={() => setToggleCart(true)}>Close</button>
      </div>
    </div>
  );
};

export default CartList;
