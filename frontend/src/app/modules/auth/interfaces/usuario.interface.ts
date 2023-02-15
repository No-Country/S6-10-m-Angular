export interface user {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface credentials extends Omit<user, 'firstName' | 'lastName'> {}
