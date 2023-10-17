FROM node:19-alpine
WORKDIR /react-first/
COPY public/ /react-first/public
COPY src/ /react-first/src
COPY package.json /react-first/
RUN yarn install
CMD ["yarn", "start"]