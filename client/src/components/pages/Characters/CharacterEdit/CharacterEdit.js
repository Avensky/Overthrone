import React, { Component } from 'react';
import {connect} from 'react-redux';
//import Auxiliary from '../../../../hoc/Auxiliary';
import classes from '../../Pages.module.scss';
import * as actions from '../../../../store/actions/index';


class CharacterEdit extends Component {
    state = {
        characterForm:{
            name: {
                value: '',
                validation: {
                    required: true,
                }
            },
            age: {
                value: '',
                validation: {
                    required: true,
                }
            },
            bio: {
                value: '',
                validation: {
                    required: true,
                }
            },
            relatives: {
                value: '',
                validation: {
                    required: false,
                }
            }
        },
        error: null,
        id: null,
        loadedItem: null
    }

    componentDidMount () {
        console.log(this.props);
        this.loadData();
        if (!this.props.char){
            this.props.history.push('/characters');
        }
    }


    loadData () {
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedItem || (this.state.loadedItem && this.state.loadedItem.id !== +this.props.match.params.id) ) {
                const itemId = this.props.match.params.id;
                this.props.onGetCharById(itemId);
                this.setState({ loadedItem: this.props.char });
                console.log("char: " + this.props.char)
            }
        }
    }



    updateCharHandler = (event) => {
        event.preventDefault();
        //this.props.onSetAuthRedirectPath('/checkout');
//        this.props.history.push('/characters');
//         const author =  this.props.payload.username;
        this.props.onUpdateChar(
            this.state.characterForm.name.value, 
            this.state.characterForm.age.value, 
            this.state.characterForm.relatives.value, 
            this.state.characterForm.bio.value
        );
    }
    render () {       
        let form = <p style={{textAlign: 'center'}}>Please Select a Character!</p>;
        
        if ( this.props.match.params.id ) {
            form = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }

        if ( this.state.loadedItem) {
        form = (
            <form onSubmit={this.updateCharHandler}>
                <legend>Update a Character</legend>
                <label>Name</label>
                <input 
                    type        = "text"
                    name        = "name"
                    placeholder = {this.props.char.name} 
                    onChange    = {(event) => this.inputChangedHandler( event, "name")}
               
                />
                <label>Age</label>
                <input 
                    type="text" 
                    onChange={(event) => this.inputChangedHandler( event, "age")}
             
                />
                <label>Relatives</label>
                <input 
                    type="text" 
                    onChange={(event) => this.inputChangedHandler( event, "relatives")}
                
                />
                <label>Bio</label>
                <textarea
                    type="textarea"
                    rows="4" 
                    onChange={(event) => this.inputChangedHandler( event, "bio")}/>
                <button className={classes.btn}>Add Character</button>
            </form>
        )}

        

        return(
            <form onSubmit={this.updateCharHandler}>
            <legend>Update a Character</legend>
            <label>Name</label>
            <input 
                type="text" 
                onChange={(event) => this.inputChangedHandler( event, "name")}
           
            />
            <label>Age</label>
            <input 
                type="text" 
                onChange={(event) => this.inputChangedHandler( event, "age")}
         
            />
            <label>Relatives</label>
            <input 
                type="text" 
                onChange={(event) => this.inputChangedHandler( event, "relatives")}
            
            />
            <label>Bio</label>
            <textarea
                type="textarea"
                rows="4" 
                onChange={(event) => this.inputChangedHandler( event, "bio")}/>
            <button className={classes.btn}>Add Character</button>
        </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        chars   : state.char.characters,
        char    : state.char.charById
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCharById: (id) => dispatch( actions.getCharById(id)),
        onDeleteChar: (id) => dispatch( actions.deleteChar(id)),
        onUpdateChar: (id, name, age, relatives, bio) => dispatch(actions.updateChar(id, name, age, relatives, bio))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(CharacterEdit);