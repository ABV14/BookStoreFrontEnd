import React,{Component} from 'react';


class Footer extends Component{
	render(){
		return(
            <div className="site-footer  mt-5 bg-warning">
            <div className="container">
            <div className="row">
              
{/*     
              <div className="col-xs-12   col-md-6">
                <h6>Categories</h6>
                <ul className="footer-links">
                  <li><a href="http://localhost:3000/home">AudioBooks</a></li>
                  <li><a href="http://localhost:3000/home">Podcasts</a></li>
                  <li><a href="http://localhost:3000/home">Novels</a></li>
                  <li><a href="http://localhost:3000/home">AutoBiographies</a></li>
                  <li><a href="http://localhost:3000/home">Textbooks</a></li>
                  
                </ul>
              </div> */}
    
              
            </div>
            
          </div>
          <div className="container">
            <div className="row mt-2">
              <div className="col-md-8 col-sm-6 col-xs-12">
              
                <p className="copyright-text">Copyright &copy; 2021 All Rights Reserved 
               
             <a className="d-md-inline-block d-none mx-1"  href="http://localhost:3000/home"> BookStore</a>.
                </p>
              </div>
    
              <div className="col-md-4 col-sm-6 col-xs-12">
                <ul className="social-icons">
                  <li><a className="facebook" href="http://localhost:3000/home"><i className="fa fa-facebook"></i></a></li>
                  <li><a className="twitter" href="http://localhost:3000/home"><i className="fa fa-twitter"></i></a></li>
                  <li><a className="dribbble" href="http://localhost:3000/home"><i className="fa fa-dribbble"></i></a></li>
                  <li><a className="linkedin" href="http://localhost:3000/home"><i className="fa fa-linkedin"></i></a></li>   
                </ul>
              </div>
            </div>
          </div>
          </div>
			);
	}
}


export default Footer