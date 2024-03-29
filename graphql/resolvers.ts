import { GraphQLError } from 'graphql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import controllers from "../controllers"
import { Context, LoginInputs, RecipeInputs, RegisterInputs } from '../utils/interfaces'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET'

const resolvers = {
    Query: {
        returningUser: async (_: any, __: any, context: Context) => {
            if (!context.authScope) return
            const token = context.authScope.split(' ')[1]
            const decoded: any = token ? jwt.verify(token, JWT_SECRET) : null
            const userId = decoded.userId ? decoded.userId : null
            try {
                const user = await controllers.User.findById({id: userId})
                return user
            } catch (error) {
                console.log(error)
                return error
            }
        },
        login: async (_: any, args: LoginInputs) => {
            try {
                const user = await controllers.User.findByUsername({ username: args.username })
                const passwordMatch = user && await bcrypt.compare(args.password, user.password)
                if (!user || !passwordMatch) throw new GraphQLError('Log in credentials are incorrect')
                else {
                    const token = jwt.sign(
                        { userId: user._id },
                        JWT_SECRET,
                        { algorithm: 'HS256', expiresIn: '1d' }
                    )
                    const userWithToken = { 
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        recipes: user.recipes,
                        token: token 
                    }
                    //temporary
                    // let json = JSON.stringify(userWithToken.recipes)
                    // fs.writeFile('recipes.json', json, 'utf8', () => console.log('done'))
                    return userWithToken
                }
            } catch (error) {
                console.log(error)
                return error
            }
        },
        user: async (_: any, args: {id: string}) => {
            try {
                const user = await controllers.User.findById(args)
                return user
            } catch (error) {
                console.log(error)
                return error
            }
        },
        youtubeKey: () => {
            const youtubeApiKey = process.env.API_KEY
            return youtubeApiKey
        },
        amazonTag: () => {
            const associatesTag = process.env.ASSOCIATES_TAG
            return associatesTag
        }
    },
    Mutation: {
        createUser: async (_: any, args: RegisterInputs) => {
            try {
                const usernameCheck = await controllers.User.findByUsername({ username: args.username })
                const emailCheck = await controllers.User.findByEmail({ email: args.email })

                if (usernameCheck) throw new GraphQLError('Username already exists')
                else if (emailCheck) throw new GraphQLError('Account already exists with this email')
                else {
                    const encryptedPW = await bcrypt.hash(args.password, 10)
                    const newUserData = { ...args, password: encryptedPW }
                    const user = await controllers.User.create(newUserData)

                    if (user) {
                        const token = await jwt.sign( 
                            {userId: user._id},
                            JWT_SECRET,
                            { algorithm: "HS256", expiresIn: "1d" }
                        )
                        const userWithToken = { 
                            _id: user._id,
                            username: user.username,
                            email: user.email,
                            password: user.password,
                            recipes: user.recipes, 
                            token: token 
                        }
                        return userWithToken
                    }
                }

            } catch (error) {
                console.log(error)
                return error
            }
        },
        createRecipe: async (_: any, args: RecipeInputs) => {
            try {
                const updatedUser = await controllers.User.updateForNewRecipe(args)
                return updatedUser
            } catch (error) {
                console.log(error)
                return error
            }
        },
        editRecipe: async (_: any, args: RecipeInputs) => {
            try {
                const updatedUser = await controllers.User.updateForNewRecipe(args)
                return updatedUser
            } catch (error) {
                console.log(error)
                return error
            }
        },
        deleteRecipe: async (_: any, args: RecipeInputs) => {
            try {
                const updatedUser = await controllers.User.updateForNewRecipe(args)
                return updatedUser
            } catch (error) {
                console.log(error)
                return error
            }
        },
        deleteUser: async (_: any, args: {id: string}) => {
            try {
                const deletedUser = await controllers.User.delete(args)
                return deletedUser
            } catch (error) {
                console.log(error)
                return error
            }
        }
    }
}

export default resolvers