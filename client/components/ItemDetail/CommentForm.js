import React from 'react';
import {handleAddReview} from '../../actions/items';
import {connect} from 'react-redux'
class CommentForm extends React.Component {
    state = {
        review: '',
        name: '',
        stars: 5
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let item = this.props.item;
        this.setState(() => ({review: '', name: ''}));

        this.props.dispatch(
            handleAddReview({...this.state, id: item._id})
        )
    }

    handleChange = (event) => {
        let val = event.target.value;
        switch (event.target.name) {
            case 'review':
                return this.setState(() => ({review: val}));
            case 'name':
                return this.setState(() => ({name: val}));
            case 'stars':
                return this.setState(() => ({stars: val}));
        }
    }

    checkDisable = () => {
        return this.state.review.trim() === '' || this.state.name.trim() === '';
    }
    render () {
        let item = this.props.item;

        return (
            <div className="well">
                <h4>Add a Review:</h4>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <div className="form-group">
                        <label htmlFor="review">Review:</label>
                        <textarea value={this.state.review} name="review" className="form-control" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input value={this.state.name} type="text" className="form-control" id="name" name="name" placeholder="Enter display name"/>
                    </div>
                    <div className="form-group">

                        <label className="radio-inline">
                            <input type="radio" name="stars" id="stars" value="1"/> 1 star
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="stars" id="stars" value="2"/> 2 star
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="stars" id="stars" value="3"/> 3 star
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="stars" id="stars" value="4"/> 4 star
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="stars" id="stars" value="5" defaultChecked /> 5 star
                        </label>
                    </div>
                    <button disabled={this.checkDisable()} type="submit" className="btn btn-primary">Submit Review</button>
                </form>
            </div>
        )
    }
}
export default connect()(CommentForm);