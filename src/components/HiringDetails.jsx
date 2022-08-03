import React, { Component, useEffect, useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';

export const HiringDetails = (props) => {
  let elems = [];
  const { hiringroles } = props.user;
  const newroles = props.newroles;

  // elems.push(<input value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
  //  elems.push(<input placeholder="Set Name Here" value={props.user[key]} onChange={(e) => props.changeInput(e, key)}/>);
  if (hiringroles && hiringroles.length) {
    elems = hiringroles.map((e, i) => (
      <div className="HiringInputItem" key={`role-${i}`}>
        <input
          value={hiringroles[i]}
          onChange={(e) => props.changeInput(e, 'hiringroles', i)}
        />
        <button onClick={(e) => props.deleteHiringRole(i)}> - </button>
      </div>
    ));
  }

  let newElems = [];
  if (newroles && newroles.length && !(elems.length === 1 && hiringroles[0] === '')) {
    newElems = newroles.map((e, i) => (
      <div className="HiringInputItem" key={`newrole-${i}`}>
        <input
          value={newroles[i]}
          onChange={(e) => props.changeNewrole(e, i)}
        />
        <div className="spacer" />
      </div>
    ));
  }

  return (
    <div className="HiringDetails">
      <h3>Are you hiring?</h3>
      <h5>{"Yes, I'm hiring for..."}</h5>
      {elems}
      {newElems}
      <div className='HiringDetailsBottomButtons'>
        <button onClick={props.incrementNewroles}> + </button>
        <button className="SaveButton" onClick={props.saveFunction}>
          Save
        </button>
      </div>
    </div>
  );
};
