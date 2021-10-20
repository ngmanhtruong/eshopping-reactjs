import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Thankyou extends Component {
    render() {
        return (
            <div className="container text-center">
                <h3>Thanks for using my website!</h3>
                <h2>
                    <Link to = "/"><a >Bring me back Home</a></Link>
                </h2>
            </div>
        );
    }
}

export default Thankyou;