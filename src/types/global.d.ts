declare global {
  namespace NodeJS {
    type Env = import("../env").envType;

    interface ProcessEnv extends Env {}
  }
}
export {};
