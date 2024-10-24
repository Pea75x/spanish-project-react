export function titleCase(text) {
  return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
}

export function removeSnakeCase(str) {
  return str.replace(/_/g, ' ');
}
