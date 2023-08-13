import { Auth } from '../interfaces/auth.interface'
import { User } from '../interfaces/user.interface'
import UserModel from '../models/user'
import { encrypt, verified } from '../utils/bcrypt.handle'
import { generateToken } from '../utils/jwt.handle'
import { createList, locateListWithId } from './item'

const registerNewUser = async ({ email, password, name }: User) => {
  const emailToCheck = email.toLocaleLowerCase()
  const checkIs = await UserModel.findOne({ email: emailToCheck })
  if (checkIs) return 'ALREADY_USER'
  const passHash = await encrypt(password)

  try {
    const registerNewUser = await UserModel.create({
      emailToCheck,
      password: passHash,
      name
    })
  } catch (error) {
    return error
  }

  const data = await loginUser({ email, password })
  if (data !== 'USER_NOT_FOUND' && data !== 'INCORRECT_PASSWORD') {
    const id = data._id
    createList(id)
  }

  return data
}
const loginUser = async ({ email, password }: Auth) => {
  const emailToCheck = email.toLocaleLowerCase()
  const checkIs = await UserModel.findOne({ emailToCheck })

  if (!checkIs) return 'USER_NOT_FOUND'
  const passWordHash = checkIs.password // This is encrypted
  const isCorrect = await verified(password, passWordHash)

  if (!isCorrect) return 'INCORRECT_PASSWORD'
  const token = await generateToken(checkIs.email)
  const list = await locateListWithId(checkIs._id)
  const data = {
    _id: checkIs._id,
    name: checkIs.name,
    email: checkIs.email,
    lists: list,
    token: token
  }

  return data
}

export { registerNewUser, loginUser }
