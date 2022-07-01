import Koa from "koa"
import { v4 as uuid } from "uuid"

import { SongsUseCase } from "./songs"
import { songsRepositoryFactory } from "./songs/repo"

import infoRouter from "./routes/info"
import songsRouter from "./routes/songs"

const repo = songsRepositoryFactory()
const songsUseCase = new SongsUseCase(repo)

const app = new Koa()

app.use(async (ctx, next) => {
  const correlationIdheaderName = "x-correlation-id"

  let correlationId = ctx.request.get(correlationIdheaderName)
  if (correlationId === "") {
    correlationId = uuid()
  }

  ctx.set(correlationIdheaderName, correlationId)

  await next()
})

app.use(infoRouter.routes())
app.use(songsRouter(songsUseCase).routes())

app.use((ctx) => {
  ctx.throw(404)
})

export default app
