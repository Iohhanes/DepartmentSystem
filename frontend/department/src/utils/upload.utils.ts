import axios from "./department-api";
import {UploadRequestOption as RcCustomRequestOptions} from "rc-upload/lib/interface";

export const uploadData = async ({file, onSuccess}: RcCustomRequestOptions) => {
    let formData = new FormData();
    formData.append("file", file);
    axios.post("/specialities/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
          if(onSuccess){
           onSuccess(null, response.request);
          }
        }
    );
}