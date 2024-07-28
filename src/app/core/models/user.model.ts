export interface User {
  firstName?: string;
  lastName?: string;
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: number;
  };
  phone: string;
  company: {
    name: string;
  };
}

export interface UserSearchModel {
  firstName?: string;
  lastName?: string;
  email?: string;
}
