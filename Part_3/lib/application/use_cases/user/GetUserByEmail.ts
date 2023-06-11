const { ServiceLocator } = require('../../../infrastructure/config/service-locator');

module.exports = async (email, { userRepository }) => {
  const user = await userRepository.getByEmail(email);
  if (!user) {
    return null;
  }
  return user;
};
