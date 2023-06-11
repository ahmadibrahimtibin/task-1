const Entity = require('./Entity');

class User extends Entity {
  constructor({
    id,
    firstName,
    lastName,
    email,
    phone,
    password,
    accessToken,
  }) {
    super({ id });
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.accessToken = accessToken;
  }
}

module.exports = User;
