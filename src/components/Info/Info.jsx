import styles from "./Info.module.scss";
// Hooks
import { useEffect, useState } from "react";

const Info = () => {
  const [categoryBox, setCategoryBox] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategoryBox(data));
  }, []);

  const categoryBackground = [
    "https://img.freepik.com/free-photo/laptop_23-2148155405.jpg?size=626&ext=jpg&uid=R127865836&ga=GA1.1.1475726045.1700689510&semt=ais",
    "https://img.freepik.com/free-photo/handsome-man-putting-his-jacket_23-2148448923.jpg?size=626&ext=jpg&uid=R127865836&ga=GA1.1.1475726045.1700689510&semt=ais",
    "https://img.freepik.com/free-photo/golden-easter-eggs-by-easter-decorations_1303-30816.jpg?size=626&ext=jpg&uid=R127865836&ga=GA1.1.1475726045.1700689510&semt=ais",
    "https://img.freepik.com/free-photo/fashion-portrait-young-elegant-woman_1328-2743.jpg?size=626&ext=jpg&uid=R127865836&ga=GA1.1.1475726045.1700689510&semt=ais",
  ];
   
      
  return (
    <div className={styles.Info}>
      <h2>Our categories</h2>
      <div className={styles.Info_wrapper}>
        <div className={styles.Info_box}>
          {categoryBox
            .filter((em, index) => index % 2 === 0)
            .map((category, index) => (
             
                <div
                  className={styles.Info_box_bg}
                  key={index + 1}
                  style={{
                    backgroundImage: `url(${categoryBackground[index]})`,
                  }}
                >
                  <div className={styles.Info_overlay}>{category}</div>
                </div>
             
            ))}
        </div>
        <div className={styles.Info_box}>
          {categoryBox
            .filter((em, index) => index % 2 !== 0)
            .map((category, index) => (
             
                <div
                  className={styles.Info_box_bg}
                  key={index + 1}
                  style={{
                    backgroundImage: `url(${categoryBackground[index+2]})`,
                  }}
                >
                  <div className={styles.Info_overlay}>{category}</div>
                </div>
           
            ))}
        </div>
      </div>
    </div>
  );
};

export default Info;


