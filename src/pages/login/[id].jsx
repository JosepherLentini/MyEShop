import { useRouter } from "next/router";
import Image from "next/image";
// component
import Login from "@/components/Login";

import styles from "../../styles/LoginPage.module.scss"
import logo from "../../../public/Images/logo-myeshop.png";

const LogIn = () => {

    const router = useRouter()


    return (
      <>
        <div className={styles.Login_navbar}>
          <Image
            onClick={() => router.push("/")}
            src={logo}
            className={styles.Login_logo}
          />
        </div>
        <Login />
      </>
    );
}

export default LogIn;