import { stockposter, stockposterII } from "../assets";

export function posterImage(args, flag) {
  function getRandomElementFromArray(array) {
    if (array.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  if (args.poster_path)
    return `https://image.tmdb.org/t/p/w1280${args.poster_path}`;
  else if (!args.poster_path)
    return getRandomElementFromArray([stockposter, stockposterII]);
}

export function formatDate(args) {
  const date = new Date(args);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

export function selectLan() {
  return [
    "en",
    "nb",
    "ko",
    "ml",
    "lg",
    "it",
    "ss",
    "ps",
    "da",
    "so",
    "as",
    "sh",
    "kk",
    "fo",
    "gl",
    "bs",
    "mk",
    "fr",
    "pa",
    "sk",
    "si",
    "en",
    "hi",
    "af",
    "bg",
    "mg",
    "ru",
    "he",
    "fa",
    "gu",
    "hr",
    "xx",
    "cs",
    "ja",
    "lt",
    "cn",
    "cr",
    "lo",
    "sp",
    "su",
    "az",
    "eu",
    "ro",
    "te",
    "ta",
    "mn",
    "tw",
    "ms",
    "et",
    "ky",
    "gv",
    "ar",
    "ca",
    "th",
    "pt",
    "km",
    "ur",
    "hu",
    "pl",
    "zh",
    "my",
    "sq",
    "lv",
    "es",
    "cy",
    "ga",
    "eo",
    "sr",
    "dv",
    "tr",
    "xh",
    "uk",
    "fi",
    "yi",
    "mr",
    "vi",
    "bo",
    "is",
    "ig",
    "sv",
    "am",
    "to",
    "la",
    "mt",
    "ne",
    "kn",
    "mh",
    "bn",
    "de",
    "nl",
    "jv",
    "sn",
    "id",
    "tl",
    "sl",
    "kl",
    "no",
  ];
}
