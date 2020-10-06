import React, { Component, useEffect } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
//import Character from './Character/Character';
import myClasses from './Characters.module.scss';
import classes from '../Pages.module.scss';
//import NewCharacter from './NewCharacter/NewCharacter';
import * as actions from '../../../store/actions/index';
//import CharacterEdit from './CharacterEdit/CharacterEdit';
import Character from './Character/Character';
//import { Route, Switch } from 'react-router-dom';
import Search from '../../Search/Search';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner'


const Characters = props => {
    // state = {
    //     characters : [],
    //     order: true, 
    //     sortedData: 'name asc'
    // }

    //componentDidMount () {
    //    props.onGetCharacters();
    //    let chars = props.chars
    //    setState({characters : chars});
    //}
    const { onGetCharacters } =  props;
    useEffect(() => {
        props.onGetCharacters()
    }, [onGetCharacters]);

    const deleteCharHandler = (id) => {
        props.onDeleteChar(id);
    }
// 
    // const getSortedData =() => {
    //     if (state.sortedData !== 'name asc') {
    //         sortAlphHandler()
    //         setState({order: true, sortedData: 'name asc' });
    //     } else {
    //         sortAlphDescHandler()
    //     }
    // }
// 
    // const sortAlphHandler = () => {
    //     let chars = props.chars
    //     chars.sort(function(a, b){
    //         if(a.name < b.name) { return -1; }
    //         if(a.name > b.name) { return 1; }
    //         return 0;
    //     })
    //     setState({characters : chars});
    //     console.log("characters: " + state.characters)
    // }
// 
    // const sortAlphDescHandler = () => {
    //     let chars = props.chars
    //     chars.sort(function(a, b){
    //         if(a.name < b.name) { return -1; }
    //         if(a.name > b.name) { return 1; }
    //         return 0;
    //     })
    //     const reversed = chars.reverse();
    //     setState({characters : reversed, order: true, sortedData: 'name desc'});
    // }
// 
    // const getSortedNum = () => {
    //         
    //     if (state.sortedData !== 'num asc') {
    //         //sortAlphDescHandler()
    //         sortNumHandler()
    //         setState({order: true, sortedData: 'num asc' });
    //     } else {
    //         sortNumDescHandler()
    //         //sortAlphHandler()
    //         //setState({order: true, sortedData: 'num desc' });
    //     }
    // }
// 
    // const sortNumHandler = () => {
    //     let chars = props.chars
    //     chars.sort(function(a, b) {
    //         return (a.age === "") - (b.age === "") || a.age - b.age;
    //     });          
    //     setState({characters : chars});
    //     console.log("num asc: " + chars)
    // }
// 
    // const sortNumDescHandler = () => {
    //     let chars = props.chars
    //     chars.sort(function(a, b) {
    //         return (a.age === "") - (b.age === "") || a.age - b.age;
    //     });    
    //     let reversed = chars.reverse();
    //     setState({characters : reversed, order: true, sortedData: 'num desc' });
    //     console.log("num desc: " + reversed)
    // }
        let characters = <Spinner />;
        //characters = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if (!props.loading) {
            characters = props.chars.map( char => {
                return (
                    <Character
                        key         = {char._id}  
                        id          = {char._id}          
                        name        = {char.name}
                        age         = {char.age}
                        bio         = {char.bio}
                        relatives   = {char.relatives}
                        deleteClick  = {() => deleteCharHandler(char._id)}
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
                <Search className={myClasses.Search} />
                {characters}
{/*                 {props.children}
               <Switch>
                        <Route path="/characters" exact component={CharacterList} />
                        <Route path="/characters/characterEdit/:id"   exact   component={CharacterEdit} />
                        <Route render={() => <h1>Not found</h1>}/>
                        <Redirect from="/" to="/posts" />
                        <Route path="/" component={Posts} /> 
                </Switch> */}                
            
                </div>
               
            </Auxiliary>
        )
    
}

const mapStateToProps = state => {
    return {
        chars   : state.char.characters,
        loading : state.char.loading,
        //getCharById: state.char.getCharById
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCharacters: () => dispatch( actions.getCharacters()),
        // onGetCharById: (id) => dispatch( actions.getCharById(id)),
        // onDeleteChar: (id) => dispatch( actions.deleteChar(id))
    }
}

export default connect (
    mapStateToProps, 
    mapDispatchToProps
    )(withErrorHandler(Characters, axios));