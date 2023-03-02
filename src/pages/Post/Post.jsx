import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./post.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
const cats = {
  documents: "Sənədlər",
  accommodation: "Yerləşmə",
  jobs: "İş",
  listings: "Elan",
  blog: "Blog",
};
const Post = () => {
  let location = useLocation();
  let blogID = location.pathname.split("/")[2];
  const [post, setPost] = useState({});

  const getPost = async (id) => {
    try {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getPost(blogID);
  }, [blogID]);
  return (
    <div className="container">
      <article>
        <header>
          <Link>
            <span className="article_cat">{cats[post.category]}</span>
          </Link>
          <h1 className="post_title">{post.title}</h1>
          <p>{post.headline}</p>
          <div className="author_wrapper mt-8">
            <Link className="author_w_link">
              <img
                src={post.authorImg}
                className="author_w_img"
                alt={post.authorName}
              />
            </Link>
            <div className="author_w-r">
              <p className="author_w_name">{post.authorName}</p>
              <span className="author_p_info">
                {post.timeStamp?.toDate().toLocaleDateString("az-AZ")} · 3 min
                read
              </span>
            </div>
          </div>
        </header>
        <div className="article_img mt-8">
          <img src={post.picture} alt={post.title} />
        </div>
        <div
          className="article_content"
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
      </article>
    </div>
  );
};

export default Post;
