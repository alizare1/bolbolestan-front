import React, { Fragment } from 'react';
import { Navbar } from 'react-bootstrap';

function Footer(props) {
    return (
        <Navbar className='footer' fixed='bottom'>
             <div>
                 <i className="flaticon-copyright"></i>
                 <span>دانشگاه تهران-سامانه جامع بلبل‌ستان</span>
             </div>
             <div>
                 <i className="flaticon-facebook"></i>
                 <i className="flaticon-linkedin-logo"></i>
                 <i className="flaticon-instagram"></i>
                 <i className="flaticon-twitter-logo-on-black-background"></i>
             </div>
        </Navbar>
    );
}


export default Footer;
