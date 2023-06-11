const { ID } = require('../../../domain/entities/Entity');
const { ServiceLocator } = require('../../../infrastructure/config/service-locator');

module.exports = async (userId, { userRepository }) => {
  const user = await userRepository.get(userId);
  if (!user) {
    throw new Error('Invalid User');
  }
  return user;
};
