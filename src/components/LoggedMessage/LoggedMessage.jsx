import styles from "./LoggedMessage.module.scss";
//hooks
import { useRouter } from "next/router";

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
        <button
          className={styles.LoggedMessage_button}
          onClick={() => router.push("/login/log")}
        >
          LogIn
        </button>
      </div>
    </div>
  );
};

export default LoggedMessage;
