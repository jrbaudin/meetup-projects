import React from 'react'
import Link from 'next/link'
import Page from '../components/layout'

export default () => (
  <Page
    render={({ token }) => {
      return (
        <div className="row pt-3">
          <div className="col-sm">
            {token ? (
              <React.Fragment>
                <span className="pr-2">Go to</span>
                <Link href="/graphiql" as={`/graphiql?token=${token}`}>
                  <button type="button" className="btn btn-primary">
                    Graphiql
                  </button>
                </Link>
              </React.Fragment>
            ) : (
              <Link href="/login" as="/login">
                <button type="button" className="btn btn-primary">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )
    }}
  />
)
