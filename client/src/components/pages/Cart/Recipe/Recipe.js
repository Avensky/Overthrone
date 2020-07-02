import React, { Component } from 'react'
import { connect } from 'react-redux'
import myClasses from './Recipe.module.scss'
//import { addShipping } from './actions/cartActions'

import StripeCheckout from 'react-stripe-checkout';

class Recipe extends Component{
    
    componentWillUnmount() {
         if(this.refs.shipping.checked)
              this.props.substractShipping()
    }

    handleChecked = (e)=>{
        if(e.target.checked){
            this.props.addShipping();
        }
        else{
            this.props.substractShipping();
        }
    }

    render(){
  
        return(
            <div className={myClasses.Recipe}>
                <div className={myClasses.Collection}>
                    <label className="collection-item">
                        <input type="checkbox" ref="shipping" onChange= {this.handleChecked} />
                        <span>Shipping(+6$)</span>
                    </label>

                    <div className="collection-item"><b>Total: {this.props.total} $</b></div>
                    </div>
                    <div className="checkout">
{/*                 <button className="waves-effect waves-light btn">Checkout</button>              */}       
                        <StripeCheckout className="waves-effect waves-light btn" />
                    </div>
                 </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.addedItems,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recipe)
