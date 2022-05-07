export class TokenService {
    getTimeLeft() {
        const currentTime = Date.now();
        const tokenExpireTime = localStorage.getItem('tokenExpireTime');
        const timeLeft = tokenExpireTime - currentTime;
        return timeLeft;
    }

    setExpireTimer(timeLeft) {
        setTimeout(() => {
            localStorage.removeItem('token');
        }, timeLeft);
    }

    tokenExists() {
        const token = localStorage.getItem('token');
        return token;
    }
}