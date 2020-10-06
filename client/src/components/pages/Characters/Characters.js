import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../../hoc/Auxiliary';
//import Character from './Character/Character';
import myClasses from './Characters.module.scss';
import classes from '../Pages.module.scss';
//import NewCharacter from './NewCharacter/NewCharacter';
import * as actions from '../../../store/actions/index';
//import CharacterEdit from './CharacterEdit/CharacterEdit';
import Character from './Character/Character';
import Search from '../../Search/Search';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner'


const Characters = props => {
    const { onGetCharacters } =  props;
    useEffect(() => {
        props.onGetCharacters()
    }, [onGetCharacters]);

    const deleteCharHandler = (id) => {
        props.onDeleteChar(id);
    }

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
                </div>
               
            </Auxiliary>
        )
    
}

const mapStateToProps = state => {
    return {
        chars   : state.char.characters,
        loading : state.char.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCharacters: () => dispatch( actions.getCharacters())
    }
}

export default connect (
    mapStateToProps, 
    mapDispatchToProps
    )(withErrorHandler(Characters, axios));