import React, { Component, useEffect, useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';

export const HiringDetails = (props) => {

  
  let elems = [];
  const { hiringroles } = props.user;
  const newroles = props.newroles;

  // elems.push(<input value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
  //  elems.push(<input placeholder="Set Name Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
  if (hiringroles && hiringroles.length) {
    elems = hiringroles.map((e, i) => <div key={`role-${i}`}><input value={hiringroles[i]} onChange={(e) => props.changeInput(e, 'hiringroles', i)} /></div>);
  }

  let newElems = [];
  if (newroles && newroles.length) {
    newElems = newroles.map((e, i) => <div key={`newrole-${i}`}><input value={newroles[i]} onChange={(e) => props.changeNewrole(e, i)} /></div>);
  }



  return (
    <div className="HiringDetails">
      <h3>Are you hiring?</h3>
      {'Yes, I\'m hiring for...'}
      {elems}
      {newElems}
      <button onClick={props.incrementNewroles}> + </button>
      <button className="SaveButton" onClick={props.saveFunction}>Save</button>
    </div>
  );
};