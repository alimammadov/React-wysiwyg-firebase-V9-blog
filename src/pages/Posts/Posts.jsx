import React, { useEffect,useState } from "react";
import {useLocation } from "react-router-dom";
import Card from "../../components/Card/Card";
import "./posts.css";
import { collection, query, where,getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import SideBar from "../../components/SideBar/SideBar";



const Posts = () => {
  let location = useLocation();
  let catID = location.pathname.split("/")[2];
  const [posts,setPosts] = useState([])
  useEffect(() => {
    const fetchPost = async () => {
      let _posts = [];
      try {
        const citiesRef = collection(db, "posts");
        const q = query(citiesRef, where("category", "==", catID));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
          _posts.push({ id: doc.id, ...doc.data() });
          setPosts(_posts)

        });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPost();
  }, [catID]);
  return (
    <section className="l_posts">
      <div className="container card_container mh100">
        <main>
        {posts && posts.map(p=> <Card data={p} key={p.id}/>)}

        </main>

        <aside>
        <h1 className="sectionTitle">Elanalar</h1>
       <SideBar/>
        </aside>
      </div>
    </section>
  );
};

export default Posts;
