FROM node:20

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm prisma:generate && pnpm prisma:generate:test

EXPOSE 4000

CMD ["sh", "-c", "pnpm run dev"] 