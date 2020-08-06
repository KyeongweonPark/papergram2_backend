import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addNews: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { newsurl, title, detail, imgurl } = args;
      const news = await prisma.createNews({
        newsurl,
        title,
        detail,
        imgurl,
      });
      return news;
    },
  },
};
