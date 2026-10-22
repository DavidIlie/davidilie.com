ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS builder
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@10.0.0 --activate
WORKDIR /home/node/app

# Install and generate the Prisma client before copying the source, so these
# layers come from the build cache until the lockfile or schema changes.
COPY package.json pnpm-lock.yaml .npmr[c] ./
RUN pnpm install
COPY prisma ./prisma
RUN npx prisma generate

COPY . .
ENV NEXT_PUBLIC_APP_URL="https://davidilie.com"
RUN SKIP_ENV_VALIDATION=true NEXT_SKIP_TYPECHECK=1 pnpm build

FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /home/node/app

ENV NODE_ENV=production

COPY --from=builder /home/node/app/next.config.mjs ./
COPY --from=builder /home/node/app/public ./public
COPY --from=builder /home/node/app/package.json ./package.json

COPY --from=builder --chown=node:node /home/node/app/.next/standalone ./
COPY --from=builder --chown=node:node /home/node/app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
