import React , {Component} from 'react';
import {Button} from 'react-bootstrap';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

class Auth extends Component {
    state = {
        loginForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'نام کاربری'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'گذرواژه'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.loginForm.username.value,
            this.state.loginForm.password.value
        );
    }
    
    // orderHandler = ( event ) => {
    // event.preventDefault();
    // this.setState( { loading: true } );
    // const formData = {};
    // for (let formElementIdentifier in this.state.loginForm) {
    //     formData[formElementIdentifier] = this.state.loginForm[formElementIdentifier].value;
    // }
    // const order = {
    //     ingredients: this.props.ingredients,
    //     price: this.props.price,
    //     orderData: formData
    // }
    // axios.post( '/registers.json', order )
    //     .then( response => {
    //         this.setState( { loading: false } );
    //         this.props.history.push( '/' );
    //     } )
    //     .catch( error => {
    //         this.setState( { loading: false } );
    //     } );
    // }
    
    checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
    }
    
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedloginForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = { 
            ...updatedloginForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedloginForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedloginForm) {
            formIsValid = updatedloginForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({loginForm: updatedloginForm, formIsValid: formIsValid});
    }
    
    render () {
    
        const formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }
        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <div className={classes.LoginButtonDiv}>
                    {/* <Link to="/afterloginorregister"> */}
                        <Button 
                            variant="success" 
                            className={classes.LoginButton} 
                            onClick={this.submitHandler} 
                            disabled={!this.state.formIsValid}>ورود
                        </Button>
                    {/* </Link> */}
                </div>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="/orders" />
        }

        return (
            <div className={classes.root}>
                <NavigationBar isAuthenticated={this.props.isAuthenticated} /> 

                <div className={classes.DivBelowNav}>

                    <div className={classes.imageDiv}>
                        <img src="/images/lathe6.jpg" alt="aks" className={classes.image}/>
                    </div>

                    <div className={classes.authDiv}>
                        <div className={classes.Auth}>
                            <h1 className={classes.FirstHeader}>به پنل ادمین خوش آمدید</h1>
                            {authRedirect}
                            {errorMessage}
                            {form}
                        </div>
                    </div>

                </div>
            
    
                {/* <h6 className={classes.SecondHeader}>اگر هنوز حساب کاربری ایجاد نکردید دکمه ی پایین را بزنید تا به صفحه ی ایجاد حساب کاربری منقتل شوید</h6> */}    
                {/* <div className={classes.GoToRegisterButtonDiv}>
                    <Link to="/register"> 
                        <Button variant="warning" className={classes.GoToRegisterButton}>هدایت به صفحه ی ایجاد حساب</Button>
                    </Link> 
                </div> */}
                {/* <div className={classes.Auth}>
                    {authRedirect}
                    {errorMessage}
                    {form}
                </div> */}

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,pass) => dispatch(actions.auth(email,pass))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);