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