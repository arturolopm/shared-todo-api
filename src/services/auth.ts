import { Auth } from '../interfaces/auth.interface'
import { User } from '../interfaces/user.interface'
import UserModel from '../models/user'
import { encrypt, verified } from '../utils/bcrypt.handle'
import { generateToken } from '../utils/jwt.handle'

const registerNewUser = async ({ email, password, name }: User) => {
  const checkIs = await UserModel.findOne({ email: email })
  if (checkIs) return 'ALREADY_USER'
  const passHash = await encrypt(password)
  const registerNewUser = await UserModel.create({
    email,
    password: passHash,
    name
  })

  const data = loginUser({ email, password })

  return data
}
const loginUser = async ({ email, password }: Auth) => {
  const checkIs = await UserModel.findOne({ email })

  if (!checkIs) return 'USER_NOT_FOUND'
  const passWordHash = checkIs.password // This is encrypted
  const isCorrect = await verified(password, passWordHash)

  if (!isCorrect) return 'INCORRECT_PASSWORD'
  const token = await generateToken(checkIs.email)
  const data = {
    _id: checkIs._id,
    name: checkIs.name,
    email: checkIs.email,

    token: token
  }

  return data
}

export { registerNewUser, loginUser }
