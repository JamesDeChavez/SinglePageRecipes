import db from '../models';

export default {
    findByUsername: async (req: any) => {
        try {
            const request = await db.User.find({username: req.username});
            return request[0];
        } catch (error) {
            console.log(error);
        }
    },
    findByEmail: async (req: any) => {
        try {
            const request = await db.User.find({email: req.email});
            return request[0];
        } catch (error) {
            console.log(error);
        }
    },
    findById: async (req: any) => {
        try {
            const request = await db.User.findById({ _id: req.id });
            return request;
        } catch (error) {
            console.log(error);
        }
    },
    create: async (req: any) => {
        try {
            const request = await db.User.create(req);
            return request;
        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req: any) => {
        try {
            const request = await db.User.findOneAndDelete({ _id: req.id });
            return request;
        } catch (error) {
            console.log(error);
        }
    }
}

