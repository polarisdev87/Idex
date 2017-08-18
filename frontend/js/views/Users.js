import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { updateUser, fetchUsers, deleteUsers } from '../actions/users'

class Users extends Component {

  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    const { dispatch, isFetchingUsers } = this.props;

    if(!isFetchingUsers) {
      dispatch(fetchUsers());
    }
  }

  render() {

    let {
      usersArr, role, dispatch, usersErrorMessage
    } = this.props;

    if(usersArr) {
      usersArr.forEach((user) => {
        user.authorities.forEach((authority) => {
          user[authority.name] = 'true';
        });

        user.enabledString = user.enabled ? 'true' : 'false';
      });
    }

    function checkboxHandler(cell, row) {
      return (
        <input type='checkbox' checked={ cell === 'true'} disabled />
      );
    }

    const cellEditProps = {
      mode: 'dbclick',
      blurToSave: true,
      beforeSaveCell: Users.handleBeforeSaveCell,
      afterSaveCell: this.handleEdit
    };

    const options = {
      afterDeleteRow: this.handleDelete,
    };

    if(typeof usersArr !== 'undefined') {
      return (
        <div className="container">
          <div className="text-center">
            { usersErrorMessage !== 'undefined' &&
            <h3 className="red">
              { usersErrorMessage }
            </h3>
            }
          </div>
          <h1 className="text-center">Users</h1>
          <BootstrapTable
            data={ usersArr }
            keyField='id'
            options={ role === 'ROLE_ADMIN' ? { afterDeleteRow: this.handleDelete } : { } }
            deleteRow={ role === 'ROLE_ADMIN' }
            selectRow={ {mode: 'checkbox'} }
            striped
            cellEdit={ cellEditProps }
            hover
            condensed
            search
            pagination>
            <TableHeaderColumn hidden hiddenOnInsert autovalue dataField='id'>Username</TableHeaderColumn>
            <TableHeaderColumn dataField='username'>Username</TableHeaderColumn>
            <TableHeaderColumn dataField='firstName'>First Name</TableHeaderColumn>
            <TableHeaderColumn dataField='lastName'>Last Name</TableHeaderColumn>
            <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
            <TableHeaderColumn dataField='ROLE_ADMIN' dataFormat={ checkboxHandler } editable={ role === 'ROLE_ADMIN' ? { readonly: role !== 'ROLE_ADMIN', type: 'checkbox', options: { values:  role === 'true:false' } } : false }>Admin*</TableHeaderColumn>
            <TableHeaderColumn dataField='ROLE_USER_MANAGER' dataFormat={ checkboxHandler } editable={ { type: 'checkbox', options: { values: 'true:false' } } }>Manager</TableHeaderColumn>
            <TableHeaderColumn dataField='enabledString' dataFormat={ checkboxHandler } editable={ { type: 'checkbox', options: { values: 'true:false' } } }>Enabled</TableHeaderColumn>

          </BootstrapTable>
          <span>Double click any field to edit it. Fields marked with a * can only be edited by admins.</span>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <h1>Users</h1>
          { usersErrorMessage !== 'undefined' &&
          <h3 className="red">
            { usersErrorMessage }
          </h3>
          }
          <div>Loading data... If you see this for more than a few seconds, your session has
            expired/invalidated and you should logout then log back in.</div>
        </div>
      );
    }
  }

  handleDelete(rowKeys) {

    const { dispatch } = this.props;

    dispatch(deleteUsers(rowKeys));
  }

  handleEdit(rowBeforeObject, updatedValueKey, updatedValue) {
    rowBeforeObject[updatedValueKey] = updatedValue;

    const updatedUser = {
      id: rowBeforeObject.id,
      username: rowBeforeObject.username,
      firstName: rowBeforeObject.firstName,
      lastName: rowBeforeObject.lastName,
      email: rowBeforeObject.email,
      enabled: typeof rowBeforeObject.enabledString !== 'undefined' && rowBeforeObject.enabledString === 'true',
      admin: typeof rowBeforeObject.ROLE_ADMIN !== 'undefined' && rowBeforeObject.ROLE_ADMIN === 'true',
      userManager: typeof rowBeforeObject.ROLE_USER_MANAGER !== 'undefined' && rowBeforeObject.ROLE_USER_MANAGER === 'true',
    };

    const { dispatch } = this.props;

    dispatch(updateUser(updatedUser));
  }

  static handleBeforeSaveCell(rowBeforeObject, updatedValueKey, updatedValue) {
    return rowBeforeObject[updatedValueKey] + '' !== updatedValue;
  }
}

Users.propTypes = {
  usersArr: PropTypes.array,
  usersErrorMessage: PropTypes.string,
  isFetchingUsers: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {

  const { users, auth } = state;
  const { isFetchingUsers, usersArr, usersErrorMessage } = users;
  const { role } = auth;

  return {
    isFetchingUsers, role, usersArr, usersErrorMessage
  }
}

export default connect(mapStateToProps)(Users);