import { useState, useEffect, useRef } from 'react';
import functions from './functions';
import dogBubbleImg from './img/dog_bubble.png';
import dogMale from './img/dog_male.png';
import dogFemale from './img/dog_female.png';
import dogVaccineYes from './img/dog_vaccine_yes.png';
import dogVaccineNo from './img/dog_vaccine_no.png';
import dogDangerYes from './img/dog_danger_yes.png';
import dogDangerNo from './img/dog_danger_no.png';
import fuseHelp from './sounds/help/fuse.mp3';

function Dog(props) {
  let [dogClasses, setDogClasses] = useState();
  let [dogContainerClasses] = useState('dog-container dog-enter');
  let [dogStyle] = useState(props.dogStyle);
  let [dogBark] = useState(props.dogData.sound);
  let [cardLighted, setCardLighted] = useState(!props.night);
  let dogBarkAudio = useRef();
  let dogImg = 'modal-dog-img modal-dog-img' + props.dogData.img;
  let dogContainerId = props.dogContainerId;
  let dogId = props.dogId;
  let dogBarkObserver = useRef();
  let nightObserver = useRef();
  let waitTimeout = useRef();
  let fuseHelpAudio = useRef(new Audio(fuseHelp));
  dogBark.volume = 0.4;

  const getDogClasses = () => {
    let newDogClasses = 'dog-img dog-down-animation';

    switch (props.dogData.type) {
      case 'scottie':
        newDogClasses += ' dog-scottie-';
        break;
      case 'pomeranian':
        newDogClasses += ' dog-pomeranian-';
        break;
      case 'golden':
        newDogClasses += ' dog-golden-';
        break;
      case 'sntbernard':
        newDogClasses += ' dog-sntbernard-';
        break;
      case 'corgi':
        newDogClasses += ' dog-corgi-';
        break;
      case 'wolfdog':
        newDogClasses += ' dog-wolfdog-';
        break;
      default:
        break;
    }
    
    newDogClasses += props.dogColor;
    return newDogClasses;
  }

  const dogModalFront = () => {
    let content =
      <div className='modal-dog-background'>
        <div className='modal-dog-card'>
          <div className={dogImg} />
          <div className='modal-dog-name'>{props.dogData.name}</div>
          <div className='modal-dog-front-attributes'>
            <div className='modal-dog-genre'>
              {props.dogData.genre === 'male' && <img src={dogMale} alt='genre' />}
              {props.dogData.genre === 'female' && <img src={dogFemale} alt='genre' />}
            </div>
            <div className='modal-dog-vaccine'>
              {props.dogData.vaccinated && <img src={dogVaccineYes} alt='vaccine' />}
              {!props.dogData.vaccinated && <img src={dogVaccineNo} alt='vaccine' />}
            </div>
          </div>
          <button className='modal-dog-turn' onClick={dogModalBack} />
        </div>
        <div className='modal-dog-card-reflex' />
        {!cardLighted && <div className='night-dog-card night-dog-card-front' />}
      </div>
    props.setModalClasses('modal-dog');
    props.setModalContent(content);
  }

  const dogModalBack = () => {
    let content =
      <div className='modal-dog-background modal-dog-background-back'>
        <div className='modal-dog-card'>
          <div className='modal-dog-back-attributes'>
            <div className='modal-dog-attribute'>
              <p className='modal-dog-attribute-title'>Raza:</p>
              <p className='modal-dog-attribute-p'>{props.dogData.race}</p>
            </div>
            <div className='modal-dog-attribute'>
              <p className='modal-dog-attribute-title'>Color:</p>
              <p className='modal-dog-attribute-p'>{props.dogData.color}</p>
            </div>
            <div className='modal-dog-attribute'>
              <div className='modal-dog-attribute-danger'>
                {props.dogData.dangerous && <img className='modal-dog-danger' src={dogDangerYes} alt='danger' />}
                {!props.dogData.dangerous && <img className='modal-dog-danger' src={dogDangerNo} alt='danger' />}
              </div>
            </div>
          </div>
          <button className='modal-dog-turn' onClick={dogModalFront} />
        </div>
        <div className='modal-dog-card-reflex modal-dog-card-reflex-back' />
        {!cardLighted && <div className='night-dog-card night-dog-card-back' />}
      </div>
    props.setModalClasses('modal-dog');
    props.setModalContent(content);
  }

  const showDog = () => {
    dogModalFront();
    props.setModalActive(!props.modalActive);
    if (props.night && !props.fuseAdvised.current) { 
      fuseHelpAudio.current.play(); 
      props.fuseAdvised.current = true;
    }
  }

  const makeDogWait = () => {
    let currentDogClasses = document.querySelector('#' + dogId).classList.value;
    currentDogClasses = currentDogClasses.replace('dog-down-animation', 'dog-waiting-animation');
    setDogClasses(currentDogClasses);
  }

  const addSound = () => {
    dogBarkAudio.current = setInterval(() => {
      dogBark.play();      
    }, 3000);
  }

  const removeSound = () => {
    clearInterval(dogBarkAudio.current);
  }

  const hideCard = () => {
    setCardLighted(false);
  }

  const showCard = () => {
    setCardLighted(true);
  }

  useEffect(() => {
    let newDogClasses = getDogClasses();
    setDogClasses(newDogClasses);
    waitTimeout.current = setTimeout(makeDogWait, props.enterDuration * 1000);
    dogBarkObserver.current = functions.elementObserver('#' + dogId, 'dog-waiting-animation', addSound, removeSound);
    if (props.levelName === 'Nivel 7' || props.levelName === 'Nivel 8' || props.levelName === 'Nivel 9') {
      hideCard();
      nightObserver.current = functions.elementObserver('.night-background', 'night-active', showCard, hideCard);
    }
    return () => { 
      clearInterval(dogBarkAudio.current);
      clearTimeout(waitTimeout.current);
      if (dogBarkObserver.current) { dogBarkObserver.current.disconnect() }
      if (nightObserver.current) { nightObserver.current.disconnect() }
    }; 
  }, [])

  return (
    <div id={dogContainerId} className={dogContainerClasses} style={dogStyle}>
      <div id={dogId} className={dogClasses} />
      <input type='hidden' value={props.dogData.id} />
      <button className='dog-bubble' onClick={showDog}>
        <img src={dogBubbleImg} alt='bubble' />
        <p>¡guau!</p>
      </button>
    </div>
  );
}

export default Dog;
