import { TokenSetting } from "./token.setting.js";
import { TokenChecking } from "./token.checking.js";

export class TokenManager {
    set: TokenSetting;
    check: TokenChecking;

    constructor() {
        this.set = new TokenSetting();
        this.check = new TokenChecking();
    }
}