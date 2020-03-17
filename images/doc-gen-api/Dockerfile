FROM parcjason/alpine-node-libreoffice:latest
ARG APP_ROOT=/opt/app-root/src
ENV NO_UPDATE_NOTIFIER=true \
    APP_PORT=8000
WORKDIR ${APP_ROOT}

# copy over our application code...
COPY ./app/ ./
# install it
RUN rm -rf node_modules && npm ci

EXPOSE ${APP_PORT}
CMD ["npm", "run", "start"]

