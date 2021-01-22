
set -ex

cd client
npm run build

cd ../server
sh build.sh

cd ../
rm -fr output
cp -fr server/output ./
cp -fr client/dist/* ./output/public

# 制作docker镜像, 更改镜像名称
# docker build -t ts-vue3-koa-starter -f Dockerfile

