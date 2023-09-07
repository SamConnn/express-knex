export const userSchema = {
  username: { type: 'string', maxlength: 255, nullable: true },
  email: { type: 'string', maxlength: 255, nullable: true },
  password: { type: 'string', maxlength: 255, nullable: true, optional: true },
  role: { type: 'string', maxlength: 255, nullable: true }
}
