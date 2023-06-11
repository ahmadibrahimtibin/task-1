const { ID } = require('../../../domain/entities/Entity');
const { ServiceLocator } = require('../../../infrastructure/config/service-locator');

module.exports = (userId, { userRepository }) => userRepository.remove(userId);