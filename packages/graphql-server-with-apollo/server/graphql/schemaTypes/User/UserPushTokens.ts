const UserPushTokens = `
    # These are the registered push tokens for the user
    type UserPushTokens {
        push_token: String
        push_provider: String
        created_date: String
        disabled_date: String
        app: String
        uuid: String
        active: Boolean
    }
`

export default UserPushTokens
