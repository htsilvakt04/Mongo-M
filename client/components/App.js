import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Navbar from './shared/navbar';
import Loading from './shared/Loading';
import HomePage from './homepage/HomePage';
import LoginPage from './login';
import ItemDetail from './ItemDetail/ItemDetail';
import { handleInitialData } from '../actions';
import ScrollToTopRoute from './shared/ScrollToTopRoute';

class App extends React.Component {
    componentDidMount () {
        this.props.handleInitialData();
    }

    render () {
        if (this.props.loading) {
            return (
                <div  className="container">
                    <Loading intervalTime={200}/>
                </div>
            )
        }

        return (
            <BrowserRouter>
                <Route render={ ({ location, history }) => (
                    <div>
                        <Navbar location={location} history={history}/>

                        <TransitionGroup>
                            <CSSTransition key={location.key} classNames="fade" timeout={300}>
                                <Switch location={location}>
                                    <Route path="/login" component={LoginPage}/>
                                    <ScrollToTopRoute path="/item/:id" component={ItemDetail}/>
                                    <ScrollToTopRoute path="/:cat?" component={HomePage}/>
                                    <Route render={() => <h1>404</h1>}/>
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    </div>
                )} />
            </BrowserRouter>
        )

    }
}

function mapStateToProps({byIds}) {
    return { // checking the app is loading or not
        loading:  Object.keys(byIds).length < 1
    }
}
export default connect(mapStateToProps, { handleInitialData })(App);