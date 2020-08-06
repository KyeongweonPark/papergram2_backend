import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleUp: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id,
            },
          },
          {
            post: {
              id: postId,
            },
          },
        ],
      };
      try {
        const existing = await prisma.$exists.up(filterOptions);
        if (existing) {
          await prisma.deleteManyUps(filterOptions);
        } else {
          await prisma.createUp({
            user: {
              connect: {
                id: user.id,
              },
            },
            post: {
              connect: {
                id: postId,
              },
            },
          });
        }
        const upcount = await prisma
          .upsConnection({
            where: { post: { id: postId } },
          })
          .aggregate()
          .count();
        const downcount = await prisma
        .downsConnection({
          where: { post: { id: postId } },
        })
        .aggregate()
        .count();
        const reportcount = await prisma
        .postreportsConnection({
          where: { post: { id: postId } },
        })
        .aggregate()
        .count();

        const count = upcount-downcount-100*reportcount;
        await prisma.updatePost({
          data: { priority: count },
          where: { id: postId },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
