import { useEffect, useState, useRef } from 'react';
import Dog from './Dog';
import functions from './functions';

function Animals(props) {
  let [rendered, setRendered] = useState(false);
  let [dogs, setDogs] = useState([]);
  let [startProcessing, setStartProcessing] = useState(false);
  let [dogProcess] = useState(false);
  let dogsProcessingArray = useRef([]);
  let processTimeout = useRef();

  const getDogs= () => {
    let dogsArray = props.dogs.slice();
    let durationArray = [5, 4.5, 4, 3.5, 3];
    durationArray = functions.shuffleArray(durationArray);
    dogsArray = functions.shuffleArray(dogsArray);
    let dogsHtml = dogsArray.map((dog, key) => {
      let dogId = 'dog-' + key;
      let dogContainerId = 'container-' + dogId;
      let enterDuration = durationArray.shift();
      let dogStyle = {'left': (key * 20) + '%',
                       'animationDuration': `${enterDuration}s`};
      return  <Dog key={key} dogId={dogId} dogContainerId={dogContainerId} dogType={dog.race} dogColor={dog.colorId} dogData={dog} dogStyle={dogStyle} 
                   enterDuration={enterDuration} setModalClasses={props.setModalClasses} setModalActive={props.setModalActive} setModalContent={props.setModalContent} 
                   dogProcess={dogProcess} night={props.night} fuseAdvised={props.fuseAdvised} levelName={props.levelName} />
    })
    setDogs(dogsHtml);
  }

  const processDog = (dogsProcessing) => {
    if (dogsProcessing.length > 0) {
      let currentDog = dogsProcessing.shift();
      dogsProcessingArray.current = dogsProcessing;
      let currentDogId = currentDog.id;
      let dogBubble = document.querySelector('#' + currentDogId + ' .dog-bubble');
      dogBubble.style.display = 'flex';
      props.currentDog.current = currentDogId;
      props.setActiveButtons(true);
    } else {
      props.setEndedLevel(true);
    }
  }

  useEffect(() => {
    props.setActiveButtons(false);
    setRendered(true);
    getDogs();
    processTimeout.current = setTimeout(() => setStartProcessing(true), 5000);

    return () => {
      clearTimeout(processTimeout.current);
    };
  },[])

  useEffect(() => {
    if (startProcessing) {
      let dogsProcessing = Array.from(document.querySelectorAll('.dog-container'));
      dogsProcessing = functions.shuffleArray(dogsProcessing);
      dogsProcessingArray.current = dogsProcessing;
      processDog(dogsProcessing);
    }
  }, [startProcessing])

  useEffect(() => {
    if (rendered) {
      processDog(dogsProcessingArray.current);
    }
  }, [props.nextDog])

  return (
    <div className='animals'>
      <div className='dog-limits'>
        {dogs}
      </div>
    </div>
  )
}

export default Animals;