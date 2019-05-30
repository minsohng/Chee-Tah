

 
class Public  extends React.Component<Public Props, Public State> {
   
    render() { 
        return ( 
        <>
       <div className="row">
    <div className="col-md-6 col-lg-4">
              <div className="card">
                <img className="card-img-top img-fluid" src="img/angie.png" alt="Card image cap">
                <div className="card-block">
                  <h4 className="card-title">Angie McAngular</h4>
                  <p className="card-text">Angie is a web developer and teacher who is passionate about building scalable, data driven web apps, especially ones that address old problems with new tech!</p>
                </div>
              </div>
            </div>

          <div className="col-md-6 col-lg-4">
            <div className="card">
              <img className="card-img-top img-fluid" src="img/nodestradamus.png" alt="Card image cap">
              <div className="card-block">
                <h4 className="card-title">NodeStradamus</h4>
                <p className="card-text">"NodeStra" is a software engineer and philosopher trying to leave the world better than he found it. He codes for non-profits, eCommerce, and large-scale web apps.</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="card">
              <img className="card-img-top img-fluid" src="img/geo.png" alt="Card image cap">
              <div className="card-block">
                <h4 className="card-title">Geo "Lo" Cation</h4>
                <p className="card-text">Geo is a JavaScript developer working on large-scale applications. He's also a teacher who strives to support students in removing all barriers to learning code.</p>
              </div>
            </div>
          </div>

      </>
       );
    }
}
 
export default Public ;


