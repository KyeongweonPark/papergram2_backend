import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    UrlSearchNews: async (_, args) => {
      const { newsurl } = args;
      return prisma.newses({ where: { newsurl: newsurl } });
    },
  },
};
