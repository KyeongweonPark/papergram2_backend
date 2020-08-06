import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { userId } = args;
      return prisma.user({ id:userId });
    },
  },
};
