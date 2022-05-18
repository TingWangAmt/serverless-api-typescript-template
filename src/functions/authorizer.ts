import jwkToPem,{JWK} from 'jwk-to-pem';
import jsonwebtoken from 'jsonwebtoken';
import jwks from './jwks.json';
// JWT形式判定用の正規表現
const jwtRe = /(?<header>.+)\.(?<payload>.+)\.(?<signature>.+)/;

/**
 * オーソライザー (トークンを検証する)
 * @param {string} token IDトークン
 * @returns {Object} ペイロード
 */
const authorizer = (token:string) => {

  // 入力はJWT形式の文字列か?
  const match = jwtRe.exec(token);
  if (!match) throw 'AuthError';

  // ヘッダー情報を取得
  const header = JSON.parse(Buffer.from(match.groups!.header, 'base64').toString());

  // 公開キーから使用するキーを選ぶ
  const jwk = jwks.keys.find(k => k.kid == header.kid);
  if (!jwk) throw 'AuthError';

  // 外部ライブラリを使って署名を確認する
  const pem = jwkToPem(jwk as JWK);
  const claim = jsonwebtoken.verify(token, pem) as jsonwebtoken.JwtPayload;

  // 有効期限の確認
  const now = Number(new Date()) / 1000;
  if (now > claim.exp! || now < claim.auth_time) throw 'AuthError';

  // トークン種別の確認
  // IDトークンを使う場合の claim.token_use は 'id'
  // アクセストークンを使う場合の claim.token_use は 'access'
  if (claim.token_use !== 'id') throw 'AuthError';

  // ハレて認可された
  return claim;
};

export default authorizer;
