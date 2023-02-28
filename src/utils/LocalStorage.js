export default function (context, key, value, action) {
  let list = localStorage.getItem(key);

  if (list === null || list === "undefined") {
    localStorage.setItem(key, JSON.stringify([value]));
    return;
  }

  list = JSON.parse(list);
  list.push(value);
  localStorage.setItem(key, JSON.stringify(list));
  context.$emit(action, value);
  context.dialog = false;
}
