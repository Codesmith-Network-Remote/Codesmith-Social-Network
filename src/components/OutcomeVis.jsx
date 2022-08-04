import React, { Component, useEffect } from 'react';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

export const OutcomeVis = (props) => {
  const { outcomeOrgs, outcomeInds } = props;
  const orgLabels = [];
  const indLabels = [];
    
  const backgroundColorOrg = [];
  const backgroundColorInd = [];

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  if (outcomeOrgs && outcomeInds && outcomeOrgs.length && outcomeInds.length) {
    for (let i = 0; i < outcomeOrgs.length; i++) {
      orgLabels.push(outcomeOrgs[i].organization);
      backgroundColorOrg.push(getRandomColor());
    }
    for (let i = 0; i < outcomeInds.length; i++) {
      indLabels.push(outcomeInds[i].industry);
      backgroundColorInd.push(getRandomColor());
    }
  }

  const orgChart = {
    labels: orgLabels,
    datasets: [{
      label: 'Alumni Outcomes By Organization',
      backgroundColor: backgroundColorOrg,
      borderColor: 'white',
      data: outcomeOrgs
    }]
  };

  const indChart = {
    labels: indLabels,
    datasets: [{
      label: 'Alumni Outcomes By Industry',
      backgroundColor: backgroundColorInd,
      borderColor: 'white',
      data: outcomeInds
    }]
  };

  const options = {
    layout: {
      padding: 20
    },
    parsing: {
      key: 'count'
    }
  };

  return (
    <div>
      <Pie data={orgChart} options={options}/>
      <Pie data={indChart} options={options}/>
    </div>
  );
};
