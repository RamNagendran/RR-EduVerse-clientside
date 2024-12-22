export interface IUserDetails {
  username: string,
  email: string,
  phone: number | null,
  firstname: string,
  lastname: string,
  password: string,
  // addedby: string,
  added_at: string,
  role_id: number | null
}

export interface IUserDetailsSchema {
  username: boolean,
  email: boolean,
  phone: boolean,
  firstname: boolean,
  lastname: boolean,
  password: boolean,
  confPassword: boolean,
  // addedby: string,
  role_id: boolean
}