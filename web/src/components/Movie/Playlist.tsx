import * as React from "react";
import Video from "./Video";
import { useEffect, useState } from "react";

const Playlist = props => {
  const { isHidden, setIsHidden, turnArrow, setTurnArrow } = props;
  const playlist = props.playlist;
  // let firstPage;
  // let secondPage;
  // if(playlist.length > MAX_PER_LINE) {
  //   firstPage = playlist.slice(0, 5)

  // }

  // useEffect(()=> {
  //   setPlaylistItems(props.playlist)
  // })

  const togglePlaylist = () => {
    (turnArrow === "fas fa-3x fa-chevron-up down") ? setTurnArrow("fas fa-3x fa-chevron-up up") :
    setTurnArrow("fas fa-3x fa-chevron-up down");
    setIsHidden(isHidden => !isHidden);
  };
  
  console.log("DEBUG", playlist)

  const videoList = playlist.map((data, i) => (
    <Video video={data} playVideo={props.playVideo} deleteVideo={props.deleteVideo} key={i + 100} id={i} admin={props.admin}/>
  ));

  return (
    <>
    <div className="toggle-button">
      <span className="icon is-large"><i className={turnArrow} onClick={togglePlaylist}></i></span>
    </div>
    {isHidden && (
      <>
      {videoList}
      </>
    )}

    </>
  );
};

export default Playlist;
