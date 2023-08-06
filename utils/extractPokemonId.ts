const extractPokemonId = (url: string): number => {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length - 2]);
  };

export {
    extractPokemonId
}