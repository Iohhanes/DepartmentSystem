import React, {Key, PropsWithChildren, ReactElement, useState} from "react";
import {Button, Spin, Table} from "antd";
import {Link} from "react-router-dom";
import {Entity} from "../../model/entity.model";
import {DepartmentType} from "../../model/department-type.model";
import {ColumnsType} from "antd/es/table";
import {LoadingOutlined} from "@ant-design/icons";

interface EntityTableComponentProps<T extends Entity> {
    type: DepartmentType;
    componentClass?: string;
    dataSource?: T[];
    onDisplay: (entity: T) => any;
    columns: ColumnsType<object>;
    onChangePagination: (page: number, count?: number | undefined) => void;
    defaultPageSize: number;
    onDelete: (selectedRowKeys: string[]) => void;
    loading: boolean;
}

const EntityTableComponent = <T extends Entity>({
                                                    type,
                                                    componentClass,
                                                    dataSource,
                                                    onDisplay,
                                                    columns,
                                                    onChangePagination,
                                                    defaultPageSize,
                                                    onDelete,
                                                    loading,
                                                }: PropsWithChildren<EntityTableComponentProps<T>>): ReactElement<any, any> | null => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

    const handleCheck = (selectedRowKeys: Key[]) => {
        setSelectedRowKeys(selectedRowKeys as string[]);
    }

    return (
        <div>
            <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
                {!loading &&
                <div>
                    <div style={{display: "flex"}}>
                        <Button style={{marginRight: 10}} type="primary" onClick={() => onDelete(selectedRowKeys)}>
                            Delete
                        </Button>
                        <Button type="primary">
                            <>
                                {"Add"}
                                <Link to={{pathname: `/${type}-new`}}/>
                            </>
                        </Button>
                    </div>
                    <Table className={componentClass ? componentClass : ""} dataSource={dataSource?.map(entity => {
                        return {
                            key: entity.id,
                            ...onDisplay(entity),
                            moreInfoButton: <Button type="primary">
                                <>
                                    {"More info"}
                                    <Link to={{pathname: `/${type}/${entity.id}`}}/>
                                </>
                            </Button>
                        };

                    })} pagination={{
                        pageSize: defaultPageSize,
                        onChange: onChangePagination
                    }} columns={[
                        ...columns,
                        {
                            dataIndex: "moreInfoButton",
                            key: "moreInfoButton"
                        }
                    ]} size={"middle"} rowSelection={{
                        selectedRowKeys,
                        onChange: handleCheck,
                        selections: [
                            Table.SELECTION_ALL,
                            Table.SELECTION_INVERT,
                            Table.SELECTION_NONE]
                    }}
                    />
                </div>}
            </Spin>
        </div>
    )
}

export default React.memo(EntityTableComponent) as typeof EntityTableComponent;