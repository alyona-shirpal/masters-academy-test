export const truncateDescription = (description, wordCount) => {
  const words = description.split(' ');
  if (words.length > wordCount) {
    return words.slice(0, wordCount).join(' ') + '...';
  } else {
    return description;
  }
};
