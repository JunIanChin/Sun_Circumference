import { apiService } from './apiService'
import { ENDPOINTS } from '../utils/constants'

export function getNextPiPrecision() {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await apiService().get(ENDPOINTS.GET_PI_PRECISION)
      return resolve(res.data)
    } catch (err) {
      return reject(err)
    }
  })
}
