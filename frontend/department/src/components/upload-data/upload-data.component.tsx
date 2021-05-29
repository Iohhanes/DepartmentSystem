import React, {FC, useState} from "react";
import {Button, message} from "antd";
import {UploadOutlined} from '@ant-design/icons';
import Upload, {RcFile} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";
import {useTranslation} from "react-i18next";

interface UploadDataComponentProps {
    onSetMainFile: (file: RcFile | undefined) => void;
    fileTypes: string[];
    fileExtensions: string[];
}

const UploadDataComponent: FC<UploadDataComponentProps> = ({onSetMainFile, fileTypes, fileExtensions}) => {

    const {t} = useTranslation();

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleBeforeUpload = (newFile: RcFile) => {
        const validFileType = fileTypes.some(fileType => newFile.type === fileType);
        if (!validFileType) {
            message.error(`${newFile.name} ${t("uploadComponent.validations.type")} ${fileExtensions.join(", ")}`);
        } else if (newFile.size / 1024 / 1024 > 5) {
            message.error(`${newFile.name} ${t("uploadComponent.validations.size")}`);
        } else {
            setFileList([newFile as unknown as UploadFile])
            onSetMainFile(newFile);
        }
        return validFileType ? false : Upload.LIST_IGNORE;
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
                {t("uploadComponent.title")}
            </Button>
        </Upload>
    )
}

export default React.memo(UploadDataComponent);