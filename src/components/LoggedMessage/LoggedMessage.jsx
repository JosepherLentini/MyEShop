import styles from "./LoggedMessage.module.scss";
//hooks
import { useRouter } from "next/router";
//next
import Link from "next/link";

const LoggedMessage = ({ setNoLoggedMessage }) => {
  let router = useRouter();
  return (
    <div
      className={styles.Wrapper_LoggedMessage}
      onClick={() => setNoLoggedMessage(false)}
    >
      <div className={styles.LoggedMessage}>
        <button className={styles.LoggedMessage_close}>x</button>
        <p>You must log in!</p>
        <Link href="/login" className={styles.LoggedMessage_button}>LogIn</Link>
      </div>
    </div>
  );
};

export default LoggedMessage;
