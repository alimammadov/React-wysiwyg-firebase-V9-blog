import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import {
  doc,
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contex/AuthContext";

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    let _posts = [];
    try {
      // Create a query against the collection.
      const q = query(
        collection(db, "posts"),
        where("author", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        _posts.push({ id: doc.id, ...doc.data() });
      });
      setUserPosts(_posts);
    } catch (error) {}
  };

  const onAddPressed = () => {
    navigate("/edit");
  };

  const onEditPressed = (id) => {
    navigate(`/edit/${id}`);
  };
  const onDeletePressed = async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id));
      setUserPosts(userPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="profilePage">
      <div className="container">
        <article>
          <header className="profilePageHeader">
            <h2>Nə düşünürsən...? </h2>
            <button className="btn add" onClick={onAddPressed}>
              Yeni post
            </button>
          </header>
          <ul className="profilePageUl">
            {userPosts.length > 0 ? (
              userPosts.map((p) => (
                <li className="profilePageList" key={p.id}>
                  <h4>{p.title}</h4>
                  <div className="btnactions">
                    <button
                      onClick={() => onEditPressed(p.id)}
                      className="edit"
                    >
                      Dəyişdir
                    </button>
                    <button onClick={()=>onDeletePressed(p.id)} className="delete">
                      Sil
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li>Sənin heç bir postun yoxdur.</li>
            )}
          </ul>
        </article>
      </div>
    </div>
  );
};

export default Profile;
