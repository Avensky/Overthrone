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
import Spinner from '../../UI/Spinner/Spinner';
import PropTypes from 'prop-types';

const Characters = props => {
    // const { onGetCharacters } =  props;

    // useEffect(() => {
    //     props.onGetCharacters()
    // }, [onGetCharacters]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         props.onGetCharacters()
    //     };
    //     if ( props.chars.length === 0 ){
    //       fetchData()
    //     }
    // }, [])


    const deleteCharHandler = (id) => {
        props.onDeleteChar(id);
    };

        let characters = <Spinner />;
        //characters = <p style={{textAlign: 'center'}}>Something went wrong!</p>

        let chars  = [{"_id":"5f0af17941aaf15ea8443afe","name":"Agni Pyrani Rishroya","age":"19","relatives":"","bio":"Ambitious, maternal first cousin to Fia trained by her grandmother Bryndis to become the Lithe Bearer in case Fia was not worthy. She wants the throne.","__v":0},{"_id":"5f074cba74eed928d02ce2bd","name":"Ashkil Killmorn","age":"19","relatives":"","bio":"Ambitious, bullish, young Lithian noble from the most powerful aristocratic house who is a well-trained tactical Lithe Guard. Tall, broad with almond shaped eyes and a shock of grey hair, he’s determined to win the Lithe Blood.","__v":0},{"_id":"5f074cd174eed928d02ce2be","name":"Bryndis Pyrani Killmorn","age":"83","relatives":"","bio":"Lithura-31, Mother of Eira (Lithura-32), grandmother to Fia, practical Bryndis has wielded control of the Sovereignty for 50 years as Ra Elkun’s Shadows have restarted their attacks. She will do everything in her power to save the Worlds and control her family line.","__v":0},{"_id":"5f074cf874eed928d02ce2bf","name":"Eira Pyrani Dore","age":"","relatives":"","bio":"Lithura-32, Fia’s mother. Tall, athletic, black-haired, grey-eyed. Having married a politically unpopular consort, Eira has lived in exile on Earth with her family to bear and train the next Lithe Bearer.","__v":0},{"_id":"5f074d1c74eed928d02ce2c0","name":"Erle D’Vorkin","age":"45","relatives":"","bio":"MiLord’s father and High Commander of the Lithe Military. He lost the last Life Blood contest to Tirth Dore. Consummate professional soldier, intellectual and family man, he works to keep the fractious aristocratic houses together.","__v":0},{"_id":"5f074d2f74eed928d02ce2c1","name":"Fia Pyrani Dore","age":"18","relatives":"","bio":"Heir to the throne of the Sovereignty, a trans-world dynasty at the brink of war. Tall, athletic, red-headed Fia must learn the difficult and bloody skills to claim the throne, become a respected monarch to successfully prepare for war.","__v":0},{"_id":"5f074d4774eed928d02ce2c2","name":"Giver","age":"15/18","relatives":"","bio":"Native of Shi in DeadSpace, medicine smuggler by trade, Payman’s twin brother, Giver is a religious zealot whose convictions lead him to abandon his family and enlist in a war.","__v":0},{"_id":"5f074d6074eed928d02ce2c3","name":"Jaska","age":"","relatives":"","bio":"Shi native. Giver’s beautiful wife, sister-in-law to Payman. She and Giver have twin girls, Alia and Dias. She wants Payman to stay and protect her family.","__v":0},{"_id":"5f074d9374eed928d02ce2c5","name":"Kennari Killmorn","age":"892","relatives":"","bio":"First in the Line of Men, Pangea’s consort and Fia’s ancient grandfather, albeit 33 times removed. Will he decide that Fia is the best contender to defeat his old foe Ra Elkun and save the Worlds from gruesome torture and servitude?","__v":0},{"_id":"5f074da974eed928d02ce2c7","name":"Lithe Crystal","age":"","relatives":"","bio":"A huge, organic living crystal outside of Lia on Lithia that was once part of an trans-planetary network of living crystals that communicated with each other via the portal tunnels they had created.","__v":0},{"_id":"5f074db874eed928d02ce2c8","name":"Lithe Pendant","age":"","relatives":"","bio":"The Lithe Crystal dropped a small shard for both Pangea and Ra Elkun to wear as a way to connect each of them to it. Through its shards, the Lithe Crystal could experience what they did, see what they saw, and feel what they felt. Pangea wore hers as a Pendant necklace against her chest. This Pendant was passed down to the first born daughters in Pangea’s line. Those who wore the Pendant were called Lithe Bearers and assumed the throne of the Sovereignty.","__v":0},{"_id":"5f074dda74eed928d02ce2c9","name":"Luras","age":"","relatives":"","bio":"Pangea, founder of the Sovereignty, created twelve Luras from the energy of the Lithe Crystal to help combat attacks by Ra Elkun’s Shadows. The Luras and Shadows had a huge battle, known as The Battle of the Five, during the reign of Pangea’s great-great-great-great-granddaughter Collee (Lithura-6), after which they were not seen again for over 300 years. Unfortunately, all the Luras were killed in the battle. When Pangea’s life was near its end, she created one more Lura, Tej, to help protect the Lithe Crystal, the Lithe Pendant and the Lithe Bearers who wore it. This took all of Pangea’s remaining life-energy and she passed away.","__v":0},{"_id":"5f074ded74eed928d02ce2ca","name":"Meena","age":"15","relatives":"","bio":"Brilliant, introverted, highly principled scientific Penumbran prodigy tasked with making Syns as soldiers for the Sovereignty. She has a crisis of conscience when she discovers that her Syns are sentient beings with consciousness. How can she avenge the genocide of her people and provide Fia with the weaponry she needs without committing atrocities herself?","__v":0},{"_id":"5f074e2d74eed928d02ce2cc","name":"MiLord D’Vorkin","age":"20","relatives":"","bio":"Arrogant, ambitious, yet honorable son of the High Commander Erle D’Vorkin. Although a member of the Lithian aristocracy, MiLord has everything to prove. Unexpected circumstances plunge him into a personal crisis, crippling him. The ongoing war with its threat of universal annihilation offers him the opportunity to grow. Can he cast aside his pride and become the soldier and leader the Sovereign needs to win the war?","__v":0},{"_id":"5f074e0174eed928d02ce2cb","name":"Mirri Pyrani Rishroya","age":"50","relatives":"","bio":"Fia’s maternal aunt, younger sister to Eira, mother of Agni.","__v":0},{"_id":"5f074e4474eed928d02ce2cd","name":"Mrs. Stamp","age":"68","relatives":"","bio":"Fia’s human nanny, Mrs. Stamp had raised Fia’s father Tirth as well. A brilliant astrophysicist by training, Mrs. Stamp is the only Earthling who knows the family’s extra-terrestrial origins.\n","__v":0},{"_id":"5f074e6774eed928d02ce2cf","name":"Pangea Pyrani Killmorn","age":"deceased","relatives":"","bio":"Ra Elkun’s twin sister and founder of the Sovereignty on Lithia. First Lithian to find the portal gate in the Lithe Crystal that can transport one to other Worlds. She was a tall, strong, copper-haired, copper-eyed brilliant beauty who was naturally curious and kind. Throughout her life, she encouraged exploration, cultural interchange and peaceful co-existence among her Worlds.\n","__v":0},{"_id":"5f074e8d74eed928d02ce2d0","name":"Payman","age":"24/886","relatives":"","bio":"Lithian by birth, he finds, with his twin sister Pangea, a trans-world portal inside a Lithe Crystal. He is narcissistic by nature, and comes to desire absolute power and control above all else. He expands his influence by conquering and colonizing worlds, first subtly and then ruthlessly subjugating his Worlds to his will. To stop his massive brutality and protect her family, Pangea traps him in a dimension without height or width, only time. Will his followers be successful in restructuring his empire to prepare for his return?\n","__v":0},{"_id":"5f074ea674eed928d02ce2d2","name":"Shadows/Scathes","age":"","relatives":"","bio":"Ra Elkun and then his followers create Shadow soldiers to fight against the Sovereignty. At first they are Shadow-like, two-dimensional and extremely deadly. With repeated contact with those they fight, they become enfleshed and weakened. When Shadows have taken on the flesh of those they have killed and injured they develop volume and are called Scathes.\n","__v":0},{"_id":"5f074ed174eed928d02ce2d3","name":"Syns","age":"","relatives":"","bio":"Soldiers created by the Sovereignty out of Lithe Light in their Synergy Laboratory to help combat Ra Elkun’s Shadows and Scathes.","__v":0},{"_id":"5f074ee874eed928d02ce2d4","name":"Talon Sarrow","age":"19","relatives":"","bio":"Skilled air-captain in Lithia’s Lithe Guard. Best friend of MiLord. His rural noble house ranks last. Tall, well built, with Lithian dark hair and almond-shaped, grey eyes, he is a loyal friend, gifted leaper, trustworthy soldier whose easy going, non-political nature make him well liked.","__v":0},{"_id":"5f074efd74eed928d02ce2d5","name":"Tej","age":"886+","relatives":"","bio":"A light-violet skinned Lura created by Pangea at the end of her life, Tej has protected the Lithe Crystal, its Pedant and Lithe Bearers for centuries and has grown weary of their pettiness. With a wry sense of humor and cynical nature, Tej proves to be an interesting companion to Fia. With war upon them, will Tej die for the Sovereignty and be the last Lura ever created?","__v":0},{"_id":"5f074f1c74eed928d02ce2d6","name":"Tirth Dore","age":"45","relatives":"","bio":" Father to Fia. Loving husband to Eira. Irreverent. Charismatic. Righteous. A trans-planetary trader/smuggler, Tirth makes easy enemies and lifelong friends. He has spent his adult life teaching Fia to prepare for her role and to create a more humanitarian form of governance. He has trained her to be able to hold her own in any private or public debate. Clandestinely, he has built an underground army to help Fia achieve her goals. When his bid to lead the military forces of Lithia fails, he must choose between family ties and subconscious personal ambition.","__v":0},{"_id":"5f074f2f74eed928d02ce2d7","name":"Wag","age":"17/20","relatives":"","bio":"Cruel member of Payman and Giver’s medicine smuggling band on Shi, Wag has it in for Payman for breaking his knee and causing him chronic pain. Will he succeed in killing Payman before Payman can rescue his brother?","__v":0}];
        characters = chars.map( char => {
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
            );
        });
        // if (!props.loading) {
        //     characters = props.chars.map( char => {
        //         return (
        //             <Character
        //                 key         = {char._id}  
        //                 id          = {char._id}          
        //                 name        = {char.name}
        //                 age         = {char.age}
        //                 bio         = {char.bio}
        //                 relatives   = {char.relatives}
        //                 deleteClick  = {() => deleteCharHandler(char._id)}
        //             />
        //         )
        //     })
        // }
        // console.log('chars = ' + JSON.stringify(props.chars))
    return(
        <div className={[classes.Card, myClasses.Characters].join(' ')}>
            <div className="container">
                <div className="page-header text-center">
                    <h1>Characters</h1>
                </div>
            </div>
        {characters}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        chars   : state.char.characters,
        loading : state.char.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCharacters: () => dispatch( actions.getCharacters())
    };
};

Characters.propTypes={
    onDeleteChar: PropTypes.func,
};

export default connect (
    mapStateToProps, 
    mapDispatchToProps
    )(Characters, axios);