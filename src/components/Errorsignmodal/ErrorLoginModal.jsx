import styles from "./ErrorLoginModal.module.scss"

const ErrorLoginModal = ({logInSide}) => {
     return (
       <div className={`${styles.ErrorLoginModal} ${logInSide && styles.colorLogIn}` }>
         <p>Oh! There was an error...</p>
         <p>please retry to insert correct credentials</p>
       </div>
     );
}

export default ErrorLoginModal;