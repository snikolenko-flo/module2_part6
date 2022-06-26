export class HeaderService {
  setHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-amz-date, x-amz-security-token, x-amz-user-agent, x-api-key',
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  }
}
