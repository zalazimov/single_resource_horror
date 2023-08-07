import { stockposter, stockposterII } from "../assets";

export function posterImage() {
    function getRandomElementFromArray(array) {
        if (array.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
    return getRandomElementFromArray([stockposter, stockposterII]);
}

export function formatDate(args) {
    const date = new Date(args);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
}

export function generateDates() {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 90; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const formattedDate = date.toISOString().slice(0, 10);
        dates.push(formattedDate);
    }
    return dates;
}

export function compareObjects(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        if (key === 'genre_names') continue;
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}


export const selectLan = [
    "en",
    "fr",
    "ja",
    "it",
    "sp",
    "nb",
    "ko",
    "ml",
    "lg",
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
    "lt",
    "cn",
    "cr",
    "lo",
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
    "no"
];


export const genreNames = ["Horror", "Family", "Science Fiction", "Music", "Comedy", "Western", "Crime", "War", "Romance", "Drama",
    "Mystery", "Fantasy", "Adventure", "Documentary", "Action", "Animation", "Thriller", "History", "TV Movie"];

export const validateForm = ["original_title",
    "original_language",
    "overview",
    "runtime",
    "release_date",
    "genre_names"];
