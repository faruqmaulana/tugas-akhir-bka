const checkTokenExpired = (expiration: string): boolean => {
  const expirationDate = new Date(expiration);
  const currentDate = new Date();
  return expirationDate.getTime() < currentDate.getTime();
};

export default checkTokenExpired;
