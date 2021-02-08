import React, { useEffect } from 'react';
import {connect} from 'react-redux';
// import Auxiliary from '../../../hoc/Auxiliary';
// import Character from './Character/Character';
import myClasses from './Characters.module.scss';
import classes from '../Pages.module.scss';
// import NewCharacter from './NewCharacter/NewCharacter';
import * as actions from '../../../store/actions/index';
// import CharacterEdit from './CharacterEdit/CharacterEdit';
import Character from './Character/Character';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner'


const Characters = props => {
    // const { onGetCharacters } =  props;

    // useEffect(() => {
    //     props.onGetCharacters()
    // }, [onGetCharacters]);

    useEffect(() => {
        const fetchData = async () => {
            props.onGetCharacters()
        };
        if ( props.chars.length === 0 ){
          fetchData()
        }
      }, [])


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
        <div className={[classes.Card, myClasses.Characters].join(' ')}>
            <div className="container">
                <div className="page-header text-center">
                    <h1>Characters</h1>
                </div>
            </div>
        {characters}
        </div>
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
    )(Characters, axios);