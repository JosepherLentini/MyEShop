import NavbarLayout from "@/layouts/NavbarLayout";
//hooks
import { useEffect, useState } from "react";
// firebase
import { db } from "@/firebase";
import { doc, getDoc, } from "firebase/firestore";

const ProductPage = () => {

    const [cartList, setCartList] = useState([]);

    useEffect(() => {
      const addCart = async () => {
        let uuid = localStorage.getItem("user");
        const docRef = doc(db, "cart", `${uuid}`);
        const docSnap = await getDoc(docRef);
        let ob;

        if (docSnap.exists()) {
          let cL = docSnap.data().cart;
          setCartList(cL);
        } else {
          // console.log("No such document!");
        }
      };
      addCart();
    }, [cartList]);



    return (
      <>
        <NavbarLayout cartList={cartList} setCartList={setCartList} />
        questa eè la pagina prodotto
      </>
    );
}

export default ProductPage; 