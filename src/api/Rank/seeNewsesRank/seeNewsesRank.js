import { prisma } from "../../../../generated/prisma-client";
import moment from "moment";
export default {
  Query: {
    seeNewsesRank: (_, args) => {
      const { term } = args;
      if (term == "day") {
        const day = moment().subtract(1, "d");
        return prisma.newses({
          first: 30,
          where: { createdAt_gt: day },
          orderBy: "postcount_DESC",
        });
      }
      if (term == "week") {
        const week = moment().subtract(1, "w");
        return prisma.newses({
          first: 30,
          where: { createdAt_gt: week },
          orderBy: "postcount_DESC",
        });
      }
      if (term == "month") {
        const week = moment().subtract(4, "w");
        return prisma.newses({
          first: 30,
          where: { createdAt_gt: week },
          orderBy: "postcount_DESC",
        });
      }
      const day = moment().subtract(1, "d");
      return prisma.newses({
        first: 30,
        where: { createdAt_gt: day },
        orderBy: "postcount_DESC",
      });
    },
  },
};
