/* eslint-disable no-useless-escape */
export const reEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const reName = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/i;
export const testName = (str) => reName.test(str);