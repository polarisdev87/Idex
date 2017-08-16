import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

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

    let {
      ideasArr, role, dispatch, ideasErrorMessage
    } = this.props;

    function checkboxHandler(cell, row) {
      return (
        <input type='checkbox' checked={ cell === 'true'} disabled />
      );
    }

    const cellEditProps = {
      mode: 'dbclick',
      blurToSave: true,
      beforeSaveCell: Ideas.handleBeforeSaveCell,
      afterSaveCell: this.handleEdit
    };

    const options = {
      afterDeleteRow: this.handleDelete,
    };

    if(typeof ideasArr !== 'undefined') {
      return (
        <div className="container">
          <div className="text-center">
            { ideasErrorMessage !== 'undefined' &&
            <h3 className="red">
              { ideasErrorMessage }
            </h3>
            }
          </div>
          <h1 className="text-center">Ideas</h1>
          <BootstrapTable
            data={ ideasArr }
            keyField='id'
            deleteRow={ role === 'ROLE_ADMIN' }
            selectRow={ {mode: 'checkbox'} }
            striped
            cellEdit={ cellEditProps }
            hover
            condensed
            search
            pagination>
            <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
            <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
            <TableHeaderColumn dataField='stage'>Stage</TableHeaderColumn>
          </BootstrapTable>
          <span>Double click any field to edit it.</span>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <h1>Ideas</h1>
          { ideasErrorMessage !== 'undefined' &&
          <h3 className="red">
            { ideasErrorMessage }
          </h3>
          }
          <div>Loading data... If you see this for more than a few seconds, your session has
            expired/invalidated and you should logout then log back in.</div>
        </div>
      );
    }
  }

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