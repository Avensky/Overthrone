import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
import Character from './Character/Character';
import myClasses from './Characters.module.scss';
import classes from '../Pages.module.scss';
import NewCharacter from './NewCharacter/NewCharacter';
import * as actions from '../../../store/actions/index';




class Characters extends Component {

    componentDidMount() {
        console.log(this.props)
        this.props.onGetCharacters()
    }

    charClickedHandler = (id) => {
        //        this.setState({selectedPostId: id});
        // this.props.history.push('/blog');
        this.props.onDeleteChar(id);
            }

    render () {
        let characters = <p style={{textAlign: 'center'}}>Something went wrong!</p>

        if (!this.props.error) {
            characters = this.props.chars.map( char => {
                return (
                    <Character
                        key         = {char._id}                       
                        name        = {char.name}
                        age         = {char.age}
                        bio         = {char.bio}
                        relatives   = {char.relatives}
                        click     = {() => this.charClickedHandler(char._id)}
                    />
                )
            })
        }

        return(
            <Auxiliary>
                <div className="container">
                    <div className="page-header text-center">
                        <h2>Characters</h2>
                    </div>
                </div>
                <div className={[classes.Card, myClasses.Characters].join(' ')}>
                    {characters}
                    <NewCharacter />
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