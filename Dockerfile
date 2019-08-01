FROM node:10.15.3-alpine as base

LABEL Author="Konstantin Zhukov <kvzhkv@vitotechnology.com>"

# Set working directory
WORKDIR /app

# Copy app dependencies list
COPY package.json ./
COPY yarn.lock ./

# Install all dependencies
RUN yarn

# Copy source code
COPY src ./src
COPY tsconfig.json .

# Compile code
RUN yarn build

# Create production build stage
FROM node:10.15.3-alpine as production

# Set working dir
WORKDIR /app

# Copy app dependencies list
COPY --from=base /app/package.json ./
COPY --from=base /app/yarn.lock ./

# install production dependencies
RUN yarn --production

# Copy lib folder with .js files
COPY --from=base /app/lib ./lib

EXPOSE 5000

CMD [ "yarn", "start" ]