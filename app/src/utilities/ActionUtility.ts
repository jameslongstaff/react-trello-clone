export default class ActionUtility {
  static createAction(type: any, payload: any = undefined, error = false, meta = null) {
    return { type, payload, error, meta };
  }
}