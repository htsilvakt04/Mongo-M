import React from 'react';
import {PropTypes} from 'prop-types';

class Loading extends React.Component {
    state = {
        label: this.props.label
    }

    componentDidMount () {
        const { label, intervalTime } = this.props;
        let stopper = label + '...';

        this.interval = setInterval(() => {
            this.state.label === stopper
                ? this.setState(() => ({label}))
                : this.setState( prevState  => ({label: prevState.label + '.'}) )
        }, intervalTime);
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    render () {
        return (
            <p className='loading-label' style={this.props.style}>{this.state.label}</p>
        )
    }
    static propTypes = {
        label: PropTypes.string.isRequired,
        style: PropTypes.object.isRequired,
        intervalTime: PropTypes.number.isRequired
    }
    static defaultProps = {
        label: 'Loading',
        style: {color: '#00D1B2', textAlign: 'center'},
        intervalTime: 200
    }
}

export default Loading;