import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { collection, query, where,getDocs } from "firebase/firestore";
import { db } from "../../firebase";
const SideBar = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
          let _posts = [];
          try {
            const citiesRef = collection(db, "posts");
            const q = query(citiesRef, where("category", "==", 'listings'));
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
      }, []);
  return (

      <ul>
        {posts&& posts.map(p=><li key={p.id}>
          <Link to={`/post/${p.id}`}>
            <span className="author_info">
              <img
                      src={p.authorImg}
            alt={p.authorName}
                className="author_thumb"
              />
              <span className="author_name">{p.authorName}</span>
              <span className="rj">·</span>
              <span className="published_date">{p.timeStamp.toDate().toLocaleDateString('az-AZ')}</span>
              <span className="rj">·</span>
              <span className="card_reading_time">Poland</span>
            </span>
            <h3 className="aside_h3">
            {p.title}
            </h3>
          </Link>
        </li>)}
      </ul>

  );
};

export default SideBar;
