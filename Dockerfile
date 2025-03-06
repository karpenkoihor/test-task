FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install --save-dev imagemin-cli imagemin-mozjpeg imagemin-pngquant

COPY . .

RUN npx imagemin "public/img/*.{jpg,jpeg,png}" --out-dir="public/img"

RUN npm run build

FROM node:16 AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY --from=build /app/build ./build

COPY server ./server

EXPOSE 3000

CMD ["node", "server/server.js"]
