#!/bin/bash
root_path=$(cd `dirname $0`;pwd)
start_time=$(date +%s)
echo "项目目录：$root_path"

set -ex

export PATH=$NODEJS_12_16_1_BIN:$YARN_1_22_4_BIN:$PATH

node -v

cd $root_path
export PUPPETEER_SKIP_DOWNLOAD=1
npm config set puppeteer_download_host=https://npm.taobao.org/mirrors
npm install --registry=hhttps://registry.npm.taobao.org
if [[ $? -eq 0 ]];then
    echo 'npm install completely'
else
    echo 'Fail to npm install'
    exit 1
fi

npm link akb-ts

# lint
npm run lint

# 编译ts，输出到dist
npm run build

# 创建输出目录
rm -rf output
mv dist output

mkdir -p output/{logs,tmp,public}

cp -r bin node_modules package.json pm2.config.js output


# 耗时计算
end_time=$(date +%s)
compile_time=$(($end_time - $start_time))
echo "build completely in ${compile_time}s"
