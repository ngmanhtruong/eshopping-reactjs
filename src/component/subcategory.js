import React, { Component } from 'react';

class SubCategory extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div id={this.props.category + "Cat"} className="panel-collapse collapse">
                <div className="panel-body">
                    <ul>
                        <li><a href="#">{this.props.sub1}</a></li>
                        <li><a href="#">{this.props.sub2}</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default SubCategory;