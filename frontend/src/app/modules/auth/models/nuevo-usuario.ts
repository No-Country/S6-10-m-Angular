export class NuevoUsuario {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dni:number;
  phone:number
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    dni:number,
    phone:number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.dni = dni;
    this.phone = phone
  }
}
