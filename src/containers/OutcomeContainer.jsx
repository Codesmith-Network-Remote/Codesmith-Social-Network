import React, { Component, useEffect, useState } from 'react';
import { OutcomeVis } from '../components/OutcomeVis.jsx';

export const OutcomeContainer = (props) => {
  // const { orgList, industryList } = props;
  const [orgList, setOrgList] = useState();
  const [indList, setIndList] = useState();

  useEffect(() => {
    fetch('http://localhost:8080/outcomes')
      .then(res => res.json())
      .then(res => {
        console.log('outcomes response', res);
        setOrgList(res.orgs);
        setIndList(res.industries); });
  }, []);

  return (
    <div className="CohortPage">
      <div className='cohortTitle'>Codesmith Alumni Outcomes</div>
      <OutcomeVis outcomeOrgs={orgList} outcomeInds={indList} />
    </div>
  );

};