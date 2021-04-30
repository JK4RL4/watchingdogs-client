import { useEffect, useState, useRef } from 'react';
import variables from './variables';
import Header from './Header';
import Animals from './Animals';
import Fence from './Fence';
import Conditions from './Conditions';
import PlayerButtons from './PlayerButtons';
import Modal from './Modal';
import backgroundMusic from './sounds/background_music2.mp3';

function Game(props) {
  let [level, setLevel] = useState(variables.tutorial);
  let [nextLevel, setNextLevel] = useState(false);
  let [timer, setTimer] = useState(false);
  let timerTimeout = useRef();
  let [startLevel, setStartLevel] = useState(false);
  let [endedLevel, setEndedLevel] = useState(false);
  let [modalActive,  setModalActive] = useState(false);
  let [modalContent, setModalContent] = useState();
  let [modalClasses, setModalClasses] = useState();
  let [activeButtons, setActiveButtons] = useState(false);
  let currentDog = useRef();
  let [nextDog, setNextDog] = useState(false);
  let [dogLives, setDogLives] = useState(3);
  let [unlockGate, setUnlockGate] = useState('unlocked');
  let [night, setNight] = useState(false);
  let [conditionsLock, setConditionsLock] = useState(false);
  let [tutorial, setTutorial] = useState(false);
  let [tutorialPage, setTutorialPage] = useState(0);
  let levels = useRef(['level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8', 'level9']);
  let fuseAdvised = useRef(false);
  let backgroundMusicAudio = useRef(new Audio(backgroundMusic));
  backgroundMusicAudio.current.volume = 0.4;

  const startTutorial = () => {
    setTutorial(false);
    setModalActive(false);
    setTutorialPage(0);
    setStartLevel(true);
  }

  let tutorialContent = <div className='modal-tutorial-content'>
                            {tutorialPage === 0 && <p className='modal-tutorial-title'>{variables.tutorialTexts[tutorialPage]}</p>}
                            {tutorialPage !== 0 && <p className='modal-tutorial-text multiline'>{variables.tutorialTexts[tutorialPage]}</p>}
                            <div className='modal-tutorial-buttons'>
                              {tutorialPage > 0 && 
                                <button className='modal-tutorial-button modal-tutorial-prev' onClick={() => setTutorialPage(tutorialPage - 1)} />}
                              {tutorialPage < (variables.tutorialTexts.length - 1) && 
                                <button className='modal-tutorial-button modal-tutorial-next' onClick={() => setTutorialPage(tutorialPage + 1)} />}
                              {tutorialPage === (variables.tutorialTexts.length - 1) && 
                                <button className='modal-tutorial-button modal-tutorial-start' onClick={startTutorial} >empezar</button>}
                            </div>
                        </div>
  
  const startTimer = () => {
    let barClass = '';
    let timerHtml = document.querySelector('.timer-bar');
    let randomBar;

    backgroundMusicAudio.current.play();

    if (level.levelName === 'Tutorial' || level.levelName === 'Nivel 1' || level.levelName === 'Nivel 2') {
      randomBar = 0;
    } else if (level.levelName === 'Nivel 3' || level.levelName === 'Nivel 4' || level.levelName === 'Nivel 5' || level.levelName === 'Nivel 6') {
      randomBar = Math.floor(Math.random() * 3);
    } else if (level.levelName === 'Nivel 7' || level.levelName === 'Nivel 8' || level.levelName === 'Nivel 9') {
      randomBar = Math.floor(Math.random() * 4);
    }

    switch (randomBar) {
      case 0:
        barClass = 'timer-bar-progress-linear';
        break;
      case 1:
        barClass = 'timer-bar-progress-easy-out';
        break;
      case 2:
        barClass = 'timer-bar-progress-easy-in';
        break;
      case 3:
        barClass = 'timer-bar-progress-troll';
        break;
      default:
        break;
    }

    timerHtml.classList.add(barClass);
    timerTimeout.current = setTimeout(() => setTimer(true), 30000);
  }

  const stopTimer = () => {
    backgroundMusicAudio.current.pause();
    backgroundMusicAudio.current.currentTime = 0;
    let timerHtml = document.querySelector('.timer-bar');
    timerHtml.classList.remove('timer-bar-progress-linear');
    timerHtml.classList.remove('timer-bar-progress-troll');
    timerHtml.classList.remove('timer-bar-progress-easy-in');
    timerHtml.classList.remove('timer-bar-progress-easy-out');
    clearTimeout(timerTimeout.current);
  }

  const updateUserData = (levelName, lives, pass, skip, abandon, time) => {
    let newUserData = Object.assign(props.userData[1]);
    if (levelName !== 'Tutorial') {
      let currentLevel = getLevelAttr(levelName);
  
      if (lives >= 0) {
        newUserData[currentLevel].lives = lives;
      } else {
        newUserData[currentLevel].lives = props.dogLives;
      }
  
      if (pass) {
        newUserData[currentLevel].pass = pass;
      }
  
      if (skip) {
        newUserData[currentLevel].skip = skip;
      }
  
      if (abandon) {
        newUserData[currentLevel].abandon = abandon;
      }
  
      if (time) {
        newUserData[currentLevel].response.push(time);
      }
      props.setUserData([true, Object.assign(newUserData)]);
    }
  }

  const getLevelAttr = (levelName) => {
    switch (levelName) {
      case 'Nivel 1':
        return 'level1';
      case 'Nivel 2':
        return 'level2';
      case 'Nivel 3':
        return 'level3';
      case 'Nivel 4':
        return 'level4';
      case 'Nivel 5':
        return 'level5';
      case 'Nivel 6':
        return 'level6';
      case 'Nivel 7':
        return 'level7';
      case 'Nivel 8':
        return 'level8';
      case 'Nivel 9':
        return 'level9';
      default:
        break;
    }
  }

  const getCurrentLevel = () => {
    let currentUserData = Object.assign(props.userData[1]);
    let currentLevel;
    let levelsArray = Object.keys(currentUserData);
    let i = 0;

    for (let level in currentUserData) {
      if (currentUserData[level].response.length < 2) {
        
        if (!currentLevel) {
          currentLevel = levelsArray[i];
        }
      }
      i++;
    }

    let newLevels = levels.current;
    newLevels = newLevels.slice(newLevels.indexOf(currentLevel) + 1);
    levels.current = newLevels;

    let modalContent = <div className='header-menu-modal'>
                            <button className='header-menu-button' onClick={() => {setLevel(variables[currentLevel]); setModalActive(false);}}>Empezar</button>
                          </div>

    setModalClasses('header-game-menu modal-blocked');
    setModalContent(modalContent);
    setModalActive(true);
  }

  const updateStartDB = () => {
    // let startTime = Date.now();
    // updateUserData(level.levelName, null, null, null, null, 'start: ' + startTime);
  }

  const updateEndDB = (lives, pass, skip, abandon) => {
    // let endTime = Date.now();
    // updateUserData(level.levelName, lives, pass, skip, abandon, 'end: ' + endTime);
  }

  const updateClickDB = () => {
    // let clickTime = Date.now();
    // updateUserData(level.levelName, null, null, null, null, clickTime);
  }

  useEffect(() => {
    if (!props.registeredUser.current) {
      setTutorial(true);
    } else {
      if (!props.loadingData.current) {
        getCurrentLevel();
      }
    }
  }, [props.loadingData.current])

  useEffect(() => {
    if (tutorial) {
      setModalClasses('modal-tutorial modal-blocked');
      setModalContent(tutorialContent);
      setModalActive(true);
    }
  }, [tutorialPage, tutorial])

  useEffect(() => {
    if (startLevel) {
      startTimer();
      updateStartDB();
    } else {
      stopTimer();
    }

    // if (level.levelName === 'Nivel 7' || level.levelName === 'Nivel 8' || level.levelName === 'Nivel 9') {
    //   setNight(true);
    // }
  }, [startLevel])

  useEffect(() => {
    if (nextLevel) {
      let levelsArray = levels.current;
      let newLevel = levelsArray.shift();
      levels.current = levelsArray;
      setStartLevel(false);
      setNextLevel(false);
      if (newLevel === 'level7' || level.levelName === 'level8' || level.levelName === 'level9') {
        setNight(true);
      }
      setLevel(variables[newLevel]);
    }
  }, [nextLevel])

  useEffect(() => {
    if (level.levelName !== 'Tutorial') {
      setStartLevel(true);
    }

    currentDog.current = null;
    stopTimer();
    setDogLives(3);
  }, [level])

  return (
    <div className='game-container'>
      <Header setModalActive={setModalActive} modalActive={modalActive} setTutorial={setTutorial} updateUserData={updateUserData}
              setModalContent={setModalContent} setModalClasses={setModalClasses} level={level} dogLives={dogLives} night={night}
              nextLevel={nextLevel} setNextLevel={setNextLevel} stopTimer={stopTimer} updateEndDB={updateEndDB} />
      {startLevel && <Animals setModalActive={setModalActive} setModalContent={setModalContent} setModalClasses={setModalClasses} 
                              dogs={level.dogs} setActiveButtons={setActiveButtons} nextDog={nextDog} currentDog={currentDog}
                              setEndedLevel={setEndedLevel} night={night} fuseAdvised={fuseAdvised} levelName={level.levelName} />}
      <Fence setModalActive={setModalActive} modalActive={modalActive} setModalContent={setModalContent} setModalClasses={setModalClasses} 
             unlockGate={unlockGate} setUnlockGate={setUnlockGate} conditionsLock={conditionsLock} setConditionsLock={setConditionsLock} 
             startLevel={startLevel} night={night} />
      {night && <div className='night-background night-active' />}
      <Conditions levelConditions={level.conditions} conditionsLock={conditionsLock} />
      <PlayerButtons activeButtons={activeButtons} setActiveButtons={setActiveButtons} nextDog={nextDog} setNextDog={setNextDog} levelName={level.levelName}
                     levelConditions={level.conditions} dogs={level.dogs} setDogLives={setDogLives} dogLives={dogLives} updateEndDB={updateEndDB}
                     setStartLevel={setStartLevel} setModalActive={setModalActive} modalContent={modalContent} modalClasses={modalClasses} 
                     setModalClasses={setModalClasses} setModalContent={setModalContent} nextLevel={nextLevel} setNextLevel={setNextLevel} 
                     timer={timer} setTimer={setTimer} endedLevel={endedLevel} setEndedLevel={setEndedLevel} updateUserData={updateUserData} 
                     unlockGate={unlockGate} setUnlockGate={setUnlockGate} night={night} currentDog={currentDog} stopTimer={stopTimer} timerTimeout={timerTimeout} 
                     updateClickDB={updateClickDB} />
      {modalActive && <Modal setModalActive={setModalActive} modalContent={modalContent} setModalContent={setModalContent} modalClasses={modalClasses} />}
    </div>
  );
}
  
export default Game;
