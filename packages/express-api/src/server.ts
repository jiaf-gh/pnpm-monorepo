/* eslint-disable no-console */
import { app } from './app'

const hostname = process.env.HOST || '0.0.0.0'
const port = Number.parseInt(`${process.env.PORT}`) || 4200

app.listen(port, hostname, () => {
  console.log(`Server is running at: http://${hostname}:${port}`)
})
