import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
//import Auxiliary from '../../../../hoc/Auxiliary';
import classes from '../../Pages.module.scss';
import myClasses from './ItemEdit.module.scss';
import * as actions from '../../../../store/actions/index';
import PropTypes from 'prop-types';

const ItemEdit =()=> {
    const [name, setName]=useState({
                //value: props.item.name,
                validation: {
                    required: true,
                }
            });

    const [age, setAge] = useState({
                //value: props.item.age,
                validation: {
                    required: true,
                }
            });

    const [bio, setBio] = useState({
                //value: props.item.bio,
                validation: {
                    required: true,
                }
            });

    const [relatives, setRelatives]=useState( {
                //value: props.item.relatives,
                validation: {
                    required: false,
                }
            });
    const [error, setError] = useState({error:null});
    const [id, setID] = useState({id:null});
    const [loadedItem, setLoadedItem] = useState({loadedItem:null});


    useEffect( () => {
        console.log(props);
        loadData();
        if (!props.item){
            props.history.push('/items');
        };
    });


    const loadData = () => {
        if ( props.match.params.id ) {
            if ( !state.loadedItem || (state.loadedItem && state.loadedItem.id !== +props.match.params.id) ) {
                const itemId = props.match.params.id;
                props.onGetItemById(itemId);
                setState({ loadedItem: props.item });
                console.log("item: " + props.item);
            };
        };
    };

    updateItemHandler = (event) => {
//        event.preventDefault();
        //props.onSetAuthRedirectPath('/checkout');
//        props.history.push('/items');
//         const author =  props.payload.username;
        props.onUpdateItem(
            state.itemForm.name.value, 
            state.itemForm.age.value, 
            state.itemForm.relatives.value, 
            state.itemForm.bio.value
        );
    };

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...state.itemForm,
            [controlName]: {
                ...state.itemForm[controlName],
                value: event.target.value,
//                valid: checkValidity( event.target.value, state.itemForm[controlName].validation ),
                touched: true
            },
            date: {
                ...state.itemForm.date,
                value: new Date()
            }
        };
        setState( { itemForm: updatedControls } );
    };

    deleteItemHandler = () => {
        const id = props.item._id;
        console.log(id);
        props.onDeleteItem(id);
    };
  
        let form = <p style={{textAlign: 'center'}}>Please Select a Item!</p>;
        
        if ( props.match.params.id ) {
            form = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }

        if ( state.loadedItem) {
        form = (
            <form onSubmit={updateItemHandler}>
                <legend>Update a Item</legend>
                <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Name: </label>
                    <input 
                        type                = "text"
                        name                = "name"
                        //value       = {props.item.name} 
                        defaultValue        = {props.item.name}
                        className           ={myClasses.Right}
                        onChange            = {(event) => inputChangedHandler( event, "name")}
                    />
                </div>
                <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Age: </label>
                    <input 
                        type                ="text" 
                        defaultValue        = {props.item.age}
                        className           ={myClasses.Right}
                        onChange            ={(event) => inputChangedHandler( event, "age")}
                
                    /> 
                </div>
                 <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Bio: </label>
                    <textarea
                        type                ="textarea"
                        defaultValue        = {props.item.bio}
                        className           ={myClasses.Right}
                        rows                ="4" 
                        onChange            ={(event) => inputChangedHandler( event, "bio")}/>
                </div>
                <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Relatives: </label>
                    <input 
                        type                = "text" 
                        defaultValue        = {props.item.relatives}
                        className           ={myClasses.Right}
                        onChange            ={(event) => inputChangedHandler( event, "relatives")}
                    
                    />
                </div>
                <div className="MidLine">
                    <button 
                        className={["btn-warning", classes.btn].join(' ')}
                        onClick={() => updateItemHandler()}
                    >UPDATE</button>
                    <button 
                        className={["btn-danger", classes.btn].join(' ')}
                        onClick={() => deleteItemHandler()}
                    >DELETE</button>
                </div>
            </form>
        );}

        

        return(
            form
        );
    
};

const mapStateToProps = state => {
    return {
        items   : state.shop.items,
        item    : state.shop.itemById
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetItemById: (id) => dispatch( actions.getItemById(id)),
        onDeleteItem: (id) => dispatch( actions.deleteItem(id)),
        onUpdateItem: (id, name, age, relatives, bio) => dispatch(actions.updateItem(id, name, age, relatives, bio))
    };
};

ItemEdit.propTypes={
    item:PropTypes.any,
    history:PropTypes.any,
    match:PropTypes.any,
    getItemById:PropTypes.func,
    onGetItemById:PropTypes.func,
    onUpdateItem:PropTypes.func,
    onDeleteItem:PropTypes.func,
};

export default connect (mapStateToProps, mapDispatchToProps)(ItemEdit);