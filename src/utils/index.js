export { default as prefixer } from './prefixer';
export { default as request } from './request';

export const joinUrl = (...paths) => paths.reduce((prev, curr) => {
  const right = curr.trim().replace(/^[\\/]+/, '');
  if (!right) {
    return prev || '/';
  }
  const left = prev.trim().replace(/[\\/]+$/, '');
  return `${left}/${right}`;
}, '');
