export class TokenService {
    getTimeLeft() {
        const currentTime: number = Date.now();
        const tokenExpireTime: number = Number(localStorage.getItem('tokenExpireTime'));
        return tokenExpireTime - currentTime;
    }

    setExpireTimer(timeLeft: number) {
        setTimeout(() => {
            localStorage.removeItem('token');
        }, timeLeft);
    }

    tokenExists() {
        return localStorage.getItem('token');
    }
}