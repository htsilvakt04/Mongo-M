import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const RowWithCol = (props) => {
    return (
        <Fragment>
            <div className="row">
                <div className={props.col}>
                    {props.children}
                </div>
            </div>
        </Fragment>
    )
}

RowWithCol.propTypes = {
    col: PropTypes.string
}
RowWithCol.defaultProps = {
    col: "col-xs-12"
}

export default RowWithCol