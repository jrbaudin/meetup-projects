FROM node:alpine AS base

RUN mkdir -p /code
WORKDIR /code
COPY package.json .

FROM base AS dependencies
# Install production node dependencies
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
# Copy the prod dependencies aside
RUN cp -R node_modules prod_node_modules
# Install all dependencies
RUN npm install

FROM base as release

COPY --from=dependencies /code/prod_node_modules ./node_modules
COPY index.js .

CMD [ "npm", "start" ]