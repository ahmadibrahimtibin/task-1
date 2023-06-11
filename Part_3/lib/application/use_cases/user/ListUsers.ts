const { ServiceLocator } = require('../../../infrastructure/config/service-locator');

module.exports = async ({ userRepository }) => userRepository.find();