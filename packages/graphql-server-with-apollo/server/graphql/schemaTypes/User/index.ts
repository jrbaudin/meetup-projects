// User Type for GraphQL
import UserSettings from './UserSettings'
import UserPushTokens from './UserPushTokens'
import UserDevices from './UserDevices'
import UserFollowedLocations from './UserFollowedLocations'
import UserAmbassador from './UserAmbassador'
import UserChannelSubscriptions from './UserChannelSubscriptions'
import Cart from './../Cart'

const User = `
    # User represent the people using the app
    type User {
        id: Int!
        username: String
        email: String
        name: String
        phone: String
        guest: Boolean
        created_date: String
        timezone: String
        settings: UserSettings # The Settings saved for this User
        pushTokens: [UserPushTokens] # The Push tokens registrered for this User
        devices: [UserDevices] # The devices registrered for this User
        followedLocations: [UserFollowedLocations] # The Locations the User is following in the app
        ambassadorStatus: UserAmbassador # Information will be available if the User is an Ambassador
        channelSubscriptions: [UserChannelSubscriptions] # The channel subscriptions for this User
        carts: [Cart] # The carts created by this User
    }
`

export default () => [
  User,
  UserSettings,
  UserPushTokens,
  UserDevices,
  UserFollowedLocations,
  UserAmbassador,
  UserChannelSubscriptions,
  Cart,
]
