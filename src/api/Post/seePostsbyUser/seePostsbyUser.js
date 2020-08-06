import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seePostsbyUser: async (_, args) => {
      const { offset, limit, userId } = args;
      return prisma.posts({
        where: {
          user: { id: userId },
        },
        first: limit,
        skip: offset,
        orderBy: "createdAt_DESC",
      });
    },
  },
};
