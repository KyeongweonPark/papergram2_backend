import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    newsurl: ({ id }) => prisma.post({ id }).newsurl(),
    user: ({ id }) => prisma.post({ id }).user(),
    comments: ({ id }) => prisma.post({ id }).comments(),
    ups: ({ id }) => prisma.post({ id }).ups(),
    downs: ({ id }) => prisma.post({ id }).downs(),
    postreports: ({ id }) => prisma.post({ id }).postreports(),
    isUp: async (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.up({
        AND: [{ user: { id: user.id } }, { post: { id } }],
      });
    },
    isDown: async (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.down({
        AND: [{ user: { id: user.id } }, { post: { id } }],
      });
    },
    UpCount: (parent) =>
      prisma
        .upsConnection({
          where: { post: { id: parent.id } },
        })
        .aggregate()
        .count(),
    DownCount: (parent) =>
      prisma
        .downsConnection({
          where: { post: { id: parent.id } },
        })
        .aggregate()
        .count(),
    CommentCount: (parent) =>
      prisma
        .commentsConnection({
          where: { post: { id: parent.id } },
        })
        .aggregate()
        .count(),
  },
};
