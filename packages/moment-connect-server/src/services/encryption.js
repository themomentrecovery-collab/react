import crypto from 'crypto';
import { config } from '../utils/env.js';

const ALGORITHM = 'aes-256-gcm';
const KEY = config.aesKey;
const IV_LENGTH = 12;

export function encrypt(text) {
  if (!text) {
    return { cipher: null, iv: null, authTag: null };
  }
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return {
    cipher: encrypted,
    iv,
    authTag,
  };
}

export function decrypt(cipher, iv, authTag) {
  if (!cipher || !iv || !authTag) {
    return null;
  }
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(cipher), decipher.final()]);
  return decrypted.toString('utf8');
}
