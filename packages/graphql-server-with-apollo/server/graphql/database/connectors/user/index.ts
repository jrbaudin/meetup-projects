import { DB, logger } from '../../../index'
import * as _ from 'lodash'

export const getUsers = async (filter?: string, offset = null, limit = null) => {
  try {
    const selectQuery = `
      SELECT
        id,
        username,
        email,
        name,
        phone,
        guest,
        created_date,
        timezone
      FROM users
      GROUP BY id
      ORDER BY name ASC LIMIT $limit OFFSET $offset`

    const users = await DB.query(selectQuery, {
      bind: {
        offset,
        limit,
      },
      type: DB.QueryTypes.SELECT,
    })

    if (filter && !_.isEmpty(filter)) {
      return _.filter(users, (user: any) => {
        return (
          _.includes(_.toUpper(user.name), _.toUpper(filter)) ||
          _.includes(_.toUpper(user.username), _.toUpper(filter)) ||
          _.includes(_.toUpper(user.email), _.toUpper(filter))
        )
      })
    } else {
      return users
    }
  } catch (error) {
    throw error
  }
}

export const getUserWithId = (userId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT id, username, email, name, phone, guest, created_date, timezone
      FROM users
      WHERE id = $id
      ORDER BY id DESC
      `,
      {
        bind: {
          id: userId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(user => {
        resolve(user[0])
      })
      .catch(error => {
        reject({
          message: 'ERROR When getting User from db',
          originalMessage: error.message,
        })
      })
  })
}

export const getUserSettings = (userId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT notification_settings as settings
      FROM user_settings
      WHERE user_id = $user_id
      ORDER BY user_id DESC
      `,
      {
        bind: {
          user_id: userId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(userSettings => {
        if (userSettings.length === 0) {
          logger.debug(`No settings could be fetched for user with id '${userId}'`)
        }
        const settings =
          userSettings && userSettings[0] && userSettings[0].settings
            ? userSettings[0].settings
            : {}
        // logger.debug(`userSettings[0] for user with id '${userId}' => ${JSON.stringify(settings)}`)
        resolve(settings)
      })
      .catch(error => {
        logger.debug(`getUserSettings(): No settings could be fetched for user with id '${userId}'`)
        logger.debug(`getUserSettings(): error.message => '${error.message}'`)
        resolve({})
      })
  })
}

export const getUserPushTokens = (userId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT push_token, push_provider, created_date, disabled_date, app, uuid, active
      FROM user_push_tokens
      WHERE user_id = $user_id
      ORDER BY created_date DESC
      `,
      {
        bind: {
          user_id: userId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(userPushTokens => {
        if (userPushTokens.length === 0) {
          logger.debug(
            `getUserPushTokens() No Push tokens could be fetched for user with id '${userId}'`
          )
        }
        resolve(userPushTokens)
      })
      .catch(error => {
        logger.debug(
          `getUserPushTokens(): No Push tokens could be fetched for user with id '${userId}'`
        )
        logger.debug(`getUserPushTokens(): error.message => '${error.message}'`)
        resolve([])
      })
  })
}

export const getUserDevices = (userId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT uuid, platform, created_date
      FROM user_devices
      WHERE user_id = $user_id
      ORDER BY created_date DESC
      `,
      {
        bind: {
          user_id: userId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(userDevices => {
        if (userDevices.length === 0) {
          logger.debug(`getUserDevices() No Devices could be fetched for user with id '${userId}'`)
        }
        resolve(userDevices)
      })
      .catch(error => {
        logger.error(`getUserDevices(): No Devices could be fetched for user with id '${userId}'`)
        logger.error(`getUserDevices(): error.message => '${error.message}'`)
        resolve([])
      })
  })
}

export const getUserFollowedLocations = (userId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT id, user_id, location_id, created_date
      FROM user_followed_locations
      WHERE user_id = $user_id
      ORDER BY created_date DESC
      `,
      {
        bind: {
          user_id: userId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(userFollowedLocations => {
        if (userFollowedLocations.length === 0) {
          logger.debug(
            `getUserFollowedLocations() No Followed Locations could be fetched for user with id '${userId}'`
          )
        }
        resolve(userFollowedLocations)
      })
      .catch(error => {
        logger.debug(
          `getUserFollowedLocations(): No Followed Locations could be fetched for user with id '${userId}'`
        )
        logger.debug(`getUserFollowedLocations(): error.message => '${error.message}'`)
        resolve([])
      })
  })
}

export const getUserChannelSubscriptions = (userId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT id, user_id, location_id, created_date, app, channel, action
      FROM user_channel_subscriptions
      WHERE user_id = $user_id
      ORDER BY created_date DESC
      `,
      {
        bind: {
          user_id: userId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(userChannelSubscriptions => {
        if (userChannelSubscriptions.length === 0) {
          logger.debug(
            `getUserChannelSubscriptions() No Channel Subscriptions could be fetched for user with id '${userId}'`
          )
        }
        resolve(userChannelSubscriptions)
      })
      .catch(error => {
        logger.debug(
          `getUserChannelSubscriptions(): No Channel Subscriptions could be fetched for user with id '${userId}'`
        )
        logger.debug(`getUserChannelSubscriptions(): error.message => '${error.message}'`)
        resolve([])
      })
  })
}
