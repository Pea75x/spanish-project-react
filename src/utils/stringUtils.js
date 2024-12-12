export function titleCase(text) {
  const removeSnake = text.replace(/_/g, ' ')
  
  return removeSnake.charAt(0).toUpperCase() + removeSnake.substr(1).toLowerCase();
}

