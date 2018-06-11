import React from 'react';
import {Fragment} from 'react';
import {Link} from 'react-router-dom';

class Items extends React.Component {
    render () {
        let items = this.props.items;
        return (
            items.map( item => {
                let id = item._id;

                return (
                    <Fragment key={id}>
                        <div className="row">
                            <div className="col-md-7">
                                <Link to={'item/' + id}>
                                    <img className="img-responsive" src={'/static/' + item.img_url} alt=""/>
                                </Link>
                            </div>
                            <div className="col-md-5">
                                <h3><Link to={'item/' + id}>{item.title}</Link></h3>
                                <h4>{item.slogan}</h4>
                                <p>{item.description}</p>
                                <Link className="btn btn-primary" to={'item/' + id}>View Product <span className="glyphicon glyphicon-chevron-right"></span></Link>
                            </div>
                        </div>
                        <hr/>
                    </Fragment>
                )
            })
        )
    }
}

export default Items;