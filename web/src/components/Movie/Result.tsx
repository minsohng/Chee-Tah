import * as React from "react";

const Result = (props) => {
  const {title, setResultVisibility, id, index} = props;
  
  const handleClick = (command) => {
    if (command === "add") {
      props.addToPlaylist(title, id);
      props.sendMessage(title, id, index);
    }
    if (command === "play") {
      props.playVideo(title, id);
    }
    setResultVisibility("is-overlay is-hidden");
  };

  return (
    <>
      <div className="col-m-9 offset-m-4">
        <div className="box box-padding box-movie-room">
          <h3 className="search-title" style={{ color: "white	", fontSize: "1.2em",  }}>{title.title}</h3>

          <img
            id="second-sibling"
            className="picture-search"
            src={title.thumbnails.medium.url}
          />
          <div />
          <h5 className="search-channel-title" style={{ color: "white	", fontSize: "1.2em",  }}>{title.channelTitle}</h5>
         <button id="btn-gone">
            <span>
              <a
                href="#"
                id="first-sibling"
                className="round-button"
                onClick={() => handleClick("play")}
              >
                <i
                  onClick={() => handleClick("play")}
                  className="fa fa-play fa-2x"
                />
              </a>
            </span>
            </button>
            <button id="btn-gone">

           
            <span>
              <a
                href="#"
                id="first-sibling"
                className="square"
                onClick={() => handleClick("add")}
              >
                <i
                  onClick={() => handleClick("add")}
                  className="fa fa-plus fa-2x"
                />
              </a>
            </span>
            </button>
        </div>
      </div>
    </>
  );
};

export default Result;


{/* <button className="button is-primary is-large mr-3" onClick={()=>handleClick("play")}>
            <span className="icon is-medium">
              <i className="fas fa-lg fa-play"></i>
            </span>
          </button>
          <button className="button is-primary is-large" onClick={()=>handleClick("add")}>
            <span className="icon is-medium">
              <i className="fas fa-lg fa-plus"></i>
            </span>
          </button> */}