import React , {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import PanelOrder from '../../components/PanelOrder/PanelOrder';
import Spinner from '../../components/UI/Spinner/Spinner';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import classes from './Orders.module.css';

class Orders extends Component {

    state = {
        orders: null
    }

    componentWillMount () {
        // axios.get('https://tarashkari-panel-admin-default-rtdb.firebaseio.com/Orders.json?auth='+localStorage.getItem("token"))
        axios.get('http://162.55.9.246/api/v1/admin/orders?auth='+localStorage.getItem("token"))
            .then(res => {
                console.log(this.props.token);
                const fetchedOrders = [];
                for (let key in res.data) {                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    });
                }
                console.log(fetchedOrders);
                this.setState({orders: fetchedOrders})
            })
            .catch(error => {
                console.log(error);
                console.log(this.props.token);
            });
    }

    render () {

        let mapOrders = <Spinner />

        let ordersList = [];

        if (this.state.orders != null) {
            console.log(this.state.orders);
            for (let id in this.state.orders) {
                ordersList.push(this.state.orders[id])
            }
            console.log(ordersList[0].repairables);
            console.log(ordersList[0].contactdata);
            console.log(ordersList[0].userId);
            console.log(ordersList[1]);
            console.log(ordersList[2]);
            mapOrders = ordersList.map( order => (
                <PanelOrder 
                    key={order.id}
                    repairables={order.repairables} 
                    contactdata={order.contactdata}
                    time={order.time}
                />
            ))
        }

        return (
            <div>
                <NavigationBar isAuthenticated={this.props.isAuthenticated}/>
                <div className={classes.Orders}>
                    {mapOrders}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Orders);