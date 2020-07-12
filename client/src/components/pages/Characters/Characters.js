import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
//import Character from './Character/Character';
import myClasses from './Characters.module.scss';
import classes from '../Pages.module.scss';
//import NewCharacter from './NewCharacter/NewCharacter';
import * as actions from '../../../store/actions/index';
import CharacterEdit from './CharacterEdit/CharacterEdit';
import CharacterList from './CharacterList/CharacterList';
import { Route, Switch } from 'react-router-dom';




class Characters extends Component {
    state = {
        characters : []
    }

    componentDidMount () {
        this.props.onGetCharacters();
    }




    render () {

        return(
            <Auxiliary>
                <div className="container">
                    <div className="page-header text-center">
                        <h2>Characters</h2>
                    </div>
                </div>
                <div className={[classes.Card, myClasses.Characters].join(' ')}>
                {this.props.children}
                <Switch>
                        <Route path="/characters" exact component={CharacterList} />
                        <Route path="/characters/characterEdit/:id"   exact   component={CharacterEdit} />
                        <Route render={() => <h1>Not found</h1>}/>
                        {/* <Redirect from="/" to="/posts" /> */}
                        {/* <Route path="/" component={Posts} /> */}
                </Switch>
                
            
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