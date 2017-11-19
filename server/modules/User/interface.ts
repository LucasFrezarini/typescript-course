export interface IUser {
  readonly id : number,
  name: String,
  email: String,
  password: String
}

export interface IUserDetails extends IUser {};

export function createUser({id, name, email, password} : any) : IUser {
  return {id, name, email, password};
}

export function createUsers(users: IUser[]) : IUser[] {
  return users.map(createUser);
}

export function createUserById({id, name, email, password} : any) : IUserDetails {
  return {id, name, email, password};
}

export function createUserByEmail({id, name, email, password} : any) : IUserDetails {
  return {id, name, email, password};
}
