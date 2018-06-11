import React, {Fragment} from 'react';
import CategoryList from './CategoryList';
import LeftBreadcrum from './LeftBreadcrum';
import ListItem from './ListItem';

class HomePage extends React.Component {
    render () {
        return (
            <Fragment>
                <div  className="container">
                    <LeftBreadcrum/>
                    <CategoryList/>
                    <ListItem/>
                </div>
            </Fragment>
        )
    }
}
export default HomePage;