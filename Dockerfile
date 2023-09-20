FROM node:18-alpine as builder

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./

RUN if [ -f "package-lock.json" ]; then npm ci; \
    elif [ -f "yarn.lock" ]; then yarn; \
    elif [ -f "pnpm-lock.yaml" ]; then pnpm install; fi

COPY . .

RUN npm run build

FROM node:18-alpine

RUN adduser -D -u 10500 appuser

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

RUN chown -R appuser:appuser /app

EXPOSE 3000

USER appuser

CMD [ "npm", "start" ]
