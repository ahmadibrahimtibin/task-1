const { ServiceLocator } = require("../../../infrastructure/config/service-locator");

module.exports = (accessToken, { accessTokenManager }) => {
  const decoded = accessTokenManager.decode(accessToken);
  if (!decoded) {
    throw new Error('Invalid access token');
  }
  return {
    uid: decoded.uid,
    role: decoded.role,
  };
};
