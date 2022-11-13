/* eslint-disable no-useless-escape */
export const reEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const reName = /^[a-zа-яё \-]+$/i;
export const testName = (str) => reName.test(str);
// /^[a-zа-яё\s\-]+$/gi;