const { ServiceLocator } = require("../../../infrastructure/config/service-locator");

module.exports = async (email, password, { userRepository, passwordManager }) => {
  const user = await userRepository.getByEmail(email.toLowerCase());

  if (!user || !passwordManager.compare(password, user.password)) {
    throw new Error('Bad credentials');
  }
  
  return user;
};