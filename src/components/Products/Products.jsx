//styles
import styles from "./Products.module.scss";
//components
import Card from "../Card";
import Filter from "../Filter";
//hooks
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Products = ({
  data,
  setData,
  items,
  setItems,
  cartList,
  setCartList,
  show,
  setShow,
}) => {
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((arr) => {
        setData(arr);
        setItems(arr);
      });
  }, []);

  const [noLoggedMessage, setNoLoggedMessage] = useState(false);
  const router =  useRouter();

  const showMoreClick = () => {
    setShow((prev) => prev + 4);
  };

  const showLessClick = () => {
    setShow((prev) => prev - 4);
  };

  return (
    <>
      <div className={styles.Products}>
        {noLoggedMessage && (
          <div className={styles.bo} onClick={() => setNoLoggedMessage(false)}>
            <div className={styles.loginMessage}>
              <button className={styles.loginMessage_close}>x</button>
              <p>You must log in!</p>
              <button
                className={styles.loginMessage_button}
                onClick={() => router.push("/login/log")}
              >
                LogIn
              </button>
            </div>
          </div>
        )}
        <Filter
          data={data}
          setData={setData}
          items={items}
          setItems={setItems}
          show={show}
          setShow={setShow}
        />

        {items.length > 0 && (
          <div className={styles.Items}>
            {items.slice(0, show).map((item) => (
              <Card
                data={item}
                key={item.id}
                
                noLoggedMessage={noLoggedMessage}
                setNoLoggedMessage={setNoLoggedMessage}
              />
            ))}
            <div className={styles.showButtons}>
              {show < items.length && (
                <button
                  className={styles.showMore}
                  onClick={() => showMoreClick()}
                >
                  Show More
                </button>
              )}
              {show > 4 && (
                <button
                  className={styles.showLess}
                  onClick={() => showLessClick()}
                >
                  Show Less
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;

// return items.length > 0 ? (
//   <>
//     <div className={styles.Items}>
//       <Filter
//         data={data}
//         setData={setData}
//         items={items}
//         setItems={setItems}
//         show={show}
//         setShow={setShow}
//       />
//       <div className={styles.Products} id="products-section">
//         {items.slice(0, show).map((item) => (
//           <Card
//             data={item}
//             key={item.id}
//             cartList={cartList}
//             setCartList={setCartList}
//           />
//         ))}
//         <div className={styles.showButtons}>
//           {show < items.length && (
//             <button
//               className={styles.showMore}
//               onClick={() => showMoreClick()}
//             >
//               Show More
//             </button>
//           )}
//           {show > 4 && (
//             <button
//               className={styles.showLess}
//               onClick={() => showLessClick()}
//             >
//               Show Less
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   </>
// ) : (
//   <div className={styles.noProducts}>
//     <p className={styles.noProducts_message}>
//       Your search did not return any results
//     </p>
//   </div>
// );
