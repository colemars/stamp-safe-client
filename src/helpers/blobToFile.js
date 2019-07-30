export default function blobToFile(blob, fileName) {
  const modifiedBlob = blob;
  modifiedBlob.lastModifiedDate = new Date();
  modifiedBlob.name = fileName;
  return modifiedBlob;
}
