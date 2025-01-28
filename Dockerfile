FROM node:20

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm prisma generate

EXPOSE 4000

CMD ["pnpm", "run", "dev"] 