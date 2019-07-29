import { Storage } from "aws-amplify";
import v4 from "uuid";

export async function s3Upload(files, accessToken) {
  const customPrefix = {
    public: `images/${accessToken}`,
  };
  const keys = [];
  for (const file of files) {
    const filename = `${v4()}-${file.name}`;
    const stored = await Storage.put(filename, file, {
      customPrefix: customPrefix
    });
    keys.push(stored.key);
  }
  return keys;
}
