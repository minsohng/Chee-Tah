import * as React from 'react';

const Result = (props) => {
  const {title, id} = props;
  return (
    <>
      <div className="result level">
        <div className="level-item">
            <figure className="image is-128x128 level-item">
              <img src={title.thumbnails.medium.url}/>
            </figure>
        </div>
        <div className="level-item">
            <p className='content'><strong>{title.title}</strong></p>
        </div>
        <div className='level-item'>
          <span className="icon"><i className="fas fa-plus-square"></i></span>
        </div>
      </div>
    </>
  )
}

export default Result;