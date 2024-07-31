import { TokenType } from '../Auth/types/TokenType';

export const getToken = (type: TokenType) => localStorage.getItem(type);
