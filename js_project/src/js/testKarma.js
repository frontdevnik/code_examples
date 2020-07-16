export default function (title) {
  return /^[A-Z]\w{4,20}$/g.test(title);
}