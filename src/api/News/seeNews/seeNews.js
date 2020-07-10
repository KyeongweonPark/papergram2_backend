import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeNews: async (_, args) => {
      const { id } = args;
      return await prisma.news({id});
    },
  },
};
