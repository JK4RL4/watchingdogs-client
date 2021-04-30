import { useEffect, useState } from 'react';

function Timer(props) {
    let [phase, setPhase] = useState();

    useEffect(() => {
        if (props.level.levelName === 'Nivel 1' || props.level.levelName === 'Nivel 2' || props.level.levelName === 'Nivel 3') {
            setPhase('phase1');
        } else if (props.level.levelName === 'Nivel 4' || props.level.levelName === 'Nivel 5' || props.level.levelName === 'Nivel 6') {
            setPhase('phase2');
        } else if (props.level.levelName === 'Nivel 7' || props.level.levelName === 'Nivel 8' || props.level.levelName === 'Nivel 9') {
            setPhase('phase3');
        }
    }, [props.level.levelName])

    return (
        <div className='timer'>
            <div className='timer-bar' />
            <div className='timer-level'>
                <p>{props.level.levelName}</p>
            </div>
            {phase === 'phase1' && <div className='timer-clock timer-clock-std' />}
            {phase === 'phase2' && <div className='timer-clock timer-clock-plus' />}
            {phase === 'phase3' && <div className='timer-clock timer-clock-plus-plus' />}
        </div>
    )
}
export default Timer;