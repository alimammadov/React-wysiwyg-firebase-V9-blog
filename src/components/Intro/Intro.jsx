import React from "react";
import { Link } from "react-router-dom";
const Intro = () => {
  return (
    <div className="introWrapper">
      <div className="introCard">
        <Link to={'/posts/documents'}>
          <div className="introCardText" title="Sənədlər">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              x="0"
              y="0"
              viewBox="0 0 24 24"
            >
              <g>
                <path
                  d="M21.75 5v14A3.75 3.75 0 0 1 18 22.75H6A3.75 3.75 0 0 1 2.25 19V5A3.75 3.75 0 0 1 6 1.25h12A3.75 3.75 0 0 1 21.75 5zm-1.5 0A2.25 2.25 0 0 0 18 2.75H6A2.25 2.25 0 0 0 3.75 5v14A2.25 2.25 0 0 0 6 21.25h12A2.25 2.25 0 0 0 20.25 19z"
                  fill="#000000"
                  data-original="#000000"
                ></path>
                <path
                  d="M12 5.25a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1 0-1.5zM17 9.25a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1 0-1.5zM17 13.25a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1 0-1.5zM17 17.25a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1 0-1.5z"
                  fill="#000000"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
          </div>
          <div className="introCardIcon">Sənədlər</div>
        </Link>
      </div>
      <div className="introCard">
        <Link to={'/posts/accommodation'}>
          <div className="introCardText" title="Elanlar">
          <svg width="45" height="45" x="0" y="0" viewBox="0 0 32 32" ><g><path d="M21.82 30H10.18A5 5 0 0 1 5 25.24V19a1 1 0 0 1 2 0v6.24A3 3 0 0 0 10.18 28h11.64A3 3 0 0 0 25 25.24V19a1 1 0 0 1 2 0v6.24A5 5 0 0 1 21.82 30zm7.89-13.29a1 1 0 0 0 0-1.42l-13-13a1 1 0 0 0-1.42 0l-13 13a1 1 0 0 0 1.42 1.42L16 4.41l12.29 12.3a1 1 0 0 0 1.42 0z" data-name="9-Home" fill="#000000" data-original="#000000" ></path></g></svg>
          </div>
          <div className="introCardIcon">Yerləşmə</div>
        </Link>
      </div>
      <div className="introCard">
        <Link to={'/posts/jobs'}>
          <div className="introCardText" title="İş">
            <svg width="45" height="45" x="0" y="0" viewBox="0 0 24 24">
              <g>
                <path
                  d="M17 1.25c3.194 0 5.75 2.375 5.75 5.25 0 1.336-.546 2.559-1.454 3.49l.197 1.406a.751.751 0 0 1-1.078.775l-1.462-.732A6.228 6.228 0 0 1 17 11.75c-3.194 0-5.75-2.375-5.75-5.25S13.806 1.25 17 1.25zm0 1.5c-2.325 0-4.25 1.657-4.25 3.75s1.925 3.75 4.25 3.75c.613 0 1.197-.115 1.725-.323a.75.75 0 0 1 .61.027l.475.237-.053-.375a.75.75 0 0 1 .247-.666c.764-.675 1.246-1.611 1.246-2.65 0-2.093-1.925-3.75-4.25-3.75z"
                  fill="#000000"
                  data-original="#000000"
                  className=""
                ></path>
                <path
                  d="M9 4.75a.75.75 0 0 1 0 1.5H5c-.69 0-1.25.56-1.25 1.25v10A1.252 1.252 0 0 0 5 18.75h14c.69 0 1.25-.56 1.25-1.25V14a.75.75 0 0 1 1.5 0v3.5A2.75 2.75 0 0 1 19 20.25H5c-.729 0-1.429-.29-1.945-.805A2.755 2.755 0 0 1 2.25 17.5v-10A2.75 2.75 0 0 1 5 4.75zM22 21.25a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1 0-1.5z"
                  fill="#000000"
                  data-original="#000000"
                  className=""
                ></path>
              </g>
            </svg>
          </div>
          <div className="introCardIcon">İş</div>
        </Link>
      </div>
      <div className="introCard">
        <Link to={'/posts/listings'}>
          <div className="introCardText" title="Elanlar">
            <svg x="0" y="0" viewBox="0 0 24 24" width="45" height="45">
              <g>
                <path
                  d="m10.934 15.136 1.505 3.227c.029.062.063.122.102.179l1.739 2.533a.752.752 0 0 1-.501 1.165l-3.081.491a1.75 1.75 0 0 1-1.862-.989L6.68 17.119a.75.75 0 0 1 .363-.996l2.895-1.35a.749.749 0 0 1 .996.363zm-1.042 1.313-1.535.716 1.839 3.943a.25.25 0 0 0 .266.142l1.91-.305-1.067-1.555a2.68 2.68 0 0 1-.225-.393z"
                  fill="#000000"
                  data-original="#000000"
                  className=""
                ></path>
                <path
                  d="M1.745 14.722a5.01 5.01 0 0 1 2.423-6.655l3.728-1.739a6.69 6.69 0 0 0 1.775-1.207l3.475-3.29a1.283 1.283 0 0 1 2.044.389l4.774 10.239a1.284 1.284 0 0 1-1.015 1.816l-4.754.547a6.73 6.73 0 0 0-2.066.584l-3.728 1.739a5.009 5.009 0 0 1-6.656-2.423zm16.732-1.902-4.519-9.692-3.256 3.082A8.209 8.209 0 0 1 8.53 7.688L4.802 9.426a3.505 3.505 0 0 0-1.697 4.662 3.508 3.508 0 0 0 4.662 1.697l3.728-1.738a8.197 8.197 0 0 1 2.529-.715zM21.404 4.728a.75.75 0 1 1 .634 1.359l-1.447.675a.75.75 0 0 1-.634-1.36zM17.902 3.755a.75.75 0 1 1-1.299-.75l.798-1.383a.751.751 0 0 1 1.299.75zM20.271 10.872a.75.75 0 1 1 .261-1.477l1.572.278a.75.75 0 1 1-.26 1.477z"
                  fill="#000000"
                  data-original="#000000"
                  className=""
                ></path>
              </g>
            </svg>
          </div>
          <div className="introCardIcon">Elanlar</div>
        </Link>
      </div>
    
    </div>
  );
};

export default Intro;
