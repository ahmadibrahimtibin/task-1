const UserValidator = require('../../../domain/validators/UserValidator');
const GetUser = require('./GetUser');
const { ServiceLocator } = require('../../../infrastructure/config/service-locator');

module.exports = async (userData, serviceLocator) => {
  const { userRepository } = serviceLocator;
  let user = await GetUser(userData.id, serviceLocator);
  if (user == null) throw new Error('Unknown ID');
  user = { ...user, ...userData };
  await UserValidator.tailor('update').validateAsync(user);
  return userRepository.merge(user);
};
