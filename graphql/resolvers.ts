import { GraphQLError } from 'graphql'
import bcrypt from 'bcrypt'
import controllers from "../controllers"

const resolvers = {
    Query: {
        user: async (_: any, args: any) => {
            try {
                const user = await controllers.User.findById(args)
                return user
            } catch (error) {
                console.log(error)
            }
        } 
    },
    Mutation: {
        createUser: async (_: any, args: any) => {
            try {
                const usernameCheck = await controllers.User.findByUsername({ username: args.username })
                const emailCheck = await controllers.User.findByEmail({ email: args.email })

                if (usernameCheck) throw new GraphQLError('Username already exists')
                else if (emailCheck) throw new GraphQLError('Account already exists with this email')
                else {
                    const encryptedPW = await bcrypt.hash(args.password, 10)
                    const newUserData = { ...args, password: encryptedPW }
                    const user = await controllers.User.create(newUserData)
                    return user
                }

            } catch (error) {
                console.log(error)
                return error
            }
        }
    }
}

export default resolvers