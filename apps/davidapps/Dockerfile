FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=davidapps --docker

FROM node:18-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add pnpm
RUN yarn global add turbo

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/tsconfig.json ./tsconfig.json
RUN pnpm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ARG SHOW_SPAIN
RUN SHOW_SPAIN=$SHOW_SPAIN turbo build --filter=davidapps...

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/davidapps/next.config.mjs .
COPY --from=installer /app/apps/davidapps/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/davidapps/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/davidapps/.next/static ./apps/davidapps/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/davidapps/public ./apps/davidapps/public

CMD node apps/davidapps/server.js