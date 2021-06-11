import CryptoJS from 'crypto-js';
import dayjs from 'dayjs';

const key = 'n0th1ng';

function setCookie(cname, cvalue, expired) {
  const d = new Date();
  d.setTime(d.getTime() + 7200 * 1000);
  document.cookie = `${cname}=${CryptoJS.AES.encrypt(
    cvalue,
    key,
  )};expires=${dayjs(expired).locale('id')};path=/`;
}

function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return CryptoJS.AES.decrypt(
        c.substring(name.length, c.length),
        key,
      ).toString(CryptoJS.enc.Utf8);
    }
  }
  return '';
}

function removeCookie(name) {
  const pathBits = window.location.pathname.split('/');
  let pathCurrent = ' path=';

  document.cookie = `${name}=; expires=Thu, 01-Jan-1970 00:00:01 GMT;`;

  for (let i = 0; i < pathBits.length; i += 1) {
    pathCurrent += (pathCurrent.substr(-1) !== '/' ? '/' : '') + pathBits[i];
    document.cookie = `${name}=; expires=Thu, 01-Jan-1970 00:00:01 GMT;${pathCurrent};`;
  }
}

export { getCookie, setCookie, removeCookie };
