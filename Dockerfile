FROM node:18-alpine as builder

RUN npm install -g pnpm
RUN npm install -g next

WORKDIR /app

COPY package*.json ./

RUN if [ -f "package-lock.json" ]; then npm ci; \
    elif [ -f "yarn.lock" ]; then yarn; \
    elif [ -f "pnpm-lock.yaml" ]; then pnpm install; fi

COPY . .

RUN npx run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

RUN chown -R 10500:10500 "/app"

USER 10500

EXPOSE 3000

CMD [ "npm", "start" ]
