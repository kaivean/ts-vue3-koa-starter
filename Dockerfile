FROM node:14.15.1-buster-slim

# WORKDIR /root/

# Set correct permissions to use non root user
# chmod for tmp is for a buildkit issue (@alexellis)
# RUN mkdir -p /home/app && mkdir -p /home/app/function \
#     && chown app:app -R /home/app \
#     && chmod 777 /tmp

USER node

# Wrapper/boot-strapper
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# 先复制仅package.json，执行npm安装，这样一旦package.json没有升级，docker会复用该层，提供构建镜像速度
# COPY --chown=node:node output/package.json /home/node/app
# ENV NPM_CONFIG_LOGLEVEL warn
# 只安装dependencies，不安装devDependencies
# RUN npm i --registry=https://registry.npm.taobao.org --production

# 【修改】复制当前容器外的工作目录下的必要目录进入到容器内当前工作目录下，并且都是node权限
# 要注意，如果是目录的话，该命令是复制目录下所有文件和子目录到指定目录，而不是复制该目录到指定目录
COPY --chown=node:node output /home/node/app

# 【修改】如果有单测，容器内执行单测，如果失败返回非0 则退出容器制作
# RUN npm test

# HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

# 【修改】你node服务启动的端口是多少
EXPOSE 8080

# 【修改】容器启动后，自动执行的命令，这里是用pm2启动自己服务，同时要知道自己服务监听的端口
# 如果是pm2的话，需要用pm2-runtime(前台进程)命令启动，而不是pm2命令
CMD ["./bin/node_control", "runtimestart"]

