import React, {Key, PropsWithChildren, ReactElement, useState} from "react";
import {Button, Spin, Table} from "antd";
import {Link} from "react-router-dom";
import {Entity} from "../../model/entity.model";
import {DepartmentType} from "../../model/department-type.model";
import {ColumnsType} from "antd/es/table";
import {LoadingOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

interface EntityTableComponentProps<T extends Entity> {
    type: DepartmentType;
    componentClass?: string;
    dataSource?: T[];
    onDisplay: (entity: T) => any;
    columns: ColumnsType<object>;
    onChangePagination: (page: number, count?: number | undefined) => void;
    currentPage: number;
    totalCount: number;
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
                                                    currentPage,
                                                    totalCount,
                                                    defaultPageSize,
                                                    onDelete,
                                                    loading,
                                                }: PropsWithChildren<EntityTableComponentProps<T>>): ReactElement<any, any> | null => {

    const {t} = useTranslation();

    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

    const handleCheck = (selectedRowKeys: Key[]) => {
        setSelectedRowKeys(selectedRowKeys as string[]);
    }

    return (
        <div>
            <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} spinning={loading}>
                {!loading &&
                <div>
                    <div className="entity-table__buttons">
                        <Button className="entity-table__buttons__delete" type="primary"
                                onClick={() => onDelete(selectedRowKeys)}>
                            {t("entityTable.btn.delete")}
                        </Button>
                        <Button type="primary">
                            <>
                                {t("entityTable.btn.add")}
                                <Link to={{pathname: `/${type}-new`}}/>
                            </>
                        </Button>
                    </div>
                    <Table
                        className={componentClass ? componentClass : ""}
                        dataSource={dataSource?.map(entity => {
                            return {
                                key: entity.id,
                                ...onDisplay(entity),
                                moreInfoButton: <Button type="primary">
                                    <>
                                        {t("entityTable.btn.moreInfo")}
                                        <Link to={{pathname: `/${type}/${entity.id}`}}/>
                                    </>
                                </Button>
                            };

                        })}
                        pagination={{
                            pageSize: defaultPageSize,
                            onChange: onChangePagination,
                            total: totalCount,
                            current: currentPage,
                        }}
                        columns={[
                            ...columns,
                            {
                                dataIndex: "moreInfoButton",
                                key: "moreInfoButton"
                            }
                        ]}
                        size={"middle"}
                        rowSelection={{
                            selectedRowKeys,
                            onChange: handleCheck
                        }}
                    />
                </div>}
            </Spin>
        </div>
    )
}

export default React.memo(EntityTableComponent) as typeof EntityTableComponent;