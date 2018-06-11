import React from 'react';

class Heading extends React.Component {
    render () {
        let item = this.props.item;
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h1 style={{marginTop: '0px'}} className="page-header">{item.title}
                        <small>   {item.slogan}</small>
                    </h1>
                </div>
            </div>
        )
    }
}
export default Heading;