FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=personal-website --docker

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

RUN turbo build --filter=personal-website...

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/personal-website/next.config.mjs .
COPY --from=installer /app/apps/personal-website/package.json .

COPY --from=installer --chown=nextjs:nodejs /app/apps/personal-website/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/personal-website/.next/static ./apps/personal-website/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/personal-website/public ./apps/personal-website/public

CMD node apps/personal-website/server.js