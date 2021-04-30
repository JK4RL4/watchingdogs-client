
import FuseBox from './FuseBox';

function Fence(props) {

  const openDoor = () => {
    if (props.unlockGate === 'locked') {
      props.setUnlockGate('opened');
      document.querySelector('.fence-door').classList.remove('fence-stack-door')
      document.querySelector('.fence-door').classList.add('fence-door-open');
      setTimeout(()=> 
      document.querySelector('.fence-door').classList.remove('fence-door-open'), 
      4000)
      document.querySelector('.fence-handle').classList.add('fence-handle-move');
      setTimeout(()=> 
      document.querySelector('.fence-handle').classList.remove('fence-handle-move'), 
      4000)
    }
  }

  return (
    <div className='fence'>
      <div className='fence-door' />
      <div className='fence-background' />
      <button className='fence-handle' onClick={openDoor}></button>
      <FuseBox setModalActive={props.setModalActive} modalActive={props.modalActive} setModalContent={props.setModalContent} setModalClasses={props.setModalClasses}
               conditionsLock={props.conditionsLock} setConditionsLock={props.setConditionsLock} startLevel={props.startLevel} night={props.night} />
    </div>
  );
}
  
export default Fence;