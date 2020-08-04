import { SingleUploadMutationArgs } from '../../types/graph';
import { ehddnrFileBucket } from '../../app';

const storeUpload = ({ stream, filename }: any) =>
  new Promise((resolve, reject) =>
    stream
      .pipe(
        ehddnrFileBucket.file(filename).createWriteStream({
          resumable: false,
          gzip: true,
        }),
      )
      .on('finish', () => resolve())
      .on('error', reject),
  );

export default {
  Mutation: {
    singleUpload: async (_: any, args: SingleUploadMutationArgs) => {
      const { stream, filename } = await args.file;
      await storeUpload({ stream, filename });
      return true;
    },
  },
};
