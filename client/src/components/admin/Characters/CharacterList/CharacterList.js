import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../../hoc/Auxiliary';
import Character from '../Character/Character';
import myClasses from './CharacterList.module.scss';
//import classes from '../../Pages.module.scss';
//import NewCharacter from '../NewCharacter/NewCharacter';
import * as actions from '../../../../store/actions/index';
//import CharacterEdit from './CharacterEdit/CharacterEdit';
//import { Route, Switch } from 'react-router-dom';
// import Search from '../../../Search/Search';

class Characters extends Component {
    state = {
        characters : [],
        order: true, 
        sortedData: 'name asc'
    }

    componentDidMount () {
        this.props.onGetCharacters();
        let chars = this.props.chars
        this.setState({characters : chars});
    }

    deleteCharHandler = (id) => {
        this.props.onDeleteChar(id);
    }

    getSortedData =() => {
        if (this.state.sortedData !== 'name asc') {
            this.sortAlphHandler()
            this.setState({order: true, sortedData: 'name asc' });
        } else {
            this.sortAlphDescHandler()
        }
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
        let chars = this.props.chars
        chars.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
        const reversed = chars.reverse();
        this.setState({characters : reversed, order: true, sortedData: 'name desc'});
    }

    getSortedNum = () => {
            
        if (this.state.sortedData !== 'num asc') {
            //this.sortAlphDescHandler()
            this.sortNumHandler()
            this.setState({order: true, sortedData: 'num asc' });
        } else {
            this.sortNumDescHandler()
            //this.sortAlphHandler()
            //this.setState({order: true, sortedData: 'num desc' });
        }
    }

    sortNumHandler = () => {
        let chars = this.props.chars
        chars.sort(function(a, b) {
            return (a.age === "") - (b.age === "") || a.age - b.age;
        });          
        this.setState({characters : chars});
        console.log("num asc: " + chars)
    }

    sortNumDescHandler = () => {
        let chars = this.props.chars
        chars.sort(function(a, b) {
            return (a.age === "") - (b.age === "") || a.age - b.age;
        });    
        let reversed = chars.reverse();
        this.setState({characters : reversed, order: true, sortedData: 'num desc' });
        console.log("num desc: " + reversed)
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
                    {/* <div className={['box', myClasses.Items ].join(' ')}></div>
                    {/* <NewCharacter /> */}
                    {/*  <div className={classes.spread}>*/}
                    
                    
                    {/*
                    <div className={myClasses.dropdown}>
                        <button className={myClasses.dropbtn}>OrderBy: </button>
                        <div className={myClasses.dropdownContent}>
                            <a onClick={this.getSortedData}>Alphabetical</a>
                            <a onClick={this.getSortedNum}>Age</a>
                        </div>
                    </div>
                    */}
                {/* </div> */}
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