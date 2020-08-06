import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeNewses: async (_, args, { request }) => {
      const { user } = request;
      const { offset, limit } = args;
      return prisma.newses({
        first: limit,
        skip: offset, 
        orderBy: "createdAt_DESC",
      });
    },
  },
};
