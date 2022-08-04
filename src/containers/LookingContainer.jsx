import React, { Component, useEffect, useState } from 'react';
import { LookingList } from '../components/LookingList';

export const LookingContainer = (props) => {
  const [recruitingList, setRecruitingList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/residents')
      .then(res => res.json())
      .then(res => setRecruitingList(res));
  }, []);

  return (
    <LookingList recruitingList={recruitingList} />
  );
};