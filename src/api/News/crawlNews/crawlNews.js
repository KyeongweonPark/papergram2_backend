import { prisma } from "../../../../generated/prisma-client";
import { crawlNews } from "../../../utils";

export default {
  Query: {
    crawlNews: async (_, args) => {
      const { newsurl } = args;
      return await crawlNews(newsurl);
    },
  },
};
