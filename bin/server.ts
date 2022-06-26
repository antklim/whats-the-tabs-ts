import * as http from "http"
import Debug from "debug"
import app from "../app"

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
  const addr = server.address()
  if (typeof addr === "object" && addr !== null && "port" in addr) {
    debug(`server is listening on port ${addr.port} 🚀`)
  } else {
    debug(`server started on ${addr} 🚀`)
  }
}

const server = http.createServer(app.callback())
server.listen(normalizePort(process.env.PORT))
server.on("error", onError)
server.on("listening", onListening)
