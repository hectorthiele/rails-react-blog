import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="main-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="logo">
                  <h6 className="text-white">Hodinkee Blog</h6>
                </div>
                <div className="contact-details">
                  <p>Encarnación, Itapúa, Paraguay</p>
                  <p>Phone: 0985 737 632  </p>
                  <p>Email: <a href="hector.thiele@gmail.com">hector.thiele@gmail.com</a></p>
                  {/*<ul className="social-menu">*/}
                  {/*  <li className="list-inline-item"><a href=""><i className="fa fa-facebook"></i></a></li>*/}
                  {/*  <li className="list-inline-item"><a href="#"><i className="fa fa-twitter"></i></a></li>*/}
                  {/*</ul>*/}
                </div>
              </div>
              <div className="col-md-4">
                <div className="menus d-flex">
                  <ul className="list-unstyled">
                    <li><Link to={'/'}>Posts</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="copyrights">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <p>&copy; 2020. All rights reserved.</p>
                </div>
                <div className="col-md-6 text-right">
                  <p>Template By <a href="https://bootstrapious.com/p/bootstrap-carousel"  className="text-white">Bootstrapious</a>
                    </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
    );
};

export default Footer;