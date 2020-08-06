import { prisma } from "../../../../generated/prisma-client";
import axios from "axios";
import cheerio from "cheerio";

export default {
  Query: {
    crawlNewsDaum: async (_, args) => {
      const { newsurl } = args;
      return await crawlNewsDaum(newsurl);
    },
  },
};

const crawlNewsDaum = async (newsurl) => {
  let newsList = [];
  let imgList = [];
  let title;
  await axios.get(newsurl).then((dataa) => {
    const $ = cheerio.load(dataa.data);
    title = $("title").text();
    $("p.link_figure").each(function(i, e) {
      imgList[i] = {
        imgurl: $(this)
          .find("img.thumb_g_article")
          .attr("src"),
      };
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