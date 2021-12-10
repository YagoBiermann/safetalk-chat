FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*
RUN rm -f /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]