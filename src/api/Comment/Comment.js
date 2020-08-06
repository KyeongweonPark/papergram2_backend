import { prisma } from "../../../generated/prisma-client";

export default {
  Comment: {
    user: ({ id }) => prisma.comment({ id }).user(),
    post: ({ id }) => prisma.comment({ id }).post(),
    commentreports: ({id}) => prisma.comment({id}).commentreports(),
    CommentReportCount: (parent) =>
    prisma
      .commentreportsConnection({
        where: { comment: { id: parent.id } },
      })
      .aggregate()
      .count(),
  },
};
