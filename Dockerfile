FROM node:18-alpine as builder

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN if [ -f "package-lock.json" ]; then npm ci; \
    elif [ -f "yarn.lock" ]; then yarn; \
    elif [ -f "pnpm-lock.yaml" ]; then pnpm install; fi

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:18-alpine AS runner

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app
COPY --from=builder /app/.next/standalone ./standalone
COPY --from=builder /app/public /app/standalone/public
COPY --from=builder /app/.next/static /app/standalone/.next/static

RUN chown -R 10500:10500 "/app"

USER 10500

EXPOSE 3000

CMD ["node", "./standalone/server.js"]

