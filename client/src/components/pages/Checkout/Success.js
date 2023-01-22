import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import classes from '../Pages.module.scss';
import myClasses from './Checkout.module.scss';
import Auxiliary from '../../../hoc/Auxiliary';
import { useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

const Success = props => {    
    const history = useHistory();
    useEffect(() => {
        localStorage.removeItem('addedItems');
    },[]);

    return (
        <Auxiliary>
            <div className={[classes.Card, myClasses.Shop].join(' ')}>
                <div className={myClasses.Cart}>
                    {/* Title */}
                    <div className="container">
                        <div className="page-header text-center border-bottom">
                            <h1>Checkout</h1>
                        </div>
                    </div>
                    <div className={myClasses.Progress}>    
                        <title>Thanks for your order!</title>
                    
                        <h1>Thanks for your order!</h1>
                        <p>
                            We appreciate your business!
                            If you have any questions, please email
                            <a href="mailto:orders@example.com">orders@example.com</a>.
                        </p>
                    </div>
                </div>
            </div>
        </Auxiliary>
    );
};



const mapStateToProps = (state)=>{
    return{
        items: state.cart.addedItems,
        isAuth: state.auth.payload
        //addedItems: state.addedItems
    };
};

const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem       : (id)=>{dispatch(actions.removeFromCart(id))},
        addQuantity      : (id)=>{dispatch(actions.addQuantity(id))},
        subQuantity      : (id)=>{dispatch(actions.subQuantity(id))}
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Success);