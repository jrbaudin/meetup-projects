import { DB, logger } from '../../../index'
import { getPushLogs as modelGetPushLogs } from '../../../../models/pushModel'

export const getPushLogs = (
  id: number, // location_id
  sorting = 'desc', // valid strings are desc and asc, default is desc
  limit = 10
) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        const logs = await modelGetPushLogs(id)
        if (logs.success) {
          resolve(logs.data)
        }
      } else {
        reject({
          code: 'MISSING_VALUE',
          message: 'Mandatory value locationId was missing',
        })
      }
    } catch (error) {
      reject({
        code: error && error.code ? error.code : error && error.name ? error.name : 'CAUGHT_ERROR',
        message: error.message,
      })
    }
  })
}
