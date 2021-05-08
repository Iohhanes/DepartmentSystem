import React, {FC, useState} from "react";
import {Button, message} from "antd";
import {UploadOutlined} from '@ant-design/icons';
import Upload, {RcFile} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";

interface UploadDataComponentProps {
    onUpload: (file: RcFile) => void;
}

const XLSX_FILE_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

const UploadDataComponent: FC<UploadDataComponentProps> = ({onUpload}) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [mainFile, setMainFile] = useState<RcFile>();

    const handleBeforeUpload = (newFile: RcFile) => {
        if (newFile.type !== XLSX_FILE_TYPE) {
            message.error(`${newFile.name} is not a xlsx file`);
        } else {
            setFileList([newFile as unknown as UploadFile])
            setMainFile(newFile);
        }
        return newFile.type === XLSX_FILE_TYPE ? false : Upload.LIST_IGNORE;
    };

    const handleSubmit = () => {
        if (mainFile) {
            onUpload(mainFile)
        }
    }

    const handleRemove = () => {
        setMainFile(undefined);
        setFileList([]);
    }

    return (
        <div style={{flexDirection: "column"}}>
            <Upload fileList={fileList}
                    beforeUpload={handleBeforeUpload}
                    onRemove={handleRemove}
                    multiple={false}>
                <Button icon={<UploadOutlined/>}>Click to Upload</Button>
            </Upload>
            <Button type="primary" onClick={handleSubmit}
                    style={{marginBottom: "20px", marginTop: "20px"}}>
                Submit
            </Button>
        </div>
    )
}

export default React.memo(UploadDataComponent);