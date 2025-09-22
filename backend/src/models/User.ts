import mongoose, { Document, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    name: string
    email: string
    password: string
    comparePassword(candidate: string): Promise<boolean>
}

const UserSchema = new mongoose.Schema<IUser>(
    {
        name:    { type: String, required: true, trim: true },
        email:   { type: String, required: true, unique: true, lowercase: true },
        password:{ type: String, required: true, select: false }
    },
    { timestamps: true }
)

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

UserSchema.methods.comparePassword = function (candidate: string): Promise<boolean> {
    // `this.password` is always defined here because we explicitly selected it
    return bcrypt.compare(candidate, this.password as string)
}

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema)
export default User
