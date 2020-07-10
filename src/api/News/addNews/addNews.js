import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addNews: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { newsurl, title, detail } = args;
      const news = await prisma.createNews({
        newsurl,
        title,
        detail,
        user: { connect: { id: user.id } },
      });
      return news;
    },
  },
};
