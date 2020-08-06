import { prisma } from "../../../generated/prisma-client";

export default {
  News: {
    posts: ({ id }) => prisma.news({ id }).posts({orderBy: "priority_DESC"}),
    PostCount: (parent) =>
      prisma
        .postsConnection({ where: { newsurl: { id: parent.id } } })
        .aggregate()
        .count(),
  },
};
