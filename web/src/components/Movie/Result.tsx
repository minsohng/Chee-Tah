import * as React from 'react';

const Result = (props) => {
  const {title, id} = props;
  return (
    <>
      <div className="columns" id='result'>
        <div className="column">
            <figure className="image is-128x128 level-item`">
              <img src={title.thumbnails.medium.url}/>
            </figure>
        </div>
        <div className="column is-8">
            <p className='content'><strong>{title.title}</strong></p>
        </div>
        <div className='column'>
          <span className="icon"><i className="fas fa-plus-square"></i></span>
        </div>
      </div>
    </>
  )
}

export default Result;