import * as React from 'react';

const About = props => {
  const onMouseEnter = () => {
    props.setContainerLabel('container about')
  }
    return (
      <div className="column active">
      <div className="content">
        <h1 onMouseEnter= {onMouseEnter}>About</h1>
        <div className="box">
            <a href="https://www.google.com"/>
          <h2>About</h2>
          <p className="testing">
            Et occaecat et ad occaecat cillum et officia cillum est aute
            deserunt incididunt. Incididunt nostrud laborum eiusmod eu
            quis ad mollit consectetur dolor do veniam. Fugiat laborum          
          
          </p><br/>
          
        </div>
      </div>
    </div>

  )
}

export default About;