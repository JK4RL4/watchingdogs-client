import { useEffect, useState, useRef } from 'react';

function Results(props) {
    let [levelTime, setLevelTime] = useState([]);
    let staticLevelTime = useRef([]);
    let staticLevelSkip = useRef(0);
    let [responseTime, setResponseTime] = useState([]);
    let [totalTime, setTotalTime] = useState();
    let [totalResponse, setTotalResponse] = useState();
  
    const getLevelTime = (response) => {
        if (response.length > 0) {
            let responseAttempts = getAllAttempts(response);
            let responseTime = 0;
            if (responseAttempts.length > 0) {
                responseAttempts.forEach(attempt => {
                    attempt = attempt.split('-');
                    let endTime;
                    let startTime = attempt.shift();
                    if (attempt.length > 0) {
                        endTime = attempt.pop();
                    } else {
                        endTime = startTime;
                    }
                    startTime = parseInt(startTime.match(/\d+/g));
                    endTime = parseInt(endTime.match(/\d+/g));
                    responseTime = responseTime + (endTime - startTime);
                })
            }
            return (responseTime/1000).toFixed(1);
        }
    }

    const getAttemptsCount = (response) => {
        let responseAttempts = getAllAttempts(response);
        let responseCount = responseAttempts.length;

        if (responseCount > 0) {
            if (responseAttempts[responseAttempts.length - 1].split('-').length === 1) {
                responseCount--;
            }
        } 

        let attemptsCount = 0;
        responseAttempts.forEach(attempt => {
            attemptsCount += attempt.split('-').length - 2;
        });

        if (responseCount === 1 && attemptsCount === 0) {
            return 0;
        } else {
            return attemptsCount + responseCount;
        }
    }


    const getAllAttempts = (response) => {
        let responseAttempts = [];
        let currentAttempt;
        do {
            currentAttempt = getAttempt(response);
            responseAttempts.push(currentAttempt.attempt.join('-'));
            response = currentAttempt.response;
        } while (response.length > 0)
        return responseAttempts;
    }

    const getAttempt = (response) => {
        let attempt = [];
        do {
            attempt.push(response.shift());
        } while (String(attempt[attempt.length - 1]).search('end') !== 0)
        return {attempt: attempt, response: response};
    }

    const getUserData = () => {
        let dataResults = [];
        let i = 1;

        for(let level in props.userData) {
            let levelData = <tr key={i}>
                                <td className='results-row-level'>
                                    <p>{i}</p>
                                </td>
                                <td className='results-row-atemts'>
                                    <p>{props.userData[level].lives}</p>
                                </td>
                                <td className='results-row-especial'>
                                    {props.userData[level].pass && !props.userData[level].skip && !props.userData[level].abandon && <p className='results-pass'>Sí</p>}
                                    {!props.userData[level].pass && !props.userData[level].skip && !props.userData[level].abandon && <p className='results-fail'>No</p>}
                                    {props.userData[level].skip && <p className='results-skip'>Saltado</p>}
                                    {props.userData[level].abandon && <p className='results-abandon'>Abandono</p>}
                                </td>
                                <td className='results-row-time'>
                                    <p>{levelTime[i - 1]}</p>
                                </td>
                                <td className='results-row-response'>
                                    <p>{responseTime[i - 1]}</p>
                                </td>
                            </tr>
            dataResults.push(levelData);
            i++;
        }

        return dataResults;
    }

    const getSum = (array) => {
        let sum = 0;
        array.forEach((element) => {
            if (parseFloat(element)) {
                sum += parseFloat(element);
            } else {
                staticLevelSkip.current = staticLevelSkip.current + 1;
            }
        })
        return sum;
    }

    useEffect(() => {
        if (levelTime.length === 0) {
            let currentLevelTime = [];
            for(let level in props.userData) {
                if (props.userData[level].response.length > 0) {
                    let newLevelTime = getLevelTime(props.userData[level].response.slice());
                    currentLevelTime.push(newLevelTime);
                }
            }
            setLevelTime(currentLevelTime);
            staticLevelTime.current = currentLevelTime; 
            setTotalTime(getSum(currentLevelTime).toFixed(1));
        }
    }, [])

    useEffect(() => {
        if (staticLevelTime.current.length > 0 && responseTime.length === 0) {
            let currentResponseTime = [];
            let i = 0;
            for(let level in props.userData) {
                if (props.userData[level].response.length > 0) {
                    let attemptsCount = getAttemptsCount(props.userData[level].response.slice());
                    if (attemptsCount > 0) {
                        let newResponseTime = staticLevelTime.current[i] / attemptsCount;
                        currentResponseTime.push(newResponseTime.toFixed(1));
                    } else {
                        currentResponseTime.push('-');
                    }
                }
                i++;
            }
            setResponseTime(currentResponseTime);
            setTotalResponse((getSum(currentResponseTime) / (currentResponseTime.length - staticLevelSkip.current)).toFixed(1));
        }
    }, [staticLevelTime.current])

    return (
        <div className='results'>
            <h1 className='title'>The Waiting Dogs</h1>
            <table>
                <thead>
                    <tr className='results-header'>
                        <th className='results-level'>Nivel</th>
                        <th className='results-attemps'>Vidas</th>
                        <th className='results-especial'>Superado</th>
                        <th className='results-level-time'>Tiempo</th>
                        <th className='results-response-time'>Reacción</th>
                    </tr>
                </thead>
                <tbody>
                    {getUserData()}
                    <tr>
                        <td className='results-row-level'>
                        </td>
                        <td className='results-row-atemts'>
                            <p className='results-total'>Total:</p>
                        </td>
                        <td className='results-row-especial'>
                        </td>
                        <td className='results-row-time'>
                            <p>{totalTime}</p>
                        </td>
                        <td className='results-row-response'>
                            <p>{totalResponse}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className='results-button' onClick={() => window.location = 'http://localhost:3000/'} to='/'>Salir</button>
        </div>
    );
}

export default Results;