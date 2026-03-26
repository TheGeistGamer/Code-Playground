export async function getLatestGames() {
  try {
    const LATEST_GAMES =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=f9b2cd01da419bd4decd410ca7b39786&language=es-MX";

  const rawData = await fetch(LATEST_GAMES);
  const json = await rawData.json();

  const { results } = json;

  return results.map((item) => {
    const { 
      id, 
      original_language, 
      original_title, 
      overview, 
      backdrop_path, 
      popularity, 
      poster_path, 
      release_date, 
      title 
    } = item;

    // crea la imagen
    const img = `https://image.tmdb.org/t/p/w500${backdrop_path}`;

    return {
      id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
    
      title,
      image: img,
    };
  });

  } catch (error) {
    console.log(error);
  }
}

export async function getGameDetails(slug) {
  const GAME_DETAILS = `https://api.themoviedb.org/3/movie/${slug}?api_key=f9b2cd01da419bd4decd410ca7b39786&language=es-MX`

  const rawData = await fetch(GAME_DETAILS);
  const json = await rawData.json();

  const { backdrop_path, id, original_title, overview, popularity, poster_path, release_date, tagline, title, vote_average } = json;

  // crea la imagen
  const img = `https://image.tmdb.org/t/p/w500${backdrop_path}`;

  return {
    id,
    original_title,
    overview,
    popularity,
    tagline,
    vote_average,
    release_date,
    img,
    title,
    slug,
  };
}

