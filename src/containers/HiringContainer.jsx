import React, { Component, useEffect, useState } from 'react';
import { ResidentBox } from '../components/ResidentBox.jsx';
import { HiringDetails } from '../components/HiringDetails.jsx';

export const HiringContainer = (props) => {
  const [user, setUser] = useState({});
  const [userIcon, setUserIcon] = useState({});
  const [saved, changeSaved] = useState(false);
  const [newroles, setNewroles] = useState(['']);


  useEffect(() => {
    fetch('http://localhost:8080/residents/id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: document.cookie.split('; userId=')[1]
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(`setting user to: ${JSON.stringify(res)}`);
        setUser(res);
        return res;
      })
      .then(res => setUserIcon({ name: res.name, photo: res.photo }));
  },[saved]);

  useEffect(() => {
    if (saved) {
      fetch('http://localhost:8080/residents/id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: document.cookie.split('; userId=')[1]
        })
      })
        .then(res => res.json())
        .then(res => {
          setUser(res);
          return res;
        })
        .then(res => setUserIcon({ name: res.name, photo: res.photo }))
        .then(changeSaved(false));
    }


  }, [saved]);

  function changeInput(e, key, subKey) {
    if (subKey !== undefined) {
      const newHiringroles = [...user.hiringroles];
      newHiringroles[subKey] = e.target.value;
      setUser({
        ...user,
        hiringroles: newHiringroles,
      });
    } else {
      setUser({
        ...user,
        [key]: e.target.value,
      });
    }
  }

  function incrementNewroles() {
    setNewroles(newroles.concat(''));
  }

  function changeNewrole(e, idx) {
    const newNewroles = [...newroles];
    newNewroles[idx] = e.target.value;
    setNewroles(newNewroles);
  }

  function saveFunction() {
    const updatedUser = {
      ...user,
      hiringroles: user.hiringroles.concat(newroles.filter(e => e !== '')),
    };
    fetch('http://localhost:8080/residents/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: document.cookie.split('; userId=')[1],
        user: updatedUser,
      })
    })
      .then(data => data.json())
      .then(data => console.log('received updated user from saveFunction post', data))
      .then(setNewroles(['']))
      .then(changeSaved(true));
  }

  return (
    <div className="UserContainer">
      <div className="ResidentsProfile">
        <ResidentBox photo={userIcon.photo} name={userIcon.name}/>
      </div>
      <HiringDetails user={user} newroles={newroles} changeNewrole={changeNewrole} incrementNewroles={incrementNewroles} changeAuthenticated={props.changeAuthenticated} saveFunction={saveFunction} changeInput={changeInput}/>
    </div>
  );
};