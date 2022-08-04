import React, { Component, useState } from 'react';

export const ResidentDetails = (props) => {
  
  // functions to handle user delete confirmation pop-up
  function showUserDeleteConfirm() {
    document.getElementById('overlay').hidden = false;
  }

  function closeUserDeleteConfirm() {
    document.getElementById('overlay').hidden = true;
  }

  function deleteConfirmed(selection) {
    if (selection) {
      props.deleteFunction();
      document.cookie = 'userId=0; path=/; max-age=0;';
      document.cookie = 'linkedInAuthCode=0; path=/; max-age=0;';
      props.changeAuthenticated(false);
    }
    closeUserDeleteConfirm();
  }

  const elems = []; 
  console.log(props.user);
  for (const key in props.user) {
    if (key !== 'id') {
      if (key === 'hiringroles') {
        continue;
      } else if (props.user[key] === '') {
        if (key === 'name') {
          elems.push(<input placeholder="Set Name Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } else if (key === 'email') {
          elems.push(<input placeholder="Set Email Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } else if (key === 'linkedin') {
          elems.push(<input placeholder="Set LinkedIn Profile Link Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } else if (key === 'photo') {
          elems.push(<input placeholder="Set Photo Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } else if (key === 'organization') {
          elems.push(<input placeholder="Set Organization Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } else if (key === 'message') {
          elems.push(<input placeholder="Set Message Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
        } 
      } else {
        elems.push(<input value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
      }
    }
  }

  return (
    <div className="ResidentDetails">
      <div className="overlay" id="overlay" hidden>
        <div className="confirm-box">
          <h2>Delete User Account Confirmation</h2>
          <p>Are you sure you want to delete your account?</p>
          <button className="deleteConfirm" onClick={() => {deleteConfirmed(true);}}>Delete</button>
          <button className="deleteCancel" onClick={() => {deleteConfirmed(false);}}>Cancel</button>
        </div>
      </div>
      {elems}
      <button className="standardButton" onClick={props.saveFunction}>Save</button>
      <button className="standardButton" onClick={showUserDeleteConfirm}>Delete Account</button>
      <button className="standardButton" onClick={() => {
        document.cookie = 'userId=0; path=/; max-age=0;';
        document.cookie = 'linkedInAuthCode=0; path=/; max-age=0;';
        props.changeAuthenticated(false);
      }
      }>Log out</button>
    </div>
  );
};