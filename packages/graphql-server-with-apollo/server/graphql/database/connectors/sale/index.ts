import { DB, logger } from '../../../index'

export const getSaleWithId = (saleId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT id, location_id, day, created_date, start_date, end_date, pickup_date, paused, started, unverified, parsed
      FROM sales
      WHERE id = $id
      ORDER BY id DESC
      `,
      {
        bind: {
          id: saleId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(sale => {
        resolve(sale[0])
      })
      .catch(error => {
        reject({
          message: 'ERROR When getting Sale from db',
          originalMessage: error.message,
        })
      })
  })
}

export const getSalesForLocation = (locationId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT id, location_id, day, created_date, start_date, end_date, pickup_date, paused, started, unverified, parsed
      FROM sales
      WHERE location_id = $id
      ORDER BY id DESC
      `,
      {
        bind: {
          id: locationId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(sales => {
        resolve(sales)
      })
      .catch(error => {
        reject({
          message: 'ERROR When getting Sale from db',
          originalMessage: error.message,
        })
      })
  })
}
