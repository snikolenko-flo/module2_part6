export class TokenService {
    getTimeLeft(): number {
        const currentTime: number = Date.now();
        const tokenExpireTime: number = Number(localStorage.getItem('tokenExpireTime'));
        return tokenExpireTime - currentTime;
    }

    setExpireTimer(timeLeft: number): void {
        setTimeout(() => {
            localStorage.removeItem('token');
        }, timeLeft);
    }

    tokenExists(): string {
        return localStorage.getItem('token');
    }
}