export interface APIResponse {
  result: any;
  error: { message: string; status: number };
  success: boolean;
  messages: string[];
}

export const cookieNames = {
  SESSION: 'x-session',
  CART: 'a_c',
};

export type Category = {
  _id: string;
  name: string;
  hasChildren: boolean;
};
