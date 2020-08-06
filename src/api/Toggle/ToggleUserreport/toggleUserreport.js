import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation: {
        toggleUserreport: async(_, args, {request}) => {
            isAuthenticated(request);
            const { userId } = args;
            const { user } = request;
            try {
                await prisma.updateUser({
                    where:{
                        id: user.id
                    },
                    data: {
                        reporting: {
                            connect: {
                                id: userId
                            }
                        }

                    }

                });
                return true;
            } catch {
                return false;
            }
        }
    }
}