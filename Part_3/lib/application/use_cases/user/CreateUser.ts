const User = require('../../../domain/entities/User').default;
const UserValidator = require('../../../domain/validators/UserValidator').default;
const { ServiceLocator } = require('../../../infrastructure/config/service-locator');

module.exports = async (userData, { userRepository, passwordManager }) => {
  await UserValidator.tailor('create').validateAsync(userData);
  const user = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    password: passwordManager.hash(userData.password, 12),
  });
  return userRepository.persist(user);
};
