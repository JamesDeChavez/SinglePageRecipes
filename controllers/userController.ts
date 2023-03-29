import db from '../models';
import { RecipeInputs, RegisterInputs } from '../utils/interfaces';

export default {
    findByUsername: async (req: {username: string}) => {
        try {
            const request = await db.User.find({username: req.username});
            return request[0];
        } catch (error) {
            console.log(error);
        }
    },
    findByEmail: async (req: {email: string}) => {
        try {
            const request = await db.User.find({email: req.email});
            return request[0];
        } catch (error) {
            console.log(error);
        }
    },
    findById: async (req: {id: string}) => {
        try {
            const request = await db.User.findById({ _id: req.id });
            return request;
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req: RegisterInputs) => {
        try {
            const request = await db.User.create(req);
            return request;
        } catch (error) {
            console.log(error);
        }
    },
    updateForNewRecipe: async (req: RecipeInputs) => {
        try {
            const request = await db.User.findOneAndUpdate({
                _id: req.userId
            }, {
                recipes: req.recipes
            }, {
                new: true
            })
            return request
        } catch (error) {
            console.log(error)
        }
    },
    delete: async (req: {id: string}) => {
        try {
            const request = await db.User.findOneAndDelete({ _id: req.id });
            return request;
        } catch (error) {
            console.log(error);
        }
    }
}

