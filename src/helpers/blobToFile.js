export default function blobToFile(blob, fileName){
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
}