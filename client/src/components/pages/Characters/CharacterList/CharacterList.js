import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../../hoc/Auxiliary';
import Character from '../Character/Character';
import myClasses from './CharacterList.module.scss';
import classes from '../../Pages.module.scss';
import NewCharacter from '../NewCharacter/NewCharacter';
import * as actions from '../../../../store/actions/index';
//import CharacterEdit from './CharacterEdit/CharacterEdit';
//import { Route, Switch } from 'react-router-dom';
import Search from '../../../Search/Search';

class Characters extends Component {
    state = {
        characters : []
    }

    componentDidMount () {
        this.props.onGetCharacters();
        this.sortAlphHandler();
    }

    componentDidUpdate () {
        
    }

    deleteCharHandler = (id) => {
        this.props.onDeleteChar(id);
    }

    sortAlphHandler = () => {
        let chars = this.props.chars

        chars.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
        this.setState({characters : chars});
        console.log("characters: " + this.state.characters)
    }

    sortAlphDescHandler = () => {
        let chars = this.state.characters
        const reversed = chars.reverse();
        this.setState({characters : reversed});
    }

    render () {
        let characters = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if (!this.props.error) {
            
            characters = this.state.characters.map( char => {
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
                    {/* <NewCharacter /> */}
                    <div className={classes.spread}>
                    <Search className={myClasses.Search} />
                    <div className={myClasses.dropdown}>
                        <button className={myClasses.dropbtn}>OrderBy: </button>
                        <div className={myClasses.dropdownContent}>
                            <a onClick={this.sortAlphDescHandler}>Alphabetical</a>
                            <a href="/price">Price</a>
                            <a href="/date">Most recent</a>
                            <a href="/popular">Most Popular</a>
                        </div>
                    </div>
                </div>
                    {characters}
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