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
```
# install serverless globally
npm install

# project setup
git clone XXXX
cd [project folder]
npm install

# checkout the develop branch
git checkout develop
```

## Project Setup (Frontend)

```
# install amplify cli to manager frontend
$ npm install -g @aws-amplify/cli

# project setup
git clone XXXX
cd [project folder]
npm install

# checkout the develop branch
git checkout develop
```

## Amplify cli setting
以下のコマンドでのAWSアカウントを設定します。

```
amplify configure
```

1.上記コマンドを実行するとブラウザが起動されてAWSでログインします。
ログイン出来たら何もせずにコンソール画面に戻ります。

2.「Press Enter to continue」 と表示されていますので、Enterしてください。
regionは同じく`ap-northeast-1`にします。「user name:」は何も入力せず、そのままEnterしてください。

3.ブラウザが自動的に反応して権限設定を行います。
最初には特にこだわりが無ければ、そのまま「次のステップ：XXXX」をクリックしてください。

4.Amplify用のIAMユーザーが作成されましたら、このまま画面を閉じずにコンソール画面に戻ってください。
また「Press Enter to continue」と表示されていますのでEnterをクリックしてください。

5.先ほどのIAMユーザ作成完了画面のアクセスキーIDとシークレットアクセスキーでaccessKeyIdとsecretAccessKeyを設定してください。
