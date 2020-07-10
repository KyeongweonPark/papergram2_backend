import { prisma } from "../../../generated/prisma-client";

export default {
  News: {
    posts: ({ id }) => prisma.news({ id }).posts(),
  },
};
