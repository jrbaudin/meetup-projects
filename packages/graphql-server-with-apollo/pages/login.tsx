import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import isEmpty from 'lodash/isEmpty'
import localForage from 'localforage'
import * as request from 'superagent'
// components
import Page from '../components/layout'

class Login extends React.Component {
  state = {
    email: false,
    password: false,
  }

  handleSubmit = e => {
    e.preventDefault()

    const email = this.state.email
    const password = this.state.password

    if (email && password) {
      request
        .post('/api/login')
        .auth(email, password)
        .then(res => {
          const status = res.status
          const body = res.body
          if (body && body.success) {
            const authToken = body.token
            if (!isEmpty(authToken)) {
              localForage
                .setItem('token', authToken)
                .then(() => {
                  console.log('User was logged in!')
                  Router.replace('/')
                })
                .catch(err => {
                  console.error('Login err', err)
                })
            } else {
              console.error('No token was returned from the API')
            }
          } else {
            console.error('Success was false. Error when trying to log in', body.error)
          }
        })
        .catch(err => {
          console.error('Error when trying to log in', err)
        })
    }
  }

  handleEmailChange = e => {
    this.setState({
      email: e.target.value,
    })
  }

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value,
    })
  }

  render() {
    return (
      <Page
        render={({ token }) => {
          if (token) console.log('Already logged in')
          return (
            <div className="row pt-3">
              <div className="col-sm">
                {token ? (
                  <React.Fragment>
                    <span className="pr-2">Already logged in, go to</span>
                    <Link href="/graphiql" as={`/graphiql?token=${token}`}>
                      <button type="button" className="btn btn-primary">
                        Graphiql
                      </button>
                    </Link>
                  </React.Fragment>
                ) : (
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Username/Email address</label>
                      <input
                        onChange={this.handleEmailChange}
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter username/email"
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        Some helpful text
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input
                        onChange={this.handlePasswordChange}
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </div>
          )
        }}
      />
    )
  }
}

export default Login
