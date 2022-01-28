import React from 'react';
import {Navbar , Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import classes from './NavigationBar.module.css';

const NavigationBar = (props) => {
    return (
        <div className={classes.Root}>
            <Navbar dir="rtl" className={classes.NavBarDige}>
                {/* <Nav>
                <Nav.Link> */}
                {!props.isAuthenticated
                    ?
                    <Link to="/">
                        <Button variant="link" className={classes.NavBarButtons}>ورود</Button>
                    </Link>
                    :
                    <Link to="/logout">
                        <Button variant="link" className={classes.NavBarButtons}>خروج</Button>
                    </Link>
                }
                {/* </Nav.Link>
                </Nav> */}
            </Navbar>
        </div>
    );
}

export default NavigationBar;