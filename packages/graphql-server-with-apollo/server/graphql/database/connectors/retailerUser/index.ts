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
      FROM retailer_users
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
      SELECT id, username, email, name, phone, created_date, timezone, last_seen_date, updated_password
      FROM retailer_users
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
          message: 'ERROR When getting Retailer User from db',
          originalMessage: error.message,
        })
      })
  })
}

export const getActiveLocation = (userId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT
        l.id,
        l.name,
        l.latitude,
        l.longitude,
        l.address,
        l.zip,
        l.city,
        l.created_date,
        l.tint_color,
        l.description,
        l.phone,
        l.website,
        l.website_short,
        l.logo_image_url,
        l.feature_image_url,
        l.beta,
        l.type,
        l.hidden,
        l.deleted,
        l.verified,
        l.dvh,
        c.name as company_name,
        c.id as company_id,
        c.created_date as company_created_date,
        c.status as company_status,
        c.owner as company_owner,
        c.owner_initials as company_owner_initials,
        c.created_by_user_id as company_created_by_user_id,
        tz.id as timezone_id,
        tz.timezone as timezone_key,
        tz.offset as timezone_offset,
        cu.id as currency_id,
        cu.name as currency_name,
        cu.code as currency_code,
        cu.fraction as currency_fraction,
        cu.symbol as currency_symbol,
        cu.is_prefix as currency_is_prefix,
        co.id as country_id,
        co.name as country_name,
        co.alpha2 as country_alpha2,
        co.alpha3 as country_alpha3,
        v.id as country_vat_id,
        v.value as country_vat_value,
        ru.id as created_by_user_id,
        ru.name as created_by_user_name
      FROM retailer_user_active_location rual
        LEFT JOIN locations l ON rual.location_id = l.id
        LEFT JOIN companies c ON c.id = l.company_id
        LEFT JOIN timezones tz ON tz.id = l.timezone_id
        LEFT JOIN currencies cu ON cu.id = l.currency_id
        LEFT JOIN countries co ON co.id = l.country_id
        LEFT JOIN vats v ON v.id = co.vat_id
        LEFT JOIN retailer_users ru ON ru.id = l.created_by_user_id
      WHERE rual.retailer_user_id = $user_id
      ORDER BY rual.retailer_user_id DESC`,
      {
        bind: {
          user_id: userId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(location => resolve(location[0]))
      .catch(error => {
        logger.debug(
          `getActiveLocation(): No active location could be fetched for user with id '${userId}'`
        )
        logger.debug(`getActiveLocation(): error.message => '${error.message}'`)
        resolve({})
      })
  })
}

export const getUserPushTokens = (userId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT push_token, push_provider, created_date, app, uuid, active
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
