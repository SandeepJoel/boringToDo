import React from 'react';
import { Route } from 'react-router-dom'
const Title = ({numberOfLists}) => {
  return (
    <div>
      <Route exact path='/' render={ () => <h1> All Lists ({numberOfLists}) </h1>} />
      <Route exact path='/:listname' render={ ({match}) => <h1>{match.params.listname}</h1> } />
    </div>
  );
};

export default Title;
