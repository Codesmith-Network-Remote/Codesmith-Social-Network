import React, { Component, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

export const OutcomeVis = (props) => {
  const { outcomeOrgs, outcomeInds } = props;
  const orgLabels = outcomeOrgs.map((elem) => elem.organization);
  const indLabels = outcomeInds.map((elem) => elem.industry);

  const orgChart = {
    labels: orgLabels,
    datasets: [{
      label: 'Alumni Outcomes By Organization',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: outcomeOrgs
    }]
  };

  const indChart = {
    labels: indLabels,
    datasets: [{
      label: 'Alumni Outcomes By Industry',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
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
    <div className="Cohortbox">
      <Pie data={orgChart} options={options}/>
      <Pie data={indChart} options={options}/>
    </div>
  );
};