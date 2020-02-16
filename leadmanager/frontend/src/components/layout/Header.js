import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

 class Header extends Component {
static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}
    render() {
    console.log(this.props.auth.isAuthenticated)
        const { isAuthenticated, user} = this.props.auth;
        const authLinks = (
               <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
               <span className="navbar-text mr-3">
               <strong>
                   {user ? `Welcome ${user.username}`: ''}
               </strong>
               </span>
                   <li className="nav-item">
                        <button onClick={this.props.logout} className="nav-link btn btn-info btn-sm text-light">LogOut</button>
                   </li>

                </ul>
        )

        const guestLinks = (
               <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                  <li className="nav-item">
                     <Link to="/login" className="nav-link"> Login </Link>
                  </li>
                   <li className="nav-item">
                      <Link to="/register" className="nav-link"> Register </Link>
                   </li>

                </ul>
                        )
        return (
           <nav className="navbar navbar-expand-sm navbar-light bg-light">
           <div className="container">
              <a className="navbar-brand" href="#">Lead Managers</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">

                  </div>
                  {this.props.auth.isAuthenticated ? authLinks : guestLinks}
                   </div>
            </nav>
        )
    }
}
const mapToProps = (state) => ({
    auth: state.auth
})
export default connect(mapToProps, {logout})(Header)
