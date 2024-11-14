import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  await fetch('/auth/login',{
    method: 'POST',
    body: JSON.stringify(userInfo), // Convert userInfo to JSON string
  });
}



export { login };
