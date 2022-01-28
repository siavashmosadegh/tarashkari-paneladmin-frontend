import React , {Component} from 'react';
import Layout from './components/Layout/Layout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

//import Auth from './containers/Auth/Auth';
class App extends Component {

    componentDidMount () {
        this.props.onTryAutoSignup();
    }

    render () {
        return (
            <div>
                <Layout />
                {/* <Auth /> */}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState)
    };
};

export default connect(null,mapDispatchToProps)(App);