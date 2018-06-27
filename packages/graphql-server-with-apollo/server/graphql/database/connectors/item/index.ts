import { DB, logger } from '../../../index'

export const getItemWithId = (itemId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT id, location_id, company_id, title, description, deleted, created_date
      FROM items
      WHERE id = $id
      ORDER BY id DESC
      `,
      {
        bind: {
          id: itemId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(item => {
        resolve(item[0])
      })
      .catch(error => {
        reject({
          message: 'ERROR When getting Item from db',
          originalMessage: error.message,
        })
      })
  })
}

export const getItemsForLocation = (locationId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT id, location_id, company_id, title, description, deleted, created_date
      FROM items
      WHERE location_id = $location_id
      ORDER BY id DESC
      `,
      {
        bind: {
          location_id: locationId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(items => {
        resolve(items)
      })
      .catch(error => {
        reject({
          message: 'ERROR When getting Item for Location from db',
          originalMessage: error.message,
        })
      })
  })
}
