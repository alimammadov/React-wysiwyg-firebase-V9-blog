import React from "react";
import "./card.css";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Link } from "react-router-dom";
const Card = ({data}) => {
  return (
    <div className="card">
      <div className="card_header">
        <Link className="author_link">
          <img
            src={data.authorImg}
            alt={data.authorName}
            className="author_thumb"
          />
          <span className="author_name">{data.authorName}</span>
        </Link>
        <span className="rj">·</span>
        <span className="published_date">{data.timeStamp.toDate().toLocaleDateString('az-AZ')}</span>
        <span className="rj">·</span>
        <span className="card_reading_time">3min</span>
      </div>
      <div className="card_body">
        <div className="card_left">
          <Link to={`/post/${data.id}`} >
            <h2 className="card_title">
              {data.title}
            </h2>
            <p className="card_desc">
            {data.headline}
            </p>
          </Link>
        </div>
        <div className="card_right">
          <img
            alt={data.title}
            className="card_img"
            src={data.picture}
            width="112"
            height="112"
            loading="lazy"
          />
        </div>
      </div>

      <div className="card_footer">
        {/* <button className="read_later">
          <BookmarkBorderIcon />
        </button> */}
      </div>
      <hr />
    </div>
  );
};

export default Card;
