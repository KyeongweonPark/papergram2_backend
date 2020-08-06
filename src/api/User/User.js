import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    posts: ({ id }) => prisma.user({ id }).posts(),
    reporters: ({ id }) => prisma.user({ id }).reporters(),
    reporting: ({ id }) => prisma.user({ id }).reporting(),
    username: ({ id }) => prisma.user({ id }).username(),
    ups: ({ id }) => prisma.user({ id }).ups(),
    downs: ({ id }) => prisma.user({ id }).downs(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    postreports: ({ id }) => prisma.user({ id }).postreports(),
    commentreports: ({ id }) => prisma.user({ id }).commentreports(),
    postsCount: ({ id }) =>
      prisma
        .postsConnection({ where: { user: { id } } })
        .aggregate()
        .count(),
    commentsCount: ({ id }) =>
      prisma
        .commentsConnection({ where: { user: { id } } })
        .aggregate()
        .count(),
    reportingCount: ({ id }) =>
      prisma
        .usersConnection({ where: { reporting_some: { id } } })
        .aggregate()
        .count(),
    reportersCount: ({ id }) =>
      prisma
        .usersConnection({ where: { reporters_some: { id } } })
        .aggregate()
        .count(),
    fullName: (parent) => {
      return `${parent.lastName} ${parent.firstName}`;
    },
    isReporting: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        const exists = await prisma.$exists.user({
          AND: [
            {
              id: user.id,
            },
            {
              reporting_some: {
                id: parentId,
              },
            },
          ],
        });
        return exists;
      } catch (error) {
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
};
