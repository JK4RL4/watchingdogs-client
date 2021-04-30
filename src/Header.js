import { Link } from 'react-router-dom';
import Timer from './Timer';
import DogLives from './DogLives';

function Header(props) {

    const menuModal = () => {
        let gameMenu =
            <div className='header-menu-modal'>
                {props.level.levelName !== 'Nivel 9' && <button className='header-menu-button' onClick={nextLevel}>Saltar Nivel</button>}
                <Link className='header-menu-button' to='/results' onClick={abandon}>Abandonar</Link>
                <button className='header-menu-button' onClick={() => props.setTutorial(true)}>Ayuda</button>
                <button className='header-menu-button' onClick={() => {
                    props.updateEndDB(props.dogLives, false, false, false); 
                    window.location = 'http://localhost:3000/'}} to='/'>Salir</button>
            </div>
        props.setModalClasses('header-game-menu');
        props.setModalContent(gameMenu)
    }

    const showMenu = () => {
        menuModal()
        props.setModalActive(!props.modalActive)
    }

    const abandon = () => {
        props.stopTimer();
        props.updateEndDB(props.dogLives, false, false, true);
        props.setModalActive(false);
    }

    const nextLevel = () => {
        props.updateEndDB(props.dogLives, false, true, false);
        props.setModalActive(false);
        props.setNextLevel(!props.nextLevel);
        props.stopTimer();
    }

    return (
        <div className='header'>
            <DogLives dogLives={props.dogLives} />
            <Timer level={props.level} />
            <button id='myBtn' className='header-menu' onClick={showMenu} />
        </div>
    );
}

export default Header;

