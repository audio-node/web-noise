export const match = (url: string, pattern: string): boolean => {
  // Escape special characters in the pattern, except for '*'
  const escapedPattern = pattern.replace(/([.+?^=!:${}()|\[\]\/\\])/g, '\\$1');

  // Replace '*' with '.*' to match any sequence of characters
  const regexPattern = escapedPattern.replace(/\*/g, '.*');

  // Create a regular expression from the pattern, ensuring it matches the entire URL
  const regex = new RegExp(`^${regexPattern}$`);

  // Test if the URL matches the pattern
  return regex.test(url);
};
