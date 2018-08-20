// COMMENTS
export function multilineComment(lines) {
  return `\n/**${
    lines
      .map(line => `\n*${line.length > 0 ? ` ${line}` : ''}`)
      .join('')
  }/`;
}

export default multilineComment;
