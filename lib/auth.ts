export const login = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem("lendsqr_token", "mock_jwt_token_123");
        resolve(true);
      } else {
        reject("Invalid credentials");
      }
    }, 800);
  });
};
