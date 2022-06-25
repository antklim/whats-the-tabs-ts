import Debug from "debug"
import * as http from "http"

const DEFAULT_PORT = 3000

const debug = Debug("wtt:http")

const normalizePort = (v: string | undefined) => {
  if (v === undefined) return DEFAULT_PORT

  const port = parseInt(v, 10)

  return isNaN(port) ? DEFAULT_PORT : port
}

const onError = (err: Error) => {
  console.error("ERRPR", err)
}

const onListening = () => {
  const port = 3000
  debug(`server is listening on ${port} 🚀`)
}

const server = http.createServer()
server.listen(normalizePort(process.env.PORT))
server.on("error", onError)
server.on("listening", onListening)
