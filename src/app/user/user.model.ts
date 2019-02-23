export interface Roles {
  reader: boolean;
  author?: boolean;
  admin?: boolean;
}

export class User {
  email: string;
  roles: Roles;

  constructor(authData: any) {
    this.email = authData.email;
    this.roles = { reader: true };
  }
}
