const getYoutubeId = (url: any) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return 'error';
  }
};

const getYoutubeEmbedUrl = (id: any) => {
  return `https://www.youtube.com/embed/${id}`;
};

export { getYoutubeEmbedUrl, getYoutubeId };
