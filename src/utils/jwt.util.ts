import jwt, { SignOptions } from 'jsonwebtoken'
import config from 'config'

export function singJWT(object: object, privateKey: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey', options?: SignOptions) {
    const signKey = config.get<string>(privateKey);

    return jwt.sign(object, signKey, { ...(options && options), algorithm: 'RS256'})
}


export function verifyJWT<T>(token: string, publicKey: 'accessTokenPublicKey' | 'refreshTokenPublicKey'): T | null {
    const verifyKey = config.get<string>(publicKey);

    try {
        const decoded = jwt.verify(token, verifyKey) as T;
        return decoded
    } catch(err) {
        return null
    }
}   