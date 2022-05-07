import { TokenSetting } from "./token.setting.js";
import { TokenChecking } from "./token.checking.js";

export class TokenManager {
    constructor() {
        this.set = new TokenSetting();
        this.check = new TokenChecking();
    }
}
