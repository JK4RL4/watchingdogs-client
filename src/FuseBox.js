import { useEffect, useState } from 'react';
import fuseOpenImg from './img/fuse_open.jpg';
import fuseButtonOn from './img/fuse_button_on.png';
import fuseBox from './sounds/fuse_box.mp3';
import fuseClick from './sounds/fuse_click.mp3';
import conditionsBlock from './sounds/conditions_block2.mp3'

function FuseBox(props) {
    let [fuseSwitch, setFuseSwitch] = useState(false);
    let [fuseActive, setFuseActive] = useState(false);
    let fuseBoxAudio = new Audio(fuseBox);
    let fuseClickAudio = new Audio(fuseClick);
    let conditionsBlockAudio = new Audio(conditionsBlock);

    const fuseClicked = () => {
        setFuseSwitch(!fuseSwitch);
        props.setModalActive(false);
        setFuseActive(false);
    }
   
    let fuseBoxContent = <button className='modal-fuse-box-off' onClick={fuseClicked}>
                            {fuseSwitch && <img src={fuseButtonOn} className='modal-fuse-box-on' alt='fuse switch' />}
                        </button>
  
    const ModalFuse = () => {
        if (props.night) {
            fuseBoxAudio.play();
            setFuseActive(true);
            props.setModalContent(fuseBoxContent);
            props.setModalClasses('modal-fuse-box');
            props.setModalActive(!props.modalActive);
            
        }
    }
 
    const resetFuse = () => {
        if (props.night) {
            document.querySelector('.fence-background').classList.remove('fence-lighted');
            document.querySelector('.night-background').classList.remove('night-lights');
            document.querySelector('.night-background').classList.remove('night-active');
    
            if (props.conditionsLock) {
                conditionsBlockAudio.play();
                document.querySelector('.conditions-lock').classList.add('conditions-unlock');
                setTimeout(() => props.setConditionsLock(false), 1000);
            }
        }
    }

    useEffect(() => {
        if (props.startLevel) {
            props.setModalContent(fuseBoxContent);
        }

        if (fuseSwitch) {
            conditionsBlockAudio.play();
            document.querySelector('.fence-background').classList.add('fence-lighted');
            document.querySelector('.night-background').classList.add('night-lights');
            document.querySelector('.night-background').classList.add('night-active');
            props.setConditionsLock(true);

            if (document.querySelector('.modal-background')) {
                fuseClickAudio.play();
            }
        } else {
            if (document.querySelector('.modal-background')) {
                fuseClickAudio.play();
            }
            resetFuse();
        }
    }, [fuseSwitch])

    useEffect(() => {
        resetFuse();
        setFuseSwitch(false);
    }, [props.startLevel])

    return (
        <>
        <button className='fuse-box' onClick={ModalFuse}>
            {fuseActive && <img src={fuseOpenImg} alt='fuse' />}
        </button>
        </>
    );
}

export default FuseBox;