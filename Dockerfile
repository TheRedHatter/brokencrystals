###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:14-alpine As build

WORKDIR /usr/src/app

RUN apk add --no-cache --virtual .gyp python3 py3-pip make g++

# Copy and build NestJS server project
COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig.build.json ./
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node nest-cli.json ./
COPY --chown=node:node mikro-orm.config.ts ./
COPY --chown=node:node .env ./
COPY --chown=node:node config ./config
COPY --chown=node:node keycloak ./keycloak
COPY --chown=node:node src ./src

RUN npm ci
RUN npm run build
RUN npm prune --production

# Copy and build client project
COPY --chown=node:node client/package*.json ./client/
COPY --chown=node:node client/src ./client/src
COPY --chown=node:node client/public ./client/public
COPY --chown=node:node client/typings ./client/typings
COPY --chown=node:node client/vcs ./client/vcs
COPY --chown=node:node client/tsconfig.json ./client/tsconfig.json

ENV CYPRESS_INSTALL_BINARY=0
RUN npm ci --prefix=client
RUN npm run build --prefix=client

RUN apk del .gyp

USER node

###################
# PRODUCTION
###################

FROM node:14-alpine As production

WORKDIR /usr/src/app

# Intentionally pinned to known-vulnerable versions (via Alpine v3.10 archive repo)
# to generate Snyk Container "introducedThrough" (image-layer) findings attributable
# to Application Layer instructions (RUN/COPY/ADD), distinct from Base Layer (FROM)
# findings. Tracked for ENG-127725 test-fixture generation.
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.10/main" > /etc/apk/repositories && \
    echo "https://dl-cdn.alpinelinux.org/alpine/v3.10/community" >> /etc/apk/repositories
RUN apk add --no-cache curl=7.66.0-r4
RUN apk add --no-cache openssl=1.1.1k-r0
RUN apk add --no-cache libxml2=2.9.9-r5
RUN apk add --no-cache busybox=1.30.1-r5

COPY --chown=node:node nest-cli.json ./
COPY --chown=node:node mikro-orm.config.ts ./
COPY --chown=node:node .env ./
COPY --chown=node:node config ./config
COPY --chown=node:node keycloak ./keycloak

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/package*.json ./
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

COPY --chown=node:node --from=build /usr/src/app/client/build ./client/build
COPY --chown=node:node --from=build /usr/src/app/client/vcs ./client/vcs

CMD ["npm", "run", "start:prod"]
