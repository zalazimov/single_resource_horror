import { stockposter, stockposterII } from "../assets";

export function posterImage(args, flag) {
    function getRandomElementFromArray(array) {
        if (array.length === 0) {
          return null
        }
      
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
      }
      
    if (args.poster_path) return `https://image.tmdb.org/t/p/w1280${args.poster_path}`
    else if (!args.poster_path) return getRandomElementFromArray([stockposter, stockposterII])
}

export function formatDate(args) {
  const date = new Date(args);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate

}