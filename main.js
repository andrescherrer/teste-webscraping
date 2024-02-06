const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

const getDados = async () => {
  const response = await axios.get(
    "https:www.drogasil.com.br/neosaldina-30-drageas.html"
  );

  const html = response.data;
  const $ = cheerio.load(html);

  console.log(pretty($.root().html()));

  const elementos = [];
  $("h1.Titlestyles__TitleStyles-sc-6rxg4t-0.fDKOTS").each((_idx, el) =>
    elementos.push($(el).text())
  );
  $(
    "td:eq(1) div.ConverterHtmlstyles__ConverterHtmlStyles-sc-186sryh-0.gjcTgl"
  ).each((_idx, el) => elementos.push($(el).text()));
  $("td a:eq(0)").each((_idx, el) => elementos.push($(el).text()));
  $(".small-img").each((_idx, el) => elementos.push($(el).attr("src")));
  $(
    "div.Pricestyles__ProductPriceStyles-sc-118x8ec-0.fzwZWj.price_aux:eq(0)"
  ).each((_idx, el) => elementos.push($(el).texts()));

  return elementos;
};

getDados().then((dados) => console.log(dados));
