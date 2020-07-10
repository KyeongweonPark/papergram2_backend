import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seePost: async (_, args) => {
      const { id } = args;
      return await prisma.post({id});
    },
  },
};
