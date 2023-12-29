//Styles
import styles from "./Hero.module.scss";
// next image
import Image from "next/image";
// files
import hbg from "../../../public/Images/myeshophero.jpeg";
import mhbg from "../../../public/Images/myeshophero-mobile.jpeg";

let Hero = () => {
    return (
      <div className={styles.Hero}>
        <Image
          className={styles.Hero_bg}
          src={hbg}
          alt="MyeShop Hero Background"
        />
        <Image
          className={styles.Hero_bgMobile}
          src={mhbg}
          alt="MyeShop Hero Background"
        />

        <div className={styles.Hero_overlay}>
          <div className={styles.Hero_text}>
            <p className={styles.Hero_text_paragraph}>
              Shop with us for convenient online shopping, fast delivery, and
              great deals every day!
            </p>
          </div>
        </div>
      </div>
    );
}

export default Hero;