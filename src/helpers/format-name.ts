export default function (name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c, index) =>
      index === 0 || name[index - 1] === " " ? c.toUpperCase() : c
    );
}
