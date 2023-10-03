export function getImagePath(path, image_type, ending) {
  const fullPath = `/${image_type}/${path}${ending}`;
  return fullPath;
}
