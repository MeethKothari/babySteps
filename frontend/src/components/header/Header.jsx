import styles from "./header.module.css";
import {useNavigate} from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();


  return (
    <div>
        <header className={styles.container}>
            <img src="https://www.freepnglogos.com/uploads/logo-home-png/chimney-home-icon-transparent-1.png" 
            alt="logo" 
            className={styles.logo}
            onClick={() => navigate("/")}
            />
            <h3 className={styles.title}>Babysteps Appointment Booking System</h3>
            <button 
              className={styles.bookingButton}
              onClick={() => navigate("/bookings")}
              > 
              Check bookings
              </button>
        </header>
    </div>
  )
}

export default Header