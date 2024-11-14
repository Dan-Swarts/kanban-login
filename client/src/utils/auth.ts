import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // Retrieve the token
    const token = this.getToken();
    if (!token) return null;

    // Decode the token and return the payload
    return jwtDecode<JwtPayload>(token);
  }

  loggedIn() {
    // Check if the token exists in localStorage and is not expired
    const token = this.getToken();
    return token !== '' && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      // Check if the token has an expiration time
      if (decoded.exp) {
        // Convert expiration time to milliseconds and compare with current time
        const isExpired = Date.now() >= decoded.exp * 1000;
        return isExpired;
      }
      return false;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return true; // Treat as expired if decoding fails
    }
  }

  getToken(): string {
    // Return the token from localStorage
    const token = localStorage.getItem('token');
    return token ? token : '';
  }

  login(idToken: string) {
    // Set the token to localStorage
    localStorage.setItem('token', idToken);
  
    // Redirect to the home page
    window.location.href = '/';
  }

  logout() {
    // Remove the token from localStorage
    localStorage.removeItem('token');
  
    // Redirect to the login page
    window.location.href = '/login';
  }
}

export default new AuthService();
