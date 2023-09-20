export const redisKey = {
  key: 'key'
}

export const userSchema = {
  username: { type: 'string', maxlength: 255, nullable: true },
  email: { type: 'string', maxlength: 255, nullable: true },
  password: { type: 'string', maxlength: 255 },
  role: { type: 'string', maxlength: 255, nullable: true },
  passwordConfirm: { type: 'string', maxlength: 255 },
  passwordChangedAt: { type: 'date', maxlength: 255, nullable: true },
  passwordResetToken: { type: 'string', maxlength: 255, nullable: true },
  passwordResetExpires: { type: 'date', maxlength: 255, nullable: true },
  active: { type: 'boolean', maxlength: 255, default: true },
  isModified: { type: 'boolean', maxlength: 255, default: false },
  created_at: { type: 'date', maxlength: 255, default: () => new Date() },
  updated_at: { type: 'date', maxlength: 255, nullable: true }
}

export const eventSchema = {
  name: { type: 'string', maxlength: 255 },
  description: { type: 'string', maxlength: 255 },
  location: { type: 'string', maxlength: 255 },
  date: { type: 'date', maxlength: 255 },
  image: { type: 'string', maxlength: 255 },
  created_at: { type: 'date', maxlength: 255, default: () => new Date() },
  updated_at: { type: 'date', maxlength: 255, default: () => new Date() },
  time: { type: 'date', maxlength: 255 }
}
