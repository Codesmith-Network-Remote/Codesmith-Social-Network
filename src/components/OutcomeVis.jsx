import React, { Component, useEffect } from 'react';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

export const OutcomeVis = (props) => {
  const { outcomeOrgs, outcomeInds } = props;
  const orgLabels = [];
  const indLabels = [];
  if (outcomeOrgs && outcomeInds && outcomeOrgs.length && outcomeInds.length) {
    for (let i = 0; i < outcomeOrgs.length; i++) {
      orgLabels.push(outcomeOrgs[i].organization);
    }
    for (let i = 0; i < outcomeInds.length; i++) {
      indLabels.push(outcomeInds[i].industry);
    }
  }
  // const orgLabels = outcomeOrgs.map((elem) => elem.organization);
  // const orgLabels = [...outcomeOrgs]
  // const indLabels = outcomeInds.map((elem) => elem.industry);

  const orgChart = {
    labels: orgLabels,
    datasets: [{
      label: 'Alumni Outcomes By Organization',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'white',
      data: outcomeOrgs
    }]
  };

  const indChart = {
    labels: indLabels,
    datasets: [{
      label: 'Alumni Outcomes By Industry',
      backgroundColor: 'rgb(255, 99, 132)',
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