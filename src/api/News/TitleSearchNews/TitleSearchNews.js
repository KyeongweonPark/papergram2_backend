import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    TitleSearchNews: async (_, args) => {
      const { title } = args;
      return prisma.newses({ where: { title_contains: title } });
    },
  },
};
