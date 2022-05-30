import { apiService } from './apiService'
import { ENDPOINTS } from '../utils/constants'

export function resetPiPrecision() {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await apiService().get(ENDPOINTS.RESET_PI_PREICISON)
      return resolve(res.data)
    } catch (err) {
      return reject(err)
    }
  })
}
