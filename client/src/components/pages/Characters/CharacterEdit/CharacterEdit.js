import React, { Component } from 'react';
import {connect} from 'react-redux';
//import Auxiliary from '../../../../hoc/Auxiliary';
import classes from '../../Pages.module.scss';
import myClasses from './CharacterEdit.module.scss';
import * as actions from '../../../../store/actions/index';


class CharacterEdit extends Component {
    state = {
        characterForm:{
            name: {
                //value: this.props.char.name,
                validation: {
                    required: true,
                }
            },
            age: {
                //value: this.props.char.age,
                validation: {
                    required: true,
                }
            },
            bio: {
                //value: this.props.char.bio,
                validation: {
                    required: true,
                }
            },
            relatives: {
                //value: this.props.char.relatives,
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

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.characterForm,
            [controlName]: {
                ...this.state.characterForm[controlName],
                value: event.target.value,
//                valid: this.checkValidity( event.target.value, this.state.characterForm[controlName].validation ),
                touched: true
            },
            date: {
                ...this.state.characterForm.date,
                value: new Date()
            }
        };
        this.setState( { characterForm: updatedControls } );
    }

    deleteCharHandler = () => {
        const id = this.props.char._id;
        console.log(id)
        this.props.onDeleteChar(id)
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
                <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Name: </label>
                    <input 
                        type                = "text"
                        name                = "name"
                        //value       = {this.props.char.name} 
                        defaultValue        = {this.props.char.name}
                        className           ={myClasses.Right}
                        onChange            = {(event) => this.inputChangedHandler( event, "name")}
                    />
                </div>
                <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Age: </label>
                    <input 
                        type                ="text" 
                        defaultValue        = {this.props.char.age}
                        className           ={myClasses.Right}
                        onChange            ={(event) => this.inputChangedHandler( event, "age")}
                
                    /> 
                </div>
                 <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Bio: </label>
                    <textarea
                        type                ="textarea"
                        defaultValue        = {this.props.char.bio}
                        className           ={myClasses.Right}
                        rows                ="4" 
                        onChange            ={(event) => this.inputChangedHandler( event, "bio")}/>
                </div>
                <div className = {myClasses.Line}>
                    <label className={myClasses.Left}>Relatives: </label>
                    <input 
                        type                = "text" 
                        defaultValue        = {this.props.char.relatives}
                        className           ={myClasses.Right}
                        onChange            ={(event) => this.inputChangedHandler( event, "relatives")}
                    
                    />
                </div>
                <div className="MidLine">
                    <button 
                        className={["btn-warning", classes.btn].join(' ')}
                        onClick={() => this.updateCharHandler()}
                    >UPDATE</button>
                    <button 
                        className={["btn-danger", classes.btn].join(' ')}
                        onClick={() => this.deleteCharHandler()}
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