FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --filter @pnpm-monorepo/nuxt-app --frozen-lockfile

EXPOSE 3001
CMD ["pnpm", "exec", "nx", "run", "@pnpm-monorepo/nuxt-app:start"]
