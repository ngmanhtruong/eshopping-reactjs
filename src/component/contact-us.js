import React, { Component } from 'react';

class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    handleChange = (ev) =>{
        this.setState({[ev.target.name]:ev.target.value});
    }
    handleSubmit = (ev) =>{
        ev.preventDefault();
    }
    render() {
        return (
            <div id="contact-page" className="container">
            <div className="bg">
                <div className="row">    		
                    <div className="col-sm-12">    			   			
                        <h2 className="title text-center">Contact <strong>Us</strong></h2>    			    				    				
                        <div id="gmap" className="contact-map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5541.7978852378765!2d106.72905687567304!3d10.83861887525653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d85e042bf04b%3A0xbb26baec1664394d!2zVGjhu6cgxJDhu6ljLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1630567356288!5m2!1svi!2s" width="100%" height="100%" style={{border: 0}} allowFullScreen="" loading="lazy"></iframe>
                        </div>
                    </div>			 		
                </div>    	
                <div className="row">  	
                    <div className="col-sm-8">
                        <div className="contact-form">
                            <h2 className="title text-center">Get In Touch</h2>
                            <div className="status alert alert-success" style={{display: "none"}}></div>
                            <form action="http://formsubmit.co/ng.manhtruong1996@gmail.com" method="POST" onSubmit={this.handleSubmit}>
                            {/* id="main-contact-form" className="contact-form row" name="contact-form"  */}
                                <div className="form-group col-md-6">
                                    <input type="text" name="name" className="form-control" required="required" placeholder="Name" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-md-6">
                                    <input type="email" name="email" className="form-control" required="required" placeholder="Email" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group col-md-12">
                                    <input type="hidden" name="_subject" value="Eshopping website email!"/>
                                </div>
                                <div className="form-group col-md-12">
                                    <textarea name="message" id="message" required="required" className="form-control" rows="8" placeholder="Your Message Here" onChange={this.handleChange}></textarea>
                                </div>
                                {/* <input type="hidden" name ="_next" value = "http://localhost:3000/thankyou"/> */}
                                <div className="form-group col-md-12">
                                    <button type="submit" className="btn btn-primary pull-right" method="POST">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="contact-info">
                            <h2 className="title text-center">Contact Info</h2>
                            <address>
                                <p>Mystic E-Shopper.</p>
                                <p>Thu Duc, Ho Chi Minh city</p>
                                <p>Vietnam</p>
                                <p>Email: ng.manhtruong1996@gmail.com</p>
                            </address>
                            <div className="social-networks">
                                <h2 className="title text-center">Social Networking</h2>
                                <ul>
                                    <li><a href="https://www.facebook.com/testarudo.nino" target="_blank"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="https://github.com/ngmanhtruong" target="_blank"><i className="fa fa-github"></i></a></li>
                                    <li><a href="https://www.aedin.com/in/ngmanhtruong/" target="_blank"><i className="fab fa-linkedin"></i></a></li>
                                    <li><a href="https://truongnguyen.surge.sh/" target="_blank"><i className="fas fa-portrait"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>    			
                </div>  
            </div>
        {/* <!--/#contact-page--> */}

        </div>
    
        );
    }
}

export default Contact;