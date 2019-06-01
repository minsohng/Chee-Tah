import * as React from "react";
import Video from "./Video";
import { useEffect, useState } from "react";
const MAX_PER_LINE = 5;

const Playlist = props => {
  const [isHidden, setIsHidden] = useState(true);

  const playlist = props.playlist;
  const pages = Math.floor(playlist.length / MAX_PER_LINE);
  // let firstPage;
  // let secondPage;
  // if(playlist.length > MAX_PER_LINE) {
  //   firstPage = playlist.slice(0, 5)

  // }

  // useEffect(()=> {
  //   setPlaylistItems(props.playlist)
  // })

  const togglePlaylist = () => {
    setIsHidden(isHidden => !isHidden);
  };

  const videoList = playlist.map((data, i) => (
    <Video video={data} key={i + 100} />
  ));

  return (
    <>
    <div className="toggle-button">
      <label className="slide-btn-alt">
        <input onClick={togglePlaylist} type="checkbox" />
        <span  className="slide-btn-content" data-off="Hide" data-on="Show" />
      </label>
      </div>


      {isHidden && (
        <>
          {" "}
          <div className="d-inline-flex flex-row video-container">
            <div
              className="Item"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)`
              }}
            >
              <div className="overlay ">
                <div className="title">really cool video title</div>
                <div className="plot">
                  amazing description
                  <div className="buttonX">
                    <p>Remove</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="Item"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)`
              }}
            >
              <div className="overlay ">
                <div className="title">really cool video title</div>
                <div className="plot">
                  amazing description
                  <div className="buttonX">
                    <p>Remove</p>
                  </div>
                </div>
              </div>
            </div>


            <div
              className="Item"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)`
              }}
            >
              <div className="overlay ">
                <div className="title">really cool video title</div>
                <div className="plot">
                  amazing description
                  <div className="buttonX">
                    <p>Remove</p>
                  </div>
                </div>
              </div>
            </div>


            <div
              className="Item"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)`
              }}
            >
              <div className="overlay ">
                <div className="title">really cool video title</div>
                <div className="plot">
                  amazing description
                  <div className="buttonX">
                    <p>Remove</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="Item"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)`
              }}
            >
              <div className="overlay ">
                <div className="title">really cool video title</div>
                <div className="plot">
                  amazing description
                  <div className="buttonX">
                    <p>Remove</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </>
      )}

      {/* <div
        id="carouselExampleIndicators"
        className="carousel slide carousel-fade"
        data-ride="carousel"
        data-interval="false"
        >
        <ol className="carousel-indicators ">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          />
          {/* <li data-target="#carouselExampleIndicators" data-slide-to="1" />
          <li data-target="#carouselExampleIndicators" data-slide-to="2" /> */}
      {/* </ol> */}
      {/* <div className="carousel-inner">
          <div className="carousel-item active"> */}
    </>
  );
};

export default Playlist;
