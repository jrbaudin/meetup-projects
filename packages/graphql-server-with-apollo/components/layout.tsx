import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import localForage from 'localforage'

/**
 * <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#f56085">
    <link rel="apple-touch-icon" sizes="180x180" href="%PUBLIC_URL%/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16x16.png">
    <link rel="mask-icon" href="%PUBLIC_URL%/safari-pinned-tab.svg" color="#f56085">
    <!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
 */
export interface LayoutProps {
  render: Function
}

class Layout extends React.Component<LayoutProps, {}> {
  static propTypes = {
    render: PropTypes.func.isRequired,
  }

  state = {
    token: false,
  }

  componentDidMount() {
    localForage
      .getItem('token')
      .then(userToken => {
        if (userToken) {
          this.setState({
            token: userToken,
          })
        }
      })
      .catch(error => {
        console.error('Load token error', error)
      })
  }

  logout = () => {
    localForage
      .setItem('token', undefined)
      .then(() => {
        console.log('User token was removed')
        Router.replace('/')
      })
      .catch(err => {
        console.error('Log out err', err)
      })
  }

  render() {
    return (
      <div>
        <Head>
          <title>Example API</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="theme-color" content="#f56085" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
          <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#f56085" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
            integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
            crossOrigin="anonymous"
          />
        </Head>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            <img
              src="/static/icon-white-copy-2.svg"
              width="30"
              height="30"
              className="d-inline-block align-top pr-2"
              alt=""
            />
            Example API
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link href="/" as="/">
                <a className="nav-item nav-link active" href="#">
                  Home
                </a>
              </Link>
              {this.state.token && (
                <Link href="/graphiql" as={`/graphiql?token=${this.state.token}`}>
                  <a className="nav-item nav-link">Graphiql</a>
                </Link>
              )}
            </div>
          </div>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              {!this.state.token && (
                <Link href="/login" as="/login">
                  <a className="btn btn-light btn-sm" role="button">
                    Log in
                  </a>
                </Link>
              )}
              {this.state.token && (
                <button
                  onClick={() => this.logout()}
                  className="btn btn-outline-light btn-sm"
                  type="button"
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        </nav>
        <div className="container">
          {this.props.render({
            token: this.state.token,
          })}
        </div>
        <script
          src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"
          integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
          crossOrigin="anonymous"
        />
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
          integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
          crossOrigin="anonymous"
        />
      </div>
    )
  }
}

export default Layout
