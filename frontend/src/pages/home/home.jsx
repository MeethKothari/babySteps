import { useEffect, useState } from 'react';
import styles from './home.module.css';
import apiUrl from "../../ipconfig";
import DoctorCard from '../../components/doctorCard/DoctorCard';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loading
    const fetchDoctors = async () => {
      let response = await fetch(`${apiUrl}/doctors`);
      let data = await response.json();
      setDoctors(data);
      setLoading(!loading);
    }


    fetchDoctors()

  },[]) 

    
  return (
    <>
      <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Book your slot now with two steps easy system.....</h1>
        <div> {loading === true ? <h2>.....fetching available doctors</h2> : 
            doctors.map((doctor) => {
              return <DoctorCard doctor = {doctor} key={doctor._id}/>
            })} 
        </div>
      </div>
      </div>
    </>
  )
}

export default Home