export interface Payload {
  [key: string]: any;
}

export interface Action {
  type: any;
  payload: Payload;
  meta: any;
  error: any;
}