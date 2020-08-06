import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { newsId, description } = args;
      const post = await prisma.createPost({
        newsurl: {
          connect: {
            id: newsId,
          },
        },
        description,
        user: { connect: { id: user.id } },
      });
      const count = await prisma
        .postsConnection({ where: { newsurl: { id: newsId } } })
        .aggregate()
        .count();
      await prisma.updateNews({
        data: { postcount: count },
        where: { id: newsId },
      });
      return post;
    },
  },
};
