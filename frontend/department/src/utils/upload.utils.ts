import axios from "./department-api";
import {UploadRequestOption as RcCustomRequestOptions} from "rc-upload/lib/interface";
import Upload, {RcFile} from "antd/es/upload";
import {XLSX_FILE_TYPE} from "./constants.utils";
import {message} from "antd";
import {UploadFile} from "antd/es/upload/interface";