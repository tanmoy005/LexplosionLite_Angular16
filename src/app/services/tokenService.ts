@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  refreshToken(): Observable<any> {
    // Call your refresh token API endpoint
    return this.http.post<any>('/auth/refresh', {
      refresh_token: localStorage.getItem('refresh_token'),
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // Redirect to login page or handle logout
  }
}
