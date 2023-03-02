import React, { useState, useEffect, useContext } from "react";
import {
  serverTimestamp,
  setDoc,
  doc,
  getDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./edit.css";
import { AuthContext } from "../../contex/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import logging from "../../config/logging";
import SuccessText from "../../components/SuccessText/SuccessText";
import ErrorText from "../../components/ErrorText/ErrorText";
const Edit = () => {
  const [_id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [content, setContent] = useState("");
  const [headline, setHeadline] = useState("");
  const [country, setCountry] = useState("");

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [unAuth, setUnAuth] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [category, setCategory] = useState("");
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let blogID = location.pathname.split("/")[2];

    if (blogID) {
      setId(blogID);
      getBlog(blogID);
    } else {
      setLoading(false);
    }
  }, [location]);
  //Get Blog data
  const getBlog = async (id) => {
    try {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let response = docSnap.data();
        if (currentUser.uid !== response.author) {
          logging.warn(`This blog is owned by someone else.`);
          setUnAuth(true);
          setId("");
        } else {
          setCategory(response.category);
          setTitle(response.title);
          setContent(response.content);
          setHeadline(response.headline);
          setCountry(response.country);
          setPicture(response.picture || "");

          /** Convert html string to draft JS */
          const contentBlock = htmlToDraft(response.content);
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const editorState = EditorState.createWithContent(contentState);

          setEditorState(editorState);

          // Set the "capital" field of the city 'DC'
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setError(`Unable to retrieve blog ${_id}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //Create new blog Post
  const createBlog = async () => {
    if (title === "" || headline === "" || content === "" || category ==="" || country ==="") {
      setError("Please fill out all required fields");
      setSuccess("");
      return null;
    }
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const newCityRef = doc(collection(db, "posts"));
      await setDoc(newCityRef, {
        authorName: currentUser.displayName,
        authorImg: currentUser.photoURL,
        author: currentUser.uid,
        title,
        category,
        country,
        picture,
        headline,
        content,
        timeStamp: serverTimestamp(),
        like: 0,
        dislike: 0,
        readingCount: 0,
        isPublished: false
      });
      setSuccess("Blog posted.  You can continue to edit on this page.");
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const editBlog = async (id) => {
    try {
      await updateDoc(doc(db, "posts", id), {
        title,
        picture,
        headline,
        content,
        isPublished: false,
        timeStamp: serverTimestamp(),
      });
      setSuccess("Blog updated.");
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
    }
  };
  if (loading) return <div>loading...</div>;
  return (
    <div className="profilePage">
      <div className="container">
        <article className="editPage">
          <header className="profilePageHeader">
            <ErrorText error={error} />
            {unAuth && (
              <h1>
              Bu bloq başqasına məxsusdur. Bu postu redaktə etmək səlahiyyətiniz yoxdur./
                This blog is owned by someone else. You are not authoriesed to edit this post     </h1>
            )}
          </header>
          {!unAuth && (
            <div>
              <label>
                <span>Kateqoriya seçin</span>
                <select
                  name="title"
                  id="category"
                  placeholder="Enter a title"
                  disabled={saving}
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                >
                  <option value={category}>{category}</option>
                  <option value="documents" >Sənədlər</option>
                  <option value="accommodation">Yerləşmə</option>
                  <option value="jobs">İş</option>
                  <option value="listings">Elanlar</option>
                </select>
              </label>
              <label>
                <span>Ölkə <span className="inf">Yazdiğınız postun aid olduğu olkə</span></span>
                <input
                  type="text"
                  name="country"
                  value={country}
                  id="country"
                  placeholder="ex: Poland"
                  disabled={saving}
                  onChange={(event) => {
                    setCountry(event.target.value);
                  }}
                />
              </label>
              <label>
                <span>Başlıq</span>
                <input
                  type="text"
                  name="title"
                  value={title}
                  id="title"
                  placeholder="Enter a title"
                  disabled={saving}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </label>
              <label>
                <span>Şəkil Linki</span>
                <input
                  type="text"
                  name="picture"
                  value={picture}
                  id="picture"
                  placeholder="Picture URL"
                  disabled={saving}
                  onChange={(event) => {
                    setPicture(event.target.value);
                  }}
                />
              </label>
              <label>
                <span>Qısa Təsvir</span>
                <input
                  type="text"
                  name="headline"
                  value={headline}
                  id="headline"
                  placeholder="Enter a headline"
                  disabled={saving}
                  onChange={(event) => {
                    setHeadline(event.target.value);
                  }}
                />
              </label>
              <label>
                <span>Əsas Mətn <span className="inf">Bir mətn redaktorundan kopyala/yapışdır edə bilərsiniz</span></span>
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={(newState) => {
                    setEditorState(newState);
                    setContent(
                      draftToHtml(convertToRaw(newState.getCurrentContent()))
                    );
                  }}
                />
              </label>
              <input type='text' className="inps"/>
              <ErrorText error={error} />
              <SuccessText success={success} />
              <button
                className="btn add w100"
                onClick={() => {
                  if (_id !== "") {
                    editBlog(_id);
                  } else {
                    createBlog();
                  }
                }}
                disabled={saving}
              >
                {_id !== "" ? "Update" : "Post"}
              </button>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default Edit;
