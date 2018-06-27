import { DB, logger } from '../../../index'
import * as _ from 'lodash'

export const getLocations = async (filter?: string, offset = null, limit = null) => {
  try {
    const selectQuery = `
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
      FROM locations l
        LEFT JOIN companies c ON c.id = l.company_id
        LEFT JOIN timezones tz ON tz.id = l.timezone_id
        LEFT JOIN currencies cu ON cu.id = l.currency_id
        LEFT JOIN countries co ON co.id = l.country_id
        LEFT JOIN vats v ON v.id = co.vat_id
        LEFT JOIN retailer_users ru ON ru.id = l.created_by_user_id
      ORDER BY l.id DESC LIMIT $limit OFFSET $offset`

    const locations = await DB.query(selectQuery, {
      bind: {
        offset,
        limit,
      },
      type: DB.QueryTypes.SELECT,
    })

    if (filter && !_.isEmpty(filter)) {
      return _.filter(locations, (location: any) => {
        return (
          _.includes(_.toUpper(location.name), _.toUpper(filter)) ||
          _.includes(_.toUpper(location.description), _.toUpper(filter))
        )
      })
    } else {
      return locations
    }
  } catch (error) {
    throw error
  }
}

export const getLocationWithId = (locationId: Number) => {
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
      FROM locations l
        LEFT JOIN companies c ON c.id = l.company_id
        LEFT JOIN timezones tz ON tz.id = l.timezone_id
        LEFT JOIN currencies cu ON cu.id = l.currency_id
        LEFT JOIN countries co ON co.id = l.country_id
        LEFT JOIN vats v ON v.id = co.vat_id
        LEFT JOIN retailer_users ru ON ru.id = l.created_by_user_id
      WHERE l.id = $id
      ORDER BY l.id DESC`,
      {
        bind: {
          id: locationId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(location => {
        resolve(location[0])
      })
      .catch(error => {
        reject({
          message: `ERROR When getting Location with id '${locationId}' from db`,
          originalMessage: error.message,
        })
      })
  })
}

export const getLocationCustomerInformation = (locationId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT
        location_id,
        special_report,
        contact_person,
        report_email,
        bank_details
      FROM location_customer_information
      WHERE location_id = $id
      ORDER BY location_id DESC`,
      {
        bind: {
          id: locationId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(locationInfo => {
        resolve(locationInfo[0])
      })
      .catch(error => {
        reject({
          message: `ERROR When getting Location Customer Info with id '${locationId}' from db`,
          originalMessage: error.message,
        })
      })
  })
}
