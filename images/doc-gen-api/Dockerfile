FROM docker.io/bcgovimages/alpine-node-libreoffice:v1.0.1

ARG APP_ROOT=/opt/app-root/src
ENV NO_UPDATE_NOTIFIER=true \
    APP_PORT=8000
WORKDIR ${APP_ROOT}

# copy over our application code...
COPY ./app .
# install it
RUN npm ci

EXPOSE ${APP_PORT}
CMD ["npm", "run", "start"]
