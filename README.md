# ローカル環境構築
## Environment　Setup
Install [git](https://git-scm.com/downloads)
Install [node 14.x](https://nodejs.org/ja/download/releases/)
Install [Aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

Git Bashでコマンドを実行します。

## Aws cli setting
以下のコマンドを実行してAWS_ACCESS_KEY_IDとAWS_SECRET_ACCESS_KEYを設定します。
AWS_DEFAULT_REGIONは`ap-northeast-1`（東京）にします。

```
aws configure
```

このコマンドを実行すると以下のように二つのファイルに設定が行われます。

~/.aws/credentials
```
[default]
aws_access_key_id=[Your key id]
aws_secret_access_key=[Your access key]
```

~/.aws/config
```
[default]
region=ap-northeast-1
```

## Project Setup (Backend)
First install `serverless` and get that up and running. documentation [here](https://serverless.com/framework/docs/providers/aws/guide/quick-start/).

You can use the standard `sls` commands or utilise the npm scripts in the project.

Then:

```
npm install
```

## Deployment - Dev

```
npm run deploy
```
