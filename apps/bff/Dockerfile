FROM ARTIFACTORY_URL/node:18-ubi8

ARG https_proxy=http://forwardproxy:3128
ARG http_proxy=http://forwardproxy:3128
ARG no_proxy=localost,....

ENV https_proxy=$https_proxy
ENV http_proxy=$https_proxy
ENV no_proxy=$no_proxy
ENV NODE_ENV=production

RUN mkdir -p /home/node/app/server
WORKDIR /home/node/app
COPY ./build/ ./server
RUN chmod -Rf 755 /home/node/

RUN yum install -y jq java-1.8.0-openjdk

ENV USER=appuser
ENV GROUP=appuserGroup
ENV UID=100
ENV GID=102
RUN groupadd \
  "$GROUP" \
  -g "$GID" && \
  useradd \
  "$USER" \
  -G "$GROUP" \
  --uid "$UID"
USER appuser
EXPOSE 5000

USER appuser
RUN mkdir -p /tmp/appd
RUN chown -R "$UID":"$GID" /tmp/appd/

CMD ["node", "./server/server.bundle.js"]