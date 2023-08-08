import { Schema, Types, model, Model } from 'mongoose'
import { Invitation } from '../interfaces/invitation.interface'

const InvitationSchema = new Schema<Invitation>(
  {
    sender: { type: String, required: true },
    senderId: { type: String, required: true },
    receiver: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
)

const InvitationModel = model('invitations', InvitationSchema)
export default InvitationModel
