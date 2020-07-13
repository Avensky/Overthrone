import React, { Component } from 'react';
import {connect} from 'react-redux';
//import Auxiliary from '../../../../hoc/Auxiliary';
import classes from '../../Pages.module.scss';
import myClasses from './FaqEdit.module.scss';
import * as actions from '../../../../store/actions/index';


class FaqEdit extends Component {
    state = {
        faqForm:{
            question: {
                //value: this.props.faq.name,
                validation: {
                    required: true,
                }
            },
            answer: {
                //value: this.props.faq.age,
                validation: {
                    required: true,
                }
            },
        },
        error: null,
        id: null,
        loadedItem: null
    }

    componentDidMount () {
        console.log(this.props);
        this.loadData();
        if (!this.props.faq){
            this.props.history.push('/faqs');
        }
    }


    loadData () {
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedItem || (this.state.loadedItem && this.state.loadedItem.id !== +this.props.match.params.id) ) {
                const itemId = this.props.match.params.id;
                this.props.onGetFaqById(itemId);
                this.setState({ loadedItem: this.props.faq });
                console.log("faq: " + this.props.faq)
            }
        }
    }

    updateFaqHandler = (event) => {
//        event.preventDefault();
        //this.props.onSetAuthRedirectPath('/checkout');
//        this.props.history.push('/faqs');
//         const author =  this.props.payload.username;
        this.props.onUpdateFaq(
            this.state.faqForm.name.value, 
            this.state.faqForm.age.value, 
            this.state.faqForm.relatives.value, 
            this.state.faqForm.bio.value
        );
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.faqForm,
            [controlName]: {
                ...this.state.faqForm[controlName],
                value: event.target.value,
//                valid: this.checkValidity( event.target.value, this.state.faqForm[controlName].validation ),
                touched: true
            },
            date: {
                ...this.state.faqForm.date,
                value: new Date()
            }
        };
        this.setState( { faqForm: updatedControls } );
    }

    deleteFaqHandler = () => {
        const id = this.props.faq._id;
        console.log(id)
        this.props.onDeleteFaq(id)
    }

    render () {       
        let form = <p style={{textAlign: 'center'}}>Please Select a Faq!</p>;
        
        if ( this.props.match.params.id ) {
            form = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }

        if ( this.state.loadedItem) {
        form = (
            <form onSubmit={this.updateFaqHandler}>
                <legend>Update a Faq</legend>
                <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Name: </label>
                    <input 
                        type                = "text"
                        name                = "name"
                        //value       = {this.props.faq.name} 
                        defaultValue        = {this.props.faq.name}
                        className           ={myClasses.Right}
                        onChange            = {(event) => this.inputChangedHandler( event, "name")}
                    />
                </div>
                <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Age: </label>
                    <input 
                        type                ="text" 
                        defaultValue        = {this.props.faq.age}
                        className           ={myClasses.Right}
                        onChange            ={(event) => this.inputChangedHandler( event, "age")}
                
                    /> 
                </div>
                 <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Bio: </label>
                    <textarea
                        type                ="textarea"
                        defaultValue        = {this.props.faq.bio}
                        className           ={myClasses.Right}
                        rows                ="4" 
                        onChange            ={(event) => this.inputChangedHandler( event, "bio")}/>
                </div>
                <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Relatives: </label>
                    <input 
                        type                = "text" 
                        defaultValue        = {this.props.faq.relatives}
                        className           ={myClasses.Right}
                        onChange            ={(event) => this.inputChangedHandler( event, "relatives")}
                    
                    />
                </div>
                <div className="MidLine">
                    <button 
                        className={["btn-warning", classes.btn].join(' ')}
                        onClick={() => this.updateFaqHandler()}
                    >UPDATE</button>
                    <button 
                        className={["btn-danger", classes.btn].join(' ')}
                        onClick={() => this.deleteFaqHandler()}
                    >DELETE</button>
                </div>
            </form>
        )}

        

        return(
            form
        )
    }
}

const mapStateToProps = state => {
    return {
        faqs   : state.faq.faqs,
        faq    : state.faq.faqById
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetFaqById: (id) => dispatch( actions.getFaqById(id)),
        onDeleteFaq: (id) => dispatch( actions.deleteFaq(id)),
        onUpdateFaq: (id, name, age, relatives, bio) => dispatch(actions.updateFaq(id, name, age, relatives, bio))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(FaqEdit);