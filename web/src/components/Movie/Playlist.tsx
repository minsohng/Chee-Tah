import * as React from 'react';
import Video from './Video';
const MAX_PER_LINE = 5;

const Playlist = (props) => {
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

  const videoList = playlist.map(data => 
    <Video video={data}/>
  )
  
  return (
    <>
      <div
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
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="d-inline-flex flex-row video-container">
              {videoList}
            {/* <div
              className="Item"
              style={{ backgroundImage: "url(" + dog + ")" }}
            >
              <div className="overlay ">
                <div className="title">TITLE</div>

                <div className="plot">
                  aowdhaow jdaiwojdoia jodiawj oawjdo jadwoija owidjoa
                </div>
              </div>
            </div>

            <div
              className="Item "
              style={{ backgroundImage: "url(" + cat + ")" }}
            >
              <div className="overlay ">
                <div className="title">TITLE</div>

                <div className="plot">
                  aowdhaow jdaiwojdoia jodiawj oawjdo jadwoija owidjoa
                </div>
              </div>
            </div> */}




            </div>
          </div>

        {/* <div className='carousel-item'>
          <div className="d-inline-flex flex-row">

            <div
              className="Item "
              style={{ backgroundImage: "url(" + kanye + ")" }}
            >
              <div className="overlay ">
                <div className="title">TITLE</div>

                <div className="plot">
                  aowdhaow jdaiwojdoia jodiawj oawjdo jadwoija owidjoa
                </div>
              </div>
            </div>

            <div
              className="Item "
              style={{ backgroundImage: "url(" + cat + ")" }}
            >
              <div className="overlay ">
                <div className="title">TITLE</div>

                <div className="plot">
                  aowdhaow jdaiwojdoia jodiawj oawjdo jadwoija owidjoa
                </div>
              </div>
            </div>
            </div>
          </div> */}

        </div>
      </div>
    </>
  )
}

export default Playlist;