export function titleCase(text) {
  const CapitalText = text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();

  return CapitalText.replace(/_/g, ' ');
}

export function removeSnakeCase(str) {
  return str.replace(/_/g, ' ');
}
