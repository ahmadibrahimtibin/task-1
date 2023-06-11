const { ServiceLocator } = require("../../../infrastructure/config/service-locator");

module.exports = async (user, { accessTokenManager }) => {
  return accessTokenManager.generate({
    uid: user.id,
    role: user.role,
  });
};
