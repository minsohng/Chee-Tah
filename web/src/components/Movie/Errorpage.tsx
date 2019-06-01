import * as React from 'react';
import './404page.scss';

const {useEffect} = React

const Errorpage = (props) => {


  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h3>Oops! Page not found</h3>
            <h1><span>4</span><span>0</span><span>4</span></h1>
          </div>
          <h2>we are sorry, but the page you requested was not found</h2>
          <a className="tag is-link is-large" href="/">Back to home</a>
          
        </div>
      </div>
    </>
  )
}

export default Errorpage