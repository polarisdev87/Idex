import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import IdeaRow from '../components/IdeaRow'

import { fetchIdeas, updateIdea, deleteIdeas } from '../actions/ideas'

class Ideas extends Component {

  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillMount() {
    const { dispatch, isFetchingIdeas } = this.props;

    if(!isFetchingIdeas) {
      dispatch(fetchIdeas());
    }
  }

  render() {
    var rows = [];

    if(this.props.ideasArr) {
      this.props.ideasArr.forEach(function(idea) {
        rows.push(<IdeaRow key = { idea.id } idea = { idea } />);
      });
    }

    return (
      <div className="ideas-container">
        <div className="ideas-list">
          <span className="col-md-1 idea-header">Votes</span>
          <span className="col-md-1 idea-header">Title</span>
          <span className="col-md-8 idea-header">Description</span>
          <div className="col-md-2">
            <button onClick={() => this.addIdea()}>Add Idea</button>
          </div>
          <hr />
          { rows }
        </div>
      </div>
      )
  }

  addIdea() {

  }

  /*<TableHeaderColumn hidden hiddenOnInsert autovalue dataField='id'>Username</TableHeaderColumn>
  <TableHeaderColumn hiddenOnInsert dataField='votes'>Votes</TableHeaderColumn>
  <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
  <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
  <TableHeaderColumn dataField='stage'>Stage</TableHeaderColumn>
  <TableHeaderColumn hiddenOnInsert autovalue dataField='submittedBy'>Submitted By</TableHeaderColumn>
  <TableHeaderColumn hiddenOnInsert autovalue dataField='submittedAt'>Submitted At</TableHeaderColumn>
  <TableHeaderColumn hiddenOnInsert autovalue dataField='updatedAt'>Updated At</TableHeaderColumn>
  <TableHeaderColumn dataField='expectedCostInCents'>Expected Cost In Cents</TableHeaderColumn>
  <TableHeaderColumn dataField='actualCostInCents'>Actual Cost In Cents</TableHeaderColumn>
  <TableHeaderColumn dataField='expectedTtm'>Expected Time to Market</TableHeaderColumn>
  <TableHeaderColumn dataField='actualTtm'>Actual Time to Market</TableHeaderColumn>*/

  handleEdit(rowBeforeObject, updatedValueKey, updatedValue) {
    rowBeforeObject[updatedValueKey] = updatedValue;

    const updatedIdea = {
      title: rowBeforeObject.title,
      description: rowBeforeObject.description,
      stage: rowBeforeObject.stage,
    };

    const { dispatch } = this.props;

    dispatch(updateIdea(updatedIdea));
  }

  static handleBeforeSaveCell(rowBeforeObject, updatedValueKey, updatedValue) {
    return rowBeforeObject[updatedValueKey] + '' !== updatedValue;
  }
}

Ideas.propTypes = {
  ideasArr: PropTypes.array,
  ideasErrorMessage: PropTypes.string,
  isFetchingIdeas: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {

  const { ideas, auth } = state;
  const { isFetchingIdeas, ideasArr, ideasErrorMessage } = ideas;
  const { role } = auth;

  return {
    isFetchingIdeas, role, ideasArr, ideasErrorMessage
  }
}

export default connect(mapStateToProps)(Ideas);