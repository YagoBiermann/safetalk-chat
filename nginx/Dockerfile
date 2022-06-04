FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*
RUN rm -f /etc/nginx/conf.d/default.conf
RUN rm -f /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./default.conf /etc/nginx/conf.d/
COPY ./ssl/certificate.key /etc/ssl/private/
COPY ./ssl/certificate.crt /etc/ssl/certs/

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]