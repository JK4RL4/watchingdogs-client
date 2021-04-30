import { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import variables from './variables';
import Login from './Login';
import Game from './Game';
import Results from './Results';
import './App.css';

function App() {
  let [userData, setUserData] = useState([false, variables.userData]);
  let updatingFlag = useRef(false);
  let updateData = useRef([]);
  let [userId, setUserId] = useState();
  let staticUserId = useRef();
  let [userApiData, setUserApiData] = useState();
  let registeredUser = useRef(false);
  let loadingData = useRef(false);

  const convertUserData = (data) => {
    let apiUserData = {
      'level1_lives': data.level1.lives,
      'level1_pass': data.level1.pass,
      'level1_skip': data.level1.skip,
      'level1_abandon': data.level1.abandon,
      'level1_response': data.level1.response.join(', '),

      'level2_lives': data.level2.lives,
      'level2_pass': data.level2.pass,
      'level2_skip': data.level2.skip,
      'level2_abandon': data.level2.abandon,
      'level2_response': data.level2.response.join(', '),

      'level3_lives': data.level3.lives,
      'level3_pass': data.level3.pass,
      'level3_skip': data.level3.skip,
      'level3_abandon': data.level3.abandon,
      'level3_response': data.level3.response.join(', '),

      'level4_lives': data.level4.lives,
      'level4_pass': data.level4.pass,
      'level4_skip': data.level4.skip,
      'level4_abandon': data.level4.abandon,
      'level4_response': data.level4.response.join(', '),

      'level5_lives': data.level5.lives,
      'level5_pass': data.level5.pass,
      'level5_skip': data.level5.skip,
      'level5_abandon': data.level5.abandon,
      'level5_response': data.level5.response.join(', '),

      'level6_lives': data.level6.lives,
      'level6_pass': data.level6.pass,
      'level6_skip': data.level6.skip,
      'level6_abandon': data.level6.abandon,
      'level6_response': data.level6.response.join(', '),

      'level7_lives': data.level7.lives,
      'level7_pass': data.level7.pass,
      'level7_skip': data.level7.skip,
      'level7_abandon': data.level7.abandon,
      'level7_response': data.level7.response.join(', '),

      'level8_lives': data.level8.lives,
      'level8_pass': data.level8.pass,
      'level8_skip': data.level8.skip,
      'level8_abandon': data.level8.abandon,
      'level8_response': data.level8.response.join(', '),

      'level9_lives': data.level9.lives,
      'level9_pass': data.level9.pass,
      'level9_skip': data.level9.skip,
      'level9_abandon': data.level9.abandon,
      'level9_response': data.level9.response.join(', ')
    }

    return apiUserData;
  }

  const postUserData = () => {
    let fetchData = {
      method: 'POST',
      body: JSON.stringify(convertUserData(userData[1])),
      headers: {
          'Content-type': 'application/json; charset=UTF-8'
      }
    }
    
    fetch('http://localhost:8000/user/post', fetchData)
    .then(res => res.json())
    .then(data => {
      let dataFilter = data.status.match(/\d+/g);
      setUserId(dataFilter[0]);
      // console.log(data);
    })
  }

  const putUserData = () => {
    let fetchData = {
      method: 'PUT',
      body: JSON.stringify(convertUserData(updateData.current.shift())),
      headers: {
          'Content-type': 'application/json; charset=UTF-8'
      }
    }
    
    fetch('http://localhost:8000/user/' + staticUserId.current, fetchData)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      if (updateData.current.length > 0) {
        putUserData();
      } else {
        updatingFlag.current = false;
      }
    })
  }

  const getUserData = (id) => {
    let fetchData = {
      method: 'GET',
      headers: {
          'Content-type': 'application/json; charset=UTF-8'
      }
    }
    
    fetch('http://localhost:8000/user/' + id, fetchData)
    .then(res => res.json())
    .then(data => {
      setUserApiData(Object.assign(data));
      // console.log(data);
    })
  }

  const getLevelResponse = (response) => {
    response = response.split(', ');
    if (response[0]) {
      return response;
    } else {
      return [];
    }
  }

  useEffect(() => {
    if (userId) {
      staticUserId.current = userId;
    }
  }, [userId])

  useEffect(() => {
    if (staticUserId.current && userData[0] && !loadingData.current) {
      let arrayAux = updateData.current.slice();
      arrayAux.push(Object.assign(userData[1]));
      updateData.current = arrayAux;
    } else if (staticUserId.current && userData[0] && loadingData.current) {
      loadingData.current = false;
      setUserData([false, Object.assign(userData[1])]);
    }
  }, [userData])

  useEffect(() => {
    if (staticUserId.current && !updatingFlag.current) {
      updatingFlag.current = true;
      // putUserData();
    }
  }, [updateData.current]) 

  useEffect(() => {
    if (userApiData) {
      let apiData = {
        level1: {
          lives: userApiData.level1_lives,
          pass: userApiData.level1_pass,
          skip: userApiData.level1_skip,
          abandon: userApiData.level1_abandon,
          response: getLevelResponse(userApiData.level1_response)
        },
        level2: {
          lives: userApiData.level2_lives,
          pass: userApiData.level2_pass,
          skip: userApiData.level2_skip,
          abandon: userApiData.level2_abandon,
          response: getLevelResponse(userApiData.level2_response)
        },
        level3: {
          lives: userApiData.level3_lives,
          pass: userApiData.level3_pass,
          skip: userApiData.level3_skip,
          abandon: userApiData.level3_abandon,
          response: getLevelResponse(userApiData.level3_response)
        },
        level4: {
          lives: userApiData.level4_lives,
          pass: userApiData.level4_pass,
          skip: userApiData.level4_skip,
          abandon: userApiData.level4_abandon,
          response: getLevelResponse(userApiData.level4_response)
        },
        level5: {
          lives: userApiData.level5_lives,
          pass: userApiData.level5_pass,
          skip: userApiData.level5_skip,
          abandon: userApiData.level5_abandon,
          response: getLevelResponse(userApiData.level5_response)
        },
        level6: {
          lives: userApiData.level6_lives,
          pass: userApiData.level6_pass,
          skip: userApiData.level6_skip,
          abandon: userApiData.level6_abandon,
          response: getLevelResponse(userApiData.level6_response)
        },
        level7: {
          lives: userApiData.level7_lives,
          pass: userApiData.level7_pass,
          skip: userApiData.level7_skip,
          abandon: userApiData.level7_abandon,
          response: getLevelResponse(userApiData.level7_response)
        },
        level8: {
          lives: userApiData.level8_lives,
          pass: userApiData.level8_pass,
          skip: userApiData.level8_skip,
          abandon: userApiData.level8_abandon,
          response: getLevelResponse(userApiData.level8_response)
        },
        level9: {
          lives: userApiData.level9_lives,
          pass: userApiData.level9_pass,
          skip: userApiData.level9_skip,
          abandon: userApiData.level9_abandon,
          response: getLevelResponse(userApiData.level9_response)
        },
      }
      setUserData([true, Object.assign(apiData)]);
    }
  }, [userApiData])

  return (
    <BrowserRouter>
      <div className='App'>
        <Route exact path='/'>
          {/* <Login postUserData={postUserData} getUserData={getUserData} userId={userId} setUserId={setUserId} registeredUser={registeredUser}
                 loadingData={loadingData} />
        </Route>
        <Route exact path='/game'> */}
          <Game loadingData={loadingData} userData={userData} setUserData={setUserData} staticUserId={staticUserId} putUserData={putUserData} 
                registeredUser={registeredUser} />
        </Route>
        <Route exact path='/results'>
          <Results userData={userData[1]} />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
