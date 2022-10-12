import { Button, Form, Input, Popconfirm, Table, Popover } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import classes from './SizeInfo.module.scss';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className={classes.editableCellValueWrap}
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

const SizeInfo = () => {
    const [editMode, setEditMode] = useState(false);

    const [dataSource, setDataSource] = useState([
        {
            key: '0',
            size: 'S',
            chest: '84-86',
            waist: '64-70',
        },
        {
            key: '1',
            size: 'M',
            chest: '88-92',
            waist: '70-76',
        },
    ]);
    const [count, setCount] = useState(2);

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const handleVisibility = () => {
        setEditMode(!editMode);
    }

    const popoverContent = (
        <div>
            <Button onClick={handleVisibility}>Hide/Show</Button>
        </div>
    );

    let defaultColumns;
    {
        editMode ? defaultColumns =
            [
                {
                    title: (
                        <Popover content={popoverContent}>
                            尺码
                        </Popover>
                    ),
                    dataIndex: 'size',
                    width: '30%',
                    editable: true,
                },
                {
                    title: '胸围',
                    dataIndex: 'chest',
                    editable: true,
                },
                {
                    title: '腰围',
                    dataIndex: 'waist',
                    editable: true,
                },
                {
                    title: 'operation',
                    dataIndex: 'operation',
                    render: (_, record) =>
                        dataSource.length >= 1 ? (
                            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                                <a>Delete</a>
                            </Popconfirm>
                        ) : null,
                }
            ] : defaultColumns =
        [
            {
                title: (
                    <Popover content={popoverContent}>
                        尺码
                    </Popover>
                ),
                dataIndex: 'size',
                width: '30%',
                editable: true,
            },
            {
                title: '胸围',
                dataIndex: 'chest',
                editable: true,
            },
            {
                title: '腰围',
                dataIndex: 'waist',
                editable: true,
            },

        ]
    }

    const handleAdd = () => {
        const newData = {
            key: count,
            size: `XS`,
            chest: '78-82',
            waist: `60-64`,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    return (
        <div className={classes.container}>
            <div className={classes.productName}>
                <span>SIZE INFO</span>
            </div>
            {editMode &&
                <Button
                    onClick={handleAdd}
                    type="primary"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Add a row
                </Button>
            }
            <Table
                className={classes.tableContainer}
                components={components}
                rowClassName={() => { classes.editableRow }}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
        </div>
    );
};

export default SizeInfo;