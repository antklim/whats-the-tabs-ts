import Router from "koa-router"

const router = new Router()

router.get("info", "/info", (ctx) => {
  ctx.body = { info: "whats-the-tabs-ts v0.1.0" }
})

export default router
