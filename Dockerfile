FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm link

ENTRYPOINT ["fantacalcio-voti-live"]