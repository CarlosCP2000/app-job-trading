import CryptoJS from "crypto-js";

export const encryptText = (password: string, secretKey: string) => {
  const iv = crypto.getRandomValues(new Uint8Array(16));
  return CryptoJS.AES.encrypt(password, secretKey, {
    // @ts-ignore
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};
