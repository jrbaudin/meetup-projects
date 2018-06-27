import { DB, logger } from '../../../index'

export const getCartWithId = (cartId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT id, user_id, location_id, sale_id, created_date, deleted, deleted_date, closed, closed_date
      FROM carts
      WHERE id = $id
      ORDER BY id DESC
      `,
      {
        bind: {
          id: cartId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(cart => {
        resolve(cart[0])
      })
      .catch(error => {
        reject({
          message: 'ERROR When getting Cart from db',
          originalMessage: error.message,
        })
      })
  })
}

export const getCartsForUser = (userID: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT id, user_id, location_id, sale_id, created_date, deleted, deleted_date, closed, closed_date
      FROM carts
      WHERE user_id = $user_id
      ORDER BY id DESC
      `,
      {
        bind: {
          user_id: userID,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(carts => {
        resolve(carts)
      })
      .catch(error => {
        reject({
          message: 'ERROR When getting Cart for User from db',
          originalMessage: error.message,
        })
      })
  })
}

export const getCartsForSale = (saleID: Number) => {
  console.log('sale id is = ' + saleID)
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT id, user_id, location_id, sale_id, created_date, deleted, deleted_date, closed, closed_date
      FROM carts
      WHERE sale_id = $sale_id
      ORDER BY id DESC
      `,
      {
        bind: {
          sale_id: saleID,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(carts => {
        resolve(carts)
      })
      .catch(error => {
        reject({
          message: 'ERROR When getting Cart for Sale from db',
          originalMessage: error.message,
        })
      })
  })
}
