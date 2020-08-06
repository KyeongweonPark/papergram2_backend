import { prisma } from "../../../../generated/prisma-client";
import axios from "axios";
import cheerio from "cheerio";


export default {
  Query: {
    crawlNewsNaver: async (_, args) => {
      const { newsurl } = args;
      return await crawlNewsNaver(newsurl);
    },
  },
};

const crawlNewsNaver = async (newsurl) => {
  let newsList = [];
  let imgList = [];
  let title;
  await axios.get(newsurl).then((dataa) => {
    const $ = cheerio.load(dataa.data);
    title = $("title").text();
    $("div").each(function(i, e) {
      if (
        $(this)
          .find("img")
          .attr("data-src")
      ) {
        imgList.push({
          imgurl: $(this)
            .find("img")
            .attr("data-src"),
        });
      }

    });

    if (imgList[0] === undefined) {
      imgList[0] = { imgurl: "" };
    }
    // console.log(imgList[0].imgurl);
  });

  newsList[0] = {
    id: newsurl,
    title: title,
    newsurl: newsurl,
    imgurl: imgList[0].imgurl,
  };

  return newsList;
};