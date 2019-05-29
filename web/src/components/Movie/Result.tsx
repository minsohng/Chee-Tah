import * as React from 'react';

const Result = (props) => {
  const {title, setResultVisibility, id} = props;
  const onClick = () => {
    console.log('yes');
    console.log(id);
    setResultVisibility('container is-overlay is-relative is-hidden');
  }

  return (
    <>
      <div className='columns'>
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
                  <p className='title is-4'>{title.title}}</p>
                  <p className='subtitle is-4'>{title.channelTitle}</p>
                </div>
              </div>
              <div className="media-right">
                <span className="icon" onClick={onClick}><i className="fas fa-lg fa-plus-square"></i></span>  
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  )
}

export default Result;