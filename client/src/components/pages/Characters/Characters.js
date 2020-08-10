import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
//import Character from './Character/Character';
import myClasses from './Characters.module.scss';
import classes from '../Pages.module.scss';
//import NewCharacter from './NewCharacter/NewCharacter';
import * as actions from '../../../store/actions/index';
import CharacterEdit from './CharacterEdit/CharacterEdit';
import Character from './Character/Character';
import { Route, Switch } from 'react-router-dom';
import Search from '../../Search/Search';

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
        if (this.state.characters) {
            
            characters = this.props.chars.map( char => {
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
                <div className="container">
                    <div className="page-header text-center">
                        <h2>Characters</h2>
                    </div>
                </div>
                <div className={[classes.Card, myClasses.Characters].join(' ')}>
                <Search className={myClasses.Search} />
                {characters}
                {this.props.children}
{/*                <Switch>
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