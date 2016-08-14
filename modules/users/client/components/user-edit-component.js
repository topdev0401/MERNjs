import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import toastr from 'toastr';

class UserEditComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null
    };
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.user && nextProps.user.username && !_.isEqual(nextProps.user.username, this.state.username)) {
      this.setState({
        username: nextProps.user.username
      });
    }
  }

  render() {
    return (
      <div className='row'>
        <div className='col-xs-12'>
          <h3 className='text-center'>Edit User Component</h3>
          { this.props.user ?
            <div>
              <form
                className="form-horizontal"
                onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <label
                    htmlFor="username"
                    className="col-xs-2 control-label">
                    Username
                  </label>
                  <div className="col-xs-10">
                    <input
                      type="text"
                      className="form-control"
                      ref="username"
                      value={this.state.username}
                      onChange={this.handleUsernameChange.bind(this)}
                      placeholder="Username" />
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="password"
                    className="col-xs-2 control-label">
                    Password
                  </label>
                  <div className="col-xs-10">
                    <input
                      type="password"
                      className="form-control"
                      ref="password"
                      placeholder="Password" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-xs-offset-2 col-xs-5">
                    <a
                      className="btn btn-default btn-block btn-flat"
                      data-toggle="modal"
                      data-target="#userDeleteConfirm">
                      Delete User
                    </a>
                  </div>
                  <div className="col-xs-5">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-flat">
                      Edit User
                    </button>
                  </div>
                </div>
              </form>
              {/* User delete confirmation modal */}
              <div
                id="userDeleteConfirm"
                className="modal fade"
                tabIndex="-1"
                role="dialog">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <h4 className="modal-title text-center">User Delete Confirmation</h4>
                    </div>
                    <div className="modal-body">
                      <p>Are you really want to delete this user?</p>
                    </div>
                    <div className="modal-footer">
                      <div className="row">
                        <div className="col-xs-offset-6 col-xs-3">
                          <button
                            type="button"
                            className="btn btn-default btn-block btn-flat"
                            data-dismiss="modal">
                            No
                          </button>
                        </div>
                        <div className="col-xs-3">
                          <button
                            type="button"
                            className="btn btn-primary btn-block btn-flat"
                            data-dismiss="modal"
                            onClick={this.deleteUser.bind(this)}>
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> : <p><b><i>Please select a user...</i></b></p>
          }
        </div>
      </div>
    );
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();

    if (username.length < 1) {
      toastr.warning('Username is required');
      return false;
    }
    if (password.length < 1) {
      toastr.warning('Password is required');
      return false;
    }

    // create object
    const user = {
      username: username,
      password: password
    }

    // call the action
    this.props.updateUser(user, this.props.user._id);

    // Clear form
    ReactDOM.findDOMNode(this.refs.password).value = "";
  }

  deleteUser(event) {
    event.preventDefault();
    this.props.deleteUser(this.props.user._id);
  }
}

export default UserEditComponent;