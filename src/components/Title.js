import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'

let Title = (props) => {
  return (
    <div>
      <Route exact path='/' render={ () => <h1> All Lists ({props.lists.length}) </h1>} />
      <Route exact path='/:listname' render={ ({match}) => <h1>{match.params.listname}({props.lists.find(item => item.listName === match.params.listname).data.length})</h1> } />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  lists: state.listCollection
});

Title = connect(
  mapStateToProps,
  null
)(Title);
export default Title;
