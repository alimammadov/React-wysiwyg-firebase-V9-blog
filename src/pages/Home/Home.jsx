import React, { useState, useEffect } from "react";
import "./home.css";
import Card from "../../components/Card/Card";
import { collection, getDocs,query, where } from "firebase/firestore";
import { db } from "../../firebase";
import Intro from "../../components/Intro/Intro";
import SideBar from "../../components/SideBar/SideBar";
import { getAnalytics, logEvent } from "firebase/analytics";


const Home = () => {
  const [data, setData] = useState([]);
  const analytics = getAnalytics();
  logEvent(analytics, 'notification_received');
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        // const querySnapshot = await getDocs(collection(db, "posts"));
        const citiesRef = collection(db, "posts");
        const q = query(citiesRef, where("isPublished", "==", true));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="homepage">
      <div className="container ">
        <section className="intro">
          <Intro />
        </section>
      </div>
      <section className="l_posts">
        <div className="container card_container">
          <main>{data && data.map((p) => <Card data={p} key={p.id} />)}</main>

          <aside>
            <h1 className="sectionTitle">Elanalar</h1>
            <SideBar />
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Home;
