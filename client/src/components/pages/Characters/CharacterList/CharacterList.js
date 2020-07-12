import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../../hoc/Auxiliary';
import Character from '../Character/Character';
import myClasses from './CharacterList.module.scss';
//import classes from '../../Pages.module.scss';
import NewCharacter from '../NewCharacter/NewCharacter';
import * as actions from '../../../../store/actions/index';
//import CharacterEdit from './CharacterEdit/CharacterEdit';
//import { Route, Switch } from 'react-router-dom';




class Characters extends Component {
    state = {
        characters : []
    }

    componentDidMount() {
        console.log(this.props)
        
        const characters = this.props.chars;
        const updatedChars = characters.map( char => {
            return {
                ...char,
            }
        });
        this.setState({ characters: updatedChars})
    }

    deleteCharHandler = (id) => {
        this.props.onDeleteChar(id);
    }

    render () {
        let chars = <p style={{textAlign: 'center'}}>Something went wrong!</p>

        if (!this.props.error) {
            chars = this.props.chars.map( char => {
                return (
                    <Character
                        key         = {char._id}  
                        id          = {char._id}          
                        name        = {char.name}
                        age         = {char.age}
                        bio         = {char.bio}
                        relatives   = {char.relatives}
                        deleteClick  = {() => this.deleteCharHandler(char._id)}
                    />
                )
            })
        }

        return(
            <Auxiliary>
                <div className={myClasses.Items}>
                    <div className={['box', myClasses.Items ].join(' ')}></div>
                    <NewCharacter />
                    {chars}
                </div>

            </Auxiliary>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        chars : state.char.characters,
        getCharById: state.char.getCharById
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCharacters: () => dispatch( actions.getCharacters()),
        onGetCharById: (id) => dispatch( actions.getCharById(id)),
        onDeleteChar: (id) => dispatch( actions.deleteChar(id))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Characters);