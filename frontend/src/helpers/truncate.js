const truncate = (string, length) => {
  let tmp_string = '';

  if (string !== null && string !== undefined) {
    tmp_string = string.substr(0, length);
    let last = tmp_string[length - 1];

    if (last !== undefined && last !== ' ') {
      tmp_string = tmp_string.substr(0, tmp_string.lastIndexOf(' ')) + '...';
    }
  }

  if (tmp_string === '...') {
    return `${string.slice(0, length - 3)}...`;
  }

  return tmp_string;
};

export default truncate;
