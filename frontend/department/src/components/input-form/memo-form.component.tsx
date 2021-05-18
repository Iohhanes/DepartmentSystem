import React, {FC} from "react";
import {Form} from "antd";
import {Rule} from "rc-field-form/lib/interface";
import TextArea from "antd/es/input/TextArea";

interface MemoFormComponentProps {
    formClassName?: string;
    inputClassName?: string;
    name: string;
    label?: string;
    rules?: Rule[];
    maxLength: number;
}

const MemoFormComponent: FC<MemoFormComponentProps> = ({
                                                           formClassName,
                                                           inputClassName,
                                                           name,
                                                           label,
                                                           rules,
                                                           maxLength
                                                       }) => {
    return (
        <Form.Item
            className={formClassName ? formClassName : ""}
            label={label}
            labelCol={{span: 24}}
            name={name}
            rules={rules}
        >
            <TextArea
                className={inputClassName ? inputClassName : ""}
                showCount
                maxLength={maxLength}/>
        </Form.Item>
    )
}

export default React.memo(MemoFormComponent)