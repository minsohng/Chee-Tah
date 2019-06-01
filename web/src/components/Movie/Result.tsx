import * as React from 'react';

const Result = (props) => {
  const {title, setResultVisibility, id} = props;
  
  const handleClick = (command) => {
    // console.log("URL", title.thumbnails.medium.url)
    if (command === "add") {
      props.addToPlaylist(title);
      props.sendMessage(title, id);
    }
    if (command === "play") {
      props.playVideo(title, id);
    }
    setResultVisibility('container is-overlay is-relative is-hidden');
  }

  return (
    <>
      {/* <div style={{color:'white'}}>{title.title}</div>
     */}

        {/* this one is important */}
        <div className="col-m-9 offset-m-4">
          <div className="box box-padding box-movie-room">
            <h3>{title.title}</h3>
            <img className="picture-search" src={title.thumbnails.medium.url}></img>
            <h5 >{title.channelTitle}</h5>
            <p>className="col-lg-12"</p>
          </div>
        </div>
   


    {/* <div style={{overflowY:'scroll', zIndex:9000}} className="search-result new-job">
 
  <div className="">
  
  </div>
  <div className="content">
      <span className="company"><a href="#"> <p className='title is-4'>{title.title}</p></a></span>
    <h2><a href="/viewjob/1234"> <img src={title.thumbnails.medium.url}/></a></h2>
    <p>
      
     
    </p>
    <p className='subtitle is-4'>{title.channelTitle}</p>
    <div>
      <p></p>
    </div>
  
    <div className="more">
      <div className="close">x</div>
      <p className='subtitle is-4'>{title.channelTitle}</p>
    </div>
  </div>
</div> */}
      
      
     

       


     

                 
            

      {/* <div className='columns'>
        <div className="column is-6 is-offset-one-fifth">
          <div className='box'>
            <article className='media'>
              <div className='media-left'>
                <figure className="image is-128x128">
                  <img src={title.thumbnails.medium.url}/>
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                  <p className='title is-4'>{title.title}</p>
                  <p className='subtitle is-4'>{title.channelTitle}</p>
                </div>
              </div>
              <div className="media-right">
                <span className="icon playVideo" onClick={() => handleClick("play")}><i className="fas fa-play-circle"></i></span>
                <span className="icon addPlaylist" onClick={() => handleClick("add")}><i className="fas fa-lg fa-plus-square"></i></span>  
                
              </div>
            </article>
          </div>
      </div>
      </div> */}
    </>
  )
}

export default Result;