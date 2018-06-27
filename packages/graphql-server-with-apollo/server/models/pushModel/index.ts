import * as _ from 'lodash'
import logger from '../../util/logger'
import DB from '../../database'
import { IGetPushLogsResponse } from './types'

export const getPushLogs = (
  id: number, // location_id
  sorting = 'desc', // valid strings are desc and asc, default is desc
  limit = 10 // how many results to return, default is 10
): Promise<IGetPushLogsResponse> => {
  return new Promise(async resolve => {
    try {
      const getPushesQuery = `
        SELECT
          pl.id as log_id,
          pl.push_data as log_push_data,
          pl.meta_data as log_meta_data,
          pl.created_date as log_created_at,
          pl.meta_data ->> 'location_id' as log_location_id,
          pl.meta_data ->> 'sale_id' as log_sale_id,
          pq.id as queue_id,
          pq.app as queue_app,
          pq.type as queue_type,
          pq.meta_data as queue_meta_data,
          pq.meta_data ->> 'sale_id' as queue_sale_id,
          pq.parsed as queue_parsed,
          pq.cancelled as queue_cancelled,
          pq.target_date as queue_target_date,
          pq.created_date as queue_created_date,
          pq.error as queue_error
        FROM push_log pl
        JOIN push_queue pq ON pq.id = pl.queue_id
        WHERE pl.meta_data ->> 'location_id' = $location_id
        ORDER BY
          pl.meta_data ->> 'location_id' ASC,
          pl.created_date DESC`

      const result = await DB.query(getPushesQuery, {
        bind: {
          location_id: id,
        },
        type: DB.QueryTypes.SELECT,
      })

      if (result && result[0]) {
        resolve({
          success: true,
          data: result,
        })
      } else {
        resolve({
          success: false,
          error: {
            code: 'NO_PUSH_LOGS_FOUND',
            message: 'Nothing found on this location_id',
          },
        })
      }
    } catch (error) {
      logger.error(`pushModel.getPushLogs() error='${JSON.stringify(error, null, 2)}'`)
      const errMessage =
        error && error.errors && error.errors[0] && error.errors[0].message
          ? error.errors[0].message
          : 'Unknown Error when communicating with the database'
      resolve({
        success: false,
        error: {
          code: error.name,
          message: errMessage,
        },
      })
    }
  })
}
