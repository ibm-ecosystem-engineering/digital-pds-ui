import {FileUploadApi} from "./file-upload.api.ts";
import {FileUploadRest} from "./file-upload.rest.ts";

export * from './file-upload.api'

let _instance: FileUploadApi
export const fileUploadApi = (): FileUploadApi => {
    if (_instance) {
        return _instance
    }

    return _instance = new FileUploadRest()
}
