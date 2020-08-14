import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seePostsbyNews: async (_, args) => {
      const { offset, limit, newsId, orderBy } = args;
      return prisma.posts({
        where: {
          newsurl: { id: newsId },
        },
        first: limit,
        skip: offset,
        orderBy,
      });
    },
  },
};
