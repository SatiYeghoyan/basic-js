const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');

    const result = [];
    const keyLength = key.length;
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      if (/[A-Z]/i.test(char)) {
        const messageCharCode = char.toUpperCase().charCodeAt(0);
        const keyCharCode = key[keyIndex % keyLength].toUpperCase().charCodeAt(0);
        const encryptedCharCode = ((messageCharCode - 65 + keyCharCode - 65) % 26) + 65;
        result.push(String.fromCharCode(encryptedCharCode));
        keyIndex++;
      } else {
        result.push(char);
      }
    }

    return this.isDirect ? result.join('') : result.reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) throw new Error('Incorrect arguments!');

    const result = [];
    const keyLength = key.length;
    let keyIndex = 0;

    for (let i = 0; i < encryptedMessage.length; i++) {
      const char = encryptedMessage[i];
      if (/[A-Z]/i.test(char)) {
        const encryptedCharCode = char.toUpperCase().charCodeAt(0);
        const keyCharCode = key[keyIndex % keyLength].toUpperCase().charCodeAt(0);
        const decryptedCharCode = ((encryptedCharCode - 65 - (keyCharCode - 65) + 26) % 26) + 65;
        result.push(String.fromCharCode(decryptedCharCode));
        keyIndex++;
      } else {
        result.push(char);
      }
    }

    return this.isDirect ? result.join('') : result.reverse().join('');
  }
}
module.exports = {
  VigenereCipheringMachine
};
