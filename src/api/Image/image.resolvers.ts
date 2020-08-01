import { SingleUploadMutationArgs } from '../../types/graph';
import { createWriteStream } from 'fs';

const storeUpload = ({ stream, filename }: any) =>
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(filename))
      .on('finish', () => resolve())
      .on('error', reject),
  );

export default {
  Mutation: {
    singleUpload: async (_: any, args: SingleUploadMutationArgs) => {
      const { stream, filename } = await args.file;
      const a = await storeUpload({ stream, filename });
      console.log(a);
      return true;
    },
  },
};
