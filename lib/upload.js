import packageData from "../package.json";
import dataUriToBuffer from "lib/data-uri-to-buffer";

const UPLOAD_IO_ACCOUNT_ID = "FW25b4F";
const UPLOAD_IO_PUBLIC_API_KEY = "public_FW25b4FAzSgqxpyPhtmMePN3hSFg";

export default async function uploadFile(scribbleDataURI) {
  console.log('upload===',process.env.UPLOAD_API_TOKEN,process.env.UPLOAD_ACCOUNT);
  const uploadManager = new Upload.UploadManager(
    new Upload.Configuration({
      apiKey: process.env.UPLOAD_API_TOKEN,
    })
  );

  const { fileUrl } = await uploadManager.upload({
    accountId: process.env.UPLOAD_ACCOUNT,
    data: dataUriToBuffer(scribbleDataURI),
    mime: "image/png",
    originalFileName: "scribble_input.png",
    path: {
      // See path variables: https://upload.io/docs/path-variables
      folderPath: `/uploads/${packageData.name}/${packageData.version}/{UTC_DATE}`,
      fileName: "{ORIGINAL_FILE_NAME}_{UNIQUE_DIGITS_8}{ORIGINAL_FILE_EXT}",
    },
    metadata: {
      userAgent: navigator.userAgent,
    },
  });

  return fileUrl;
}
