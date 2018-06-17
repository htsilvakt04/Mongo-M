import React from 'react';
class TableHead extends React.Component {
    render () {
        return (
            <thead>
            <tr>
                {this.props.children}
            </tr>
            </thead>
        )
    }
}
export default TableHead;