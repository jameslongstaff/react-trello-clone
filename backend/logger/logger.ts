export class Logger {
  constructor() {}

  public info(logText: string): void {
    console.log(new Date() + "info:::::" + logText);
  }

  public debug(logText: string): void {
    console.log(new Date() + "debug:::::" + logText);
  }

  public error(logText: string): void {
    console.log(new Date() + "error:::::" + logText);
  }
}
