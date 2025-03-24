import { defineStore } from 'pinia'
import { ALERT_DELAY_MS, STORE_ID_ALERTS } from '~/constants'

export interface Alert {
  id: number
  type: 'success' | 'warning' | 'error'
  message: string
  timer: NodeJS.Timeout
}

export const useAlertsStore = defineStore(STORE_ID_ALERTS, () => {
  const alerts = ref<Alert[]>([])

  function addAlert({ type, message }: Pick<Alert, 'type' | 'message'>) {
    const newAlert: Alert = {
      id: Date.now(),
      type,
      message,
      timer: setTimeout(() => {
        removeAlert(newAlert.id)
      }, ALERT_DELAY_MS),
    }
    alerts.value.unshift(newAlert)
  }

  function removeAlert(id: number) {
    const alertIndex = alerts.value.findIndex(alert => alert.id === id)
    if (alertIndex >= 0) {
      clearTimeout(alerts.value[alertIndex].timer)
      alerts.value.splice(alertIndex, 1)
    }
  }

  return {
    alerts,
    addAlert,
    removeAlert,
  }
})