import User from "../../../domain/entities/User";
import MongooseUser from "../../orm/mongoose/schemas/User";
import UserRepository from "../../../domain/repositories/UserRepository";
import UserSTO from "../../stos/mongoose/UserSTO";
import { ID } from "../../../domain/entities/Entity";

export default class UserRepositoryMongo implements UserRepository {
  async persist(domainEntity: User): Promise<User | null> {
    // Extract properties from the domain entity
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
    } = domainEntity;

    // Create a new MongooseUser instance
    const mongooseUser = new MongooseUser({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      password,
    });

    // Save the MongooseUser instance to the database
    await mongooseUser.save();

    // Convert the saved MongooseUser instance to a User STO (Simple Transfer Object)
    return UserSTO(mongooseUser);
  }

  async merge(domainEntity: User): Promise<User | null> {
    // Extract properties from the domain entity
    const {
      id,
      firstName,
      lastName,
      email,
      phone,
      password,
    } = domainEntity;

    // Find the MongooseUser instance by ID and update its properties
    const mongooseUser = await MongooseUser.findByIdAndUpdate(
      id,
      {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password,
      },
      {
        new: true,
      }
    );

    // Convert the updated MongooseUser instance to a User STO
    return UserSTO(mongooseUser);
  }

  async remove(entityId: ID): Promise<boolean | null> {
    // Find and delete the MongooseUser instance by ID
    const result = await MongooseUser.findOneAndDelete({ _id: entityId });

    // Return true if the deletion was successful, or null if the user was not found
    return result !== null;
  }

  async get(entityId: ID): Promise<User | null> {
    // Find the MongooseUser instance by ID
    const mongooseUser = await MongooseUser.findById(entityId);

    // Convert the MongooseUser instance to a User STO
    if (!mongooseUser) return null;
    return UserSTO(mongooseUser);
  }

  async getByEmail(email: string): Promise<User | null> {
    // Find the MongooseUser instance by email
    const mongooseUser = await MongooseUser.findOne({ email });

    // Convert the MongooseUser instance to a User STO
    if (!mongooseUser) return null;
    return UserSTO(mongooseUser);
  }

  async find(): Promise<User[]> {
    // Find all MongooseUser instances and sort them by createdAt in descending order
    const mongooseUsers = await MongooseUser.find().sort({ createdAt: -1 });

    // Convert the MongooseUser instances to User STOs and filter out null values
    return mongooseUsers
      .map((mongooseUser) => UserSTO(mongooseUser))
      .filter((user: User | null): user is User => user != null);
  }
}
