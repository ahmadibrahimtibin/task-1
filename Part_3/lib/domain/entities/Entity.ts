// Define the ID type
exports.ID = String || Number;

// Define the Entity class
class Entity {
  constructor({ id }) {
    this.id = id;
  }
}

// Export the Entity class as the default export
module.exports = Entity;