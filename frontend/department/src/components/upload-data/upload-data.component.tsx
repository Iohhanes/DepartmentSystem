import React, {FC, useState} from "react";
import {Button, message} from "antd";
import {UploadOutlined} from '@ant-design/icons';
import Upload, {RcFile} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";

interface UploadDataComponentProps {
    onSetMainFile: (file: RcFile | undefined) => void;
    fileType: string;
    fileExtension: string;
}

const UploadDataComponent: FC<UploadDataComponentProps> = ({onSetMainFile, fileType, fileExtension}) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleBeforeUpload = (newFile: RcFile) => {
        if (newFile.type !== fileType) {
            message.error(`${newFile.name} is not a ${fileExtension} file`);
        } else {
            setFileList([newFile as unknown as UploadFile])
            onSetMainFile(newFile);
        }
        return newFile.type === fileType ? false : Upload.LIST_IGNORE;
    };

    const handleRemove = () => {
        onSetMainFile(undefined);
        setFileList([]);
    }

    return (
        <Upload
            fileList={fileList}
            beforeUpload={handleBeforeUpload}
            onRemove={handleRemove}
            multiple={false}>
            <Button
                icon={<UploadOutlined/>}>
                Click to Upload
            </Button>
        </Upload>
    )
}

export default React.memo(UploadDataComponent);