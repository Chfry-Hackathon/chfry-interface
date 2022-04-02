FROM nginx:stable

# Maintainer
MAINTAINER "kaiwei.lim@bybit.com"

COPY ./dist/ /var/www/
COPY ./server.conf /etc/nginx/conf.d/default.conf

