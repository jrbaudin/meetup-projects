import Error from '../Error'
// LoginResponse Type for GraphQL
const LoginResponse = `
    # The result of a login action
    type LoginResponse {
        success: Boolean!
        status: Int!
        userId: Int
        username: String
        userFullName: String
        userEmail: String
        userTimezone: String
        userSignupStatus: String
        token: String
        bearer: String
        intercomUserHash: String
        error: Error
    }
`

export default () => [LoginResponse, Error]
