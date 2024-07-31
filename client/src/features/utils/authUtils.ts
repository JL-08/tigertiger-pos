import { TokenType } from '../Auth/types/TokenType';

export const getToken = (type: TokenType) => {
  const token = localStorage.getItem(type);
  console.log('token', token);
  return token;
};
