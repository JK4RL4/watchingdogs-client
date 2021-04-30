import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import dogWhining from './sounds/dog_bark/dog_whining_3.mp3';
import gateBreak from './sounds/gate_break.mp3';
import gateOpen from './sounds/gate_open.mp3';
import gateBreakHelp from './sounds/help/gate.mp3';
import failHelp from './sounds/help/help.mp3';
import trollHelp from './sounds/help/troll.mp3';

function PlayerButtons(props) {
    let dogWhiningAudio = useRef(new Audio(dogWhining));
    let gateBreakAudio = useRef(new Audio(gateBreak));
    let gateOpenAudio = useRef(new Audio(gateOpen));
    let gateBreakHelpAudio = useRef(new Audio(gateBreakHelp));
    let failHelpAudio = useRef(new Audio(failHelp));
    let trollHelpAudio = useRef(new Audio(trollHelp));
    let gateBreakAdvised = useRef(false);
    let helpAdvised = useRef(false);
    let trollAdvised = useRef(false);
    gateOpenAudio.current.volume = 0.4;

    const getDogIndex = () => {
        if (props.currentDog.current) {
            let dogIndex = props.currentDog.current;
            dogIndex = dogIndex.match(/\d+/g);
            return dogIndex;
        } else {
            return null;
        }
    }

    const getCurrentDog = (dogIndex) => {
        let dogId = parseInt(document.querySelector('#container-dog-' + dogIndex + ' input').value);
        let dog = props.dogs.find(dog => dog.id === dogId);
        return dog;
    }

    const reject = () => {
        if (props.activeButtons) {
            let dogIndex = getDogIndex();
            if(dogIndex){
                if (!checkDog(getCurrentDog(dogIndex))) {
                    let dogBubble = document.querySelector('#container-dog-' + dogIndex + ' .dog-bubble');
                    props.updateClickDB();
                    dogBubble.style.display = 'none';
                    dogWhiningAudio.current.play();
                    props.setNextDog(!props.nextDog);
                } else {
                    failOrEnd();
                }
            }
        }
    }

    const accept = () => {
        if (props.activeButtons) {
            let dogIndex = getDogIndex();
            if(dogIndex){
                if (checkDog(getCurrentDog(dogIndex)) && props.unlockGate === 'unlocked' ) {
                    let dogBubble = document.querySelector('#container-dog-' + dogIndex + ' .dog-bubble');
                    props.updateClickDB();

                    if (openGate()) {
                        dogBubble.style.display = 'none';
                        moveDog();
                        setTimeout(() => {
                            props.setNextDog(!props.nextDog);
                        }, 4000);
                    }
                } else {
                    failOrEnd();
                }
            }
        }
    }

    const failOrEnd = () => {
        if (props.dogLives - 1 === 0 && props.levelName === 'Nivel 9')  {
            endModal(false);
        } else {
            failModal(false);
        }
    }

    const checkDog = (dog) => {
        let checked = true;
        let optionalFlag = {exist: false, check: false};
        let checkedArray = [];
        let attributes = ['genre', 'vaccinated', 'color', 'race', 'dangerous'];
        let i = 0;

        do {
            if (props.levelConditions[attributes[i]].active) {
                let checkedCondition = checkAttribute(attributes[i], dog, optionalFlag);
                optionalFlag = checkedCondition.optionalFlag;
                checkedArray = checkedCondition.checkedAttribute;
            }
            if (checkedArray.includes(false)) { checked = false };
            i++;
        } while (checked && i < attributes.length);

        if (optionalFlag.exist && !optionalFlag.check) { checked = false };

        return checked;
    }

    const checkAttribute = (attribute, dog, optionalFlag) => {
        let checkedAttribute = [];

        props.levelConditions[attribute].conditions.forEach(condition => {
            if (condition.type === 'needed' && condition.rule !== dog[attribute]) {
                checkedAttribute.push(false);
            } else if (condition.type === 'excluding' && condition.rule === dog[attribute]) {
                checkedAttribute.push(false);
            } else if (condition.type === 'optional') {
                optionalFlag.exist = true;
                if (condition.rule === dog[attribute]) {
                    optionalFlag.check = true;
                }
            } else {
                checkedAttribute.push(true);
            }
        });
        return {checkedAttribute: checkedAttribute, optionalFlag: optionalFlag};
    }

    const moveDog = () => {
        let dogContainer = document.querySelector('#' + props.currentDog.current);
        let dogImg = document.querySelector('#' + props.currentDog.current + ' .dog-img');
        let dogBubble = document.querySelector('#' + props.currentDog.current + ' .dog-bubble');
        dogBubble.style.display = 'none';
        dogImg.classList.remove('dog-waiting-animation');
        dogImg.classList.add('dog-down-animation');
        dogContainer.classList.add('dog-process'); 
        setTimeout(() => {
            dogContainer.remove();
        }, 3000);
    }

    const openGate = () => {
        props.setActiveButtons(false);
        let lockGate = false;
        if (props.levelName === 'Nivel 4' || props.levelName === 'Nivel 5' || props.levelName === 'Nivel 6' ||
            props.levelName === 'Nivel 7' || props.levelName === 'Nivel 8' || props.levelName === 'Nivel 9') {
            switch (Math.floor(Math.random()*2)) {
                case 0: 
                    break;
                case 1:
                    lockGate = true;
                    break;
                default:
                    break;
            }
        }

        if (!lockGate) {
            gateOpenAudio.current.play();
            document.querySelector('.fence-door').classList.remove('fence-door-open');
            document.querySelector('.fence-door').classList.add('fence-door-open');
            setTimeout(()=> {document.querySelector('.fence-door').classList.remove('fence-door-open')}, 4000);
            setTimeout(()=> {props.setActiveButtons(true)}, 4000);
            return true;
        } else {
            gateBreakAudio.current.play();
            props.setUnlockGate('locked');
            document.querySelector('.fence-door').classList.add('fence-stack-door');
            setTimeout(()=> {document.querySelector('.fence-door').classList.remove('fence-stack-door')}, 4000);
            setTimeout(()=> {props.setActiveButtons(true)}, 4000);
            if (!gateBreakAdvised.current) { 
                gateBreakHelpAudio.current.play(); 
                gateBreakAdvised.current = true;
            }
            return false;
        }
    }

    const failModal = () => {
        let failMenu =
            <div className='header-menu-modal'>
                {props.dogLives > 1 &&  <>
                                            <div className='fail-text'>
                                                {!props.timer && <p>¡Has fallado!</p>}
                                                {props.timer && <p>¡Se acabó el tiempo!</p>}
                                                <p>Te quedan {props.dogLives - 1} intentos</p>
                                            </div>
                                            <button className='header-menu-button' onClick={retry}>Volver a intentar</button>
                                            <button className='header-menu-button' onClick={() => nextLevel(true)}>Saltar Nivel</button>
                                        </>}
                {props.dogLives === 1 && <>
                                            <div className='fail-text'>
                                                <p>¡Has fallado!</p>
                                                <p>No te quedan intentos</p>
                                            </div>
                                            <button className='header-menu-button' onClick={() => nextLevel(false)}>Siguiente Nivel</button>
                                         </>}
                <Link className='header-menu-button' to='/results' onClick={abandon}>Abandonar</Link>
                <button className='header-menu-button' onClick={() => {
                    // props.updateEndDB(props.dogLives, false, false, false); 
                    window.location = 'http://localhost:3000/'}} to='/'>Salir</button>
            </div>
      
        props.updateEndDB(props.dogLives - 1, false, false, false);
        props.setDogLives(props.dogLives - 1);
        props.setModalClasses('header-game-menu modal-blocked');
        props.setModalContent(failMenu);
        props.setModalActive(!props.modalActive);
        props.setStartLevel(false);
        props.setTimer(false);
        props.stopTimer();
        clearTimeout(props.timerTimeout.current);
        if (!helpAdvised.current) { 
            failHelpAudio.current.play(); 
            helpAdvised.current = true;
        } else if (!trollAdvised.current) { 
            trollHelpAudio.current.play(); 
            trollAdvised.current = true;
        }
    }

    const successModal = () => {
        let successContent =  <div className='modal-success'>
                                <div className='fail-text'>
                                    <p>¡Nivel superado!</p>
                                </div>
                                <button className='header-menu-button' onClick={() => nextLevel(false)}>Siguiente Nivel</button>
                                <button className='header-menu-button' onClick={() => {
                                        props.updateEndDB(props.dogLives, false, false, false); 
                                        window.location = 'http://localhost:3000/'}} to='/'>Salir</button>
                              </div>

        props.updateEndDB(props.dogLives, true, false, false);
        if (dogWhiningAudio.current.currentTime > 0) {
            dogWhiningAudio.current.pause();
            dogWhiningAudio.current.currentTime = 0;
        }
        props.setModalClasses('header-game-menu modal-blocked');
        props.setModalContent(successContent);
        props.setModalActive(!props.modalActive);
        props.setStartLevel(false);
        props.setTimer(false);
        props.stopTimer();
        clearTimeout(props.timerTimeout.current);
    }

    const endModal = (pass) => {
        let endContent =  <div className='modal-success'>
                                <div className='fail-text'>
                                    {!pass && <p>¡Has fallado!</p>}
                                    {pass && <p>¡Nivel superado!</p>}
                                    <p>¡Gracias por jugar!</p>
                                </div>
                                <Link className='header-menu-button' to='/results'>Ver resultados</Link>
                              </div>
        
        props.updateEndDB(props.dogLives, pass, false, false);
        props.setStartLevel(false);
        props.setTimer(false);    
        props.setModalClasses('header-game-menu modal-blocked');
        props.setModalContent(endContent);
        props.setModalActive(!props.modalActive);
    }

    const retry = () => {
        props.setModalActive(false);
        props.setStartLevel(true);
    }

    const nextLevel = (skip) => {
        if (skip) {
            props.updateEndDB(props.dogLives, false, true, false);
        }
        props.setModalActive(false);
        props.setNextLevel(!props.nextLevel);
    }

    const abandon = () => {
        props.stopTimer();
        props.updateEndDB(props.dogLives, false, false, true);
        props.setModalActive(false);
    }

    const isDogMoving = () => {
        if (document.querySelector('#container-dog-' + getDogIndex() + ' .dog-down-animation')) {
            return 1;
        } else {
            return 0;
        }
    }

    useEffect(() => {
        if (props.timer) {
            failModal();
        }
    }, [props.timer])

    useEffect(() => {
        if (props.endedLevel) {
            let wait = isDogMoving();
            setTimeout(() => {
                if (props.levelName !== 'Nivel 9') {
                    successModal();
                } else {
                    endModal(true);
                }
                props.setEndedLevel(false);
            }, 3000 * wait);
        }
    }, [props.endedLevel])

    useEffect(() => {
        if (props.unlockGate === 'opened') {
            let dogBubble = document.querySelector('#container-dog-' + getDogIndex() + ' .dog-bubble');
            dogBubble.style.display = 'none';
            props.setNextDog(!props.nextDog);
            moveDog();
            props.setUnlockGate('unlocked');
        }
    }, [props.unlockGate])

    return (
        <div className='player-buttons'>
            <div className='player-buttons-background player-buttons-reject-background'>
                <button className='player-buttons-reject' onClick={reject} />
            </div>
            <div className='player-buttons-background player-buttons-accept-background'>
                <button className='player-buttons-accept' onClick={accept} />
            </div>
        </div>
    );
}

export default PlayerButtons;