import React, {FC, useState} from "react";
import {Button, message} from "antd";
import {UploadOutlined} from '@ant-design/icons';
import Upload, {RcFile} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";
import {XLSX_FILE_TYPE} from "../../utils/constants.utils";

interface UploadDataComponentProps {
    onSetMainFile: (file: RcFile | undefined) => void;
}

const UploadDataComponent: FC<UploadDataComponentProps> = ({onSetMainFile}) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleBeforeUpload = (newFile: RcFile) => {
        if (newFile.type !== XLSX_FILE_TYPE) {
            message.error(`${newFile.name} is not a xlsx file`);
        } else {
            setFileList([newFile as unknown as UploadFile])
            onSetMainFile(newFile);
        }
        return newFile.type === XLSX_FILE_TYPE ? false : Upload.LIST_IGNORE;
    };

    const handleRemove = () => {
        onSetMainFile(undefined);
        setFileList([]);
    }

    return (
        <Upload fileList={fileList}
                beforeUpload={handleBeforeUpload}
                onRemove={handleRemove}
                multiple={false}>
            <Button icon={<UploadOutlined/>}>Click to Upload</Button>
        </Upload>
    )
}

export default React.memo(UploadDataComponent);