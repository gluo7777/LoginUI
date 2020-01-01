######################################################################################################################
### Building
##  docker build -t loginui .
### Running
##  docker run --rm -it --name loginui -p 3000:5000 loginui
### Notes
##  Add node_modules build to .dockerignore to prevent docker build from hanging
######################################################################################################################

FROM node:12.14.0-alpine3.10

### Build Variables ###
ARG WORKDIR=/home/app/loginui
ARG NODE_ENV=production
ARG PORT=3000

### Environment Variables ###
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

WORKDIR ${WORKDIR}
RUN echo "Working directory=$(pwd)"

### Cache Dependencies ###
COPY package.json package-lock.json ${WORKDIR}/
RUN npm install

### Package React App ###
COPY src src
COPY public public
RUN echo "Working directory=$(pwd)"
RUN ls -al
RUN npm run build

EXPOSE ${PORT}

### Run Static App ###
CMD echo "Environment Variables" \
    && printenv \
    && npx serve -s -l tcp://0.0.0.0:${PORT} build