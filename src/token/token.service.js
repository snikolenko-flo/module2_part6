export class TokenService {
    getTimeLeft() {
        const currentTime = Date.now();
        const tokenExpireTime = Number(localStorage.getItem("tokenExpireTime"));
        return tokenExpireTime - currentTime;
    }
    setExpireTimer(timeLeft) {
        setTimeout(() => {
            localStorage.removeItem("token");
        }, timeLeft);
    }
    tokenExists() {
        return localStorage.getItem("token");
    }
}
