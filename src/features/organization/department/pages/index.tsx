import React, { useState } from 'react';
import {
    Table,
    Button,
    Input,
    Tag,
    Space,
    Card,
    Modal,
    Form,
    Select,
    App
} from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    ClusterOutlined,
    UserOutlined,
    TeamOutlined
} from '@ant-design/icons';

// Mock data ban đầu cho AccessHub
const initialData = [
    { key: '1', id: 'DEP001', name: 'Phòng Kỹ thuật (Engineering)', code: 'ENG', manager: 'Nguyễn Văn A', members: 24, status: 'Active' },
    { key: '2', id: 'DEP002', name: 'Phòng Nhân sự (HR)', code: 'HR', manager: 'Trần Thị B', members: 8, status: 'Active' },
    { key: '3', id: 'DEP003', name: 'Phòng Kinh doanh (Sales)', code: 'SAL', manager: 'Lê Hoàng C', members: 15, status: 'Active' },
    { key: '4', id: 'DEP004', name: 'Phòng Marketing', code: 'MKT', manager: 'Phạm Minh D', members: 12, status: 'Inactive' },
    { key: '5', id: 'DEP001', name: 'Phòng Kỹ thuật (Engineering)', code: 'ENG', manager: 'Nguyễn Văn A', members: 24, status: 'Active' },
    { key: '6', id: 'DEP002', name: 'Phòng Nhân sự (HR)', code: 'HR', manager: 'Trần Thị B', members: 8, status: 'Active' },
    { key: '7', id: 'DEP003', name: 'Phòng Kinh doanh (Sales)', code: 'SAL', manager: 'Lê Hoàng C', members: 15, status: 'Active' },
    { key: '8', id: 'DEP004', name: 'Phòng Marketing', code: 'MKT', manager: 'Phạm Minh D', members: 12, status: 'Inactive' },
    { key: '9', id: 'DEP001', name: 'Phòng Kỹ thuật (Engineering)', code: 'ENG', manager: 'Nguyễn Văn A', members: 24, status: 'Active' },
    { key: '10', id: 'DEP002', name: 'Phòng Nhân sự (HR)', code: 'HR', manager: 'Trần Thị B', members: 8, status: 'Active' },
    { key: '11', id: 'DEP003', name: 'Phòng Kinh doanh (Sales)', code: 'SAL', manager: 'Lê Hoàng C', members: 15, status: 'Active' },
    { key: '12', id: 'DEP004', name: 'Phòng Marketing', code: 'MKT', manager: 'Phạm Minh D', members: 12, status: 'Inactive' },
    { key: '13', id: 'DEP001', name: 'Phòng Kỹ thuật (Engineering)', code: 'ENG', manager: 'Nguyễn Văn A', members: 24, status: 'Active' },
    { key: '14', id: 'DEP002', name: 'Phòng Nhân sự (HR)', code: 'HR', manager: 'Trần Thị B', members: 8, status: 'Active' },
    { key: '15', id: 'DEP003', name: 'Phòng Kinh doanh (Sales)', code: 'SAL', manager: 'Lê Hoàng C', members: 15, status: 'Active' },
    { key: '16', id: 'DEP004', name: 'Phòng Marketing', code: 'MKT', manager: 'Phạm Minh D', members: 12, status: 'Inactive' },
    { key: '17', id: 'DEP001', name: 'Phòng Kỹ thuật (Engineering)', code: 'ENG', manager: 'Nguyễn Văn A', members: 24, status: 'Active' },
    { key: '18', id: 'DEP002', name: 'Phòng Nhân sự (HR)', code: 'HR', manager: 'Trần Thị B', members: 8, status: 'Active' },
    { key: '19', id: 'DEP003', name: 'Phòng Kinh doanh (Sales)', code: 'SAL', manager: 'Lê Hoàng C', members: 15, status: 'Active' },
    { key: '20', id: 'DEP004', name: 'Phòng Marketing', code: 'MKT', manager: 'Phạm Minh D', members: 12, status: 'Inactive' },
    { key: '21', id: 'DEP001', name: 'Phòng Kỹ thuật (Engineering)', code: 'ENG', manager: 'Nguyễn Văn A', members: 24, status: 'Active' },
    { key: '22', id: 'DEP002', name: 'Phòng Nhân sự (HR)', code: 'HR', manager: 'Trần Thị B', members: 8, status: 'Active' },
    { key: '23', id: 'DEP003', name: 'Phòng Kinh doanh (Sales)', code: 'SAL', manager: 'Lê Hoàng C', members: 15, status: 'Active' },
    { key: '24', id: 'DEP004', name: 'Phòng Marketing', code: 'MKT', manager: 'Phạm Minh D', members: 12, status: 'Inactive' },
];

const DepartmentPage = () => {
    const { message, modal } = App.useApp(); // Khởi tạo hook thông báo của AntD v6
    const [data, setData] = useState(initialData);
    const [searchText, setSearchText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    // Xử lý Xóa phòng ban
    const handleDelete = (record: any) => {
        modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa phòng ban "${record.name}" không?`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                setData(data.filter((item) => item.key !== record.key));
                message.success('Xóa phòng ban thành công!');
            },
        });
    };

    // Mở Modal (Thêm mới hoặc Sửa)
    const openModal = (record = null) => {
        setEditingRecord(record);
        if (record) {
            form.setFieldsValue(record);
        } else {
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    // Lưu Form (Submit)
    const handleFormSubmit = () => {
        form.validateFields().then((values) => {
            if (editingRecord) {
                // Cập nhật
                setData(data.map((item) => (item.key === editingRecord.key ? { ...item, ...values } : item)));
                message.success('Cập nhật phòng ban thành công!');
            } else {
                // Thêm mới
                const newDept = {
                    key: Date.now().toString(),
                    id: `DEP00${data.length + 1}`,
                    members: 0,
                    ...values,
                };
                setData([...data, newDept]);
                message.success('Thêm phòng ban mới thành công!');
            }
            setIsModalOpen(false);
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    // Định nghĩa các cột cho AntD Table
    const columns = [
        {
            title: 'Mã & Tên phòng ban',
            dataIndex: 'name',
            key: 'name',
            filteredValue: [searchText],
            onFilter: (value, record) =>
                record.name.toLowerCase().includes(value.toLowerCase()) ||
                record.code.toLowerCase().includes(value.toLowerCase()) ||
                record.manager.toLowerCase().includes(value.toLowerCase()),
            render: (text, record) => (
                <div>
                    <div className="font-semibold text-gray-900">{text}</div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                        {record.id} | Mã: <span className="font-semibold">{record.code}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Trưởng phòng',
            dataIndex: 'manager',
            key: 'manager',
            render: (text) => (
                <span className="inline-flex items-center gap-1.5 font-medium text-gray-700">
                    <UserOutlined className="text-gray-400 text-xs" /> {text}
                </span>
            ),
        },
        {
            title: 'Nhân sự',
            dataIndex: 'members',
            key: 'members',
            sorter: (a, b) => a.members - b.members,
            render: (members) => (
                <span className="inline-flex items-center gap-1.5 text-gray-600">
                    <TeamOutlined className="text-gray-400" /> {members} thành viên
                </span>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Hoạt động', value: 'Active' },
                { text: 'Tạm dừng', value: 'Inactive' },
            ],
            onFilter: (value: any, record: any) => record.status === value,
            render: (status: any) => (
                <Tag color={status === 'Active' ? 'emerald' : 'amber'} className="m-0 font-medium px-2.5 py-0.5">
                    {status === 'Active' ? 'Hoạt động' : 'Tạm dừng'}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'right',
            render: (_: any, record: any) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => openModal(record)}
                        className="text-gray-500 hover:!text-indigo-600 hover:!bg-indigo-50"
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                        className="hover:!bg-rose-50"
                    />
                </Space>
            ),
        },
    ];

    return (
    <div className="p-8 bg-[#f8fafc] min-h-screen font-sans antialiased">
      {/* Khối Header nổi bật hẳn lên */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-md border border-slate-200/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200/80 hidden sm:block">
            <ClusterOutlined className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 m-0 tracking-tight">
              Quản lý Phòng ban
            </h1>
            <p className="text-sm font-medium text-slate-400 mt-1">Hệ thống phân cấp tổ chức & cấu trúc nhân sự AccessHub</p>
          </div>
        </div>
        
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          onClick={() => openModal()}
          className="bg-indigo-600 hover:bg-indigo-700 font-bold shadow-md shadow-indigo-100 hover:shadow-lg hover:-translate-y-0.5 border-none h-12 px-6 rounded-xl transition-all duration-200"
        >
          Thêm phòng ban mới
        </Button>
      </div>

      {/* Khối Bộ lọc Tìm kiếm độc lập */}
      <Card 
        className="mb-6 shadow-md border-slate-200/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300" 
        bodyStyle={{ padding: '20px' }}
      >
        <div className="max-w-xl">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tìm kiếm nhanh</label>
          <Input
            placeholder="Nhập tên phòng, mã định danh hoặc tên trưởng phòng..."
            prefix={<SearchOutlined className="text-slate-400 text-lg mr-1" />}
            allowClear
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="hover:border-indigo-500 focus:border-indigo-500 h-12 rounded-xl shadow-xs border-slate-200 transition-all"
          />
        </div>
      </Card>

      {/* Khối Bảng Danh Sách sang trọng */}
      <Card 
        className="shadow-xl border-slate-200/60 rounded-2xl overflow-hidden" 
        bodyStyle={{ padding: 0 }}
      >
        <Table 
          columns={columns} 
          dataSource={data} 
          rowClassName="hover:bg-slate-50/80 transition-all cursor-pointer"
          pagination={{
            pageSize: 5,
            showTotal: (total, range) => (
              <span className="text-sm font-semibold text-slate-500">
                Hiển thị <span className="text-indigo-600">{range[0]}-{range[1]}</span> trên {total} phòng ban
              </span>
            ),
            className: "px-6 py-5 m-0 border-t border-slate-100 bg-slate-50/50 font-medium"
          }}
          className="custom-layered-table"
        />
      </Card>

      {/* Modal dạng Card nổi bóng */}
      <Modal
        title={
          <div className="text-xl font-bold text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
            <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
            {editingRecord ? "Cập nhật dữ liệu phòng ban" : "Tạo phòng ban doanh nghiệp"}
          </div>
        }
        open={isModalOpen}
        onOk={handleFormSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText={editingRecord ? "Cập nhật ngay" : "Khởi tạo phòng"}
        cancelText="Hủy"
        width={550}
        okButtonProps={{ className: "bg-indigo-600 hover:bg-indigo-700 border-none h-10 px-5 rounded-lg font-bold shadow-md shadow-indigo-100" }}
        cancelButtonProps={{ className: "h-10 px-5 rounded-lg border-slate-200 font-medium" }}
        className="custom-3d-modal"
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          name="department_form"
          className="pt-5"
          initialValues={{ status: 'Active' }}
        >
          <Form.Item
            name="name"
            label={<span className="font-bold text-slate-600">Tên phòng ban</span>}
            rules={[{ required: true, message: 'Tên phòng ban không được bỏ trống' }]}
          >
            <Input size="large" className="rounded-lg h-11 border-slate-200" placeholder="Ví dụ: Phòng Kỹ thuật & Công nghệ" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="code"
              label={<span className="font-bold text-slate-600">Mã viết tắt</span>}
              rules={[{ required: true, message: 'Nhập mã viết tắt' }]}
            >
              <Input size="large" className="rounded-lg h-11 border-slate-200" placeholder="Ví dụ: ENG" style={{ textTransform: 'uppercase' }} />
            </Form.Item>

            <Form.Item
              name="manager"
              label={<span className="font-bold text-slate-600">Trưởng phòng phụ trách</span>}
              rules={[{ required: true, message: 'Vui lòng điền tên người quản lý' }]}
            >
              <Input size="large" className="rounded-lg h-11 border-slate-200" placeholder="Nhập tên nhân sự" />
            </Form.Item>
          </div>

          <Form.Item
            name="status"
            label={<span className="font-bold text-slate-600">Trạng thái vận hành</span>}
            rules={[{ required: true }]}
          >
            <Select size="large" className="rounded-lg h-11" options={[
              { value: 'Active', label: 'Hoạt động bình thường' },
              { value: 'Inactive', label: 'Tạm ngưng hoạt động' },
            ]} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DepartmentPage;