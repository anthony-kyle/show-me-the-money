import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { togglePage, logoutUser } from '../actions/auth'

class Nav extends React.Component {
  state = {
    showBurger: false
  }

  toggleBurger = () => {
    this.setState({
      showBurger: !this.state.showBurger
    })
  }

  render() {
    const { auth, logout, page } = this.props
    const { showBurger } = this.state
    return <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <span onClick={this.toggleBurger} className={`navbar-burger burger ${showBurger ? 'is-active' : ''}`} data-target="navbarMenuHeroA">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroA" className={`navbar-menu ${showBurger ? "is-active" : ''}`}>

          <>
            {auth.isAuthenticated
              ? (
                <>
                  <div className="navbar-start">
                    <Link className="navbar-item is-large" to='/form'>New Meeting</Link>
                    <Link onClick={() => page()} className="navbar-item is-large" to='/history'>Meeting History</Link>
                    <Link className="navbar-item is-large" to='/graph'>Graph</Link>
                  </div>
                  <div className="navbar-end">
                    <h1 className="navbar-item is-large">Welcome {auth.user.username}</h1>
                    <Link to='/' className="navbar-item is-large" onClick={() => logout()}>Logout</Link>
                  </div>
                </>
              )
              : (
                <>
                  <div className="navbar-end">
                    <Link onClick={this.toggleBurger} className="navbar-item is-large" to='/login'>Login</Link>
                    <Link onClick={this.toggleBurger} className="navbar-item" to='/register'>Register</Link>
                  </div>
                </>
              )
            }
          </>
        </div>
      </div>
    </nav>
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      const confirmSuccess = () => ownProps.history.push('/')
      dispatch(logoutUser(confirmSuccess))
    },
    page: () => {
      dispatch(togglePage("list", 1))
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
