# AccessHub UI 🌐

AccessHub UI là giao diện người dùng (Frontend) chính thức của hệ thống **AccessHub** — giải pháp quản lý quyền truy cập và phân quyền tập trung. Dự án được xây dựng với mục tiêu cung cấp trải nghiệm mượt mà, trực quan và tối ưu hiệu năng cho quản trị viên lẫn người dùng cuối.

> 🔗 **Kho lưu trữ Backend liên quan:** [AccessHub Backend](https://github.com/nguyenlyminhman/accesshub)

---

## 🚀 Tính năng nổi bật

*   **Bảng điều khiển trực quan (Dashboard):** Thống kê và theo dõi trạng thái hệ thống theo thời gian thực.
*   **Quản lý phân quyền mạnh mẽ:** Giao diện cấu hình Roles, Permissions và Policies linh hoạt.
*   **Quản lý người dùng & Nhóm:** Thao tác thêm, xóa, sửa, gán quyền và phân loại người dùng dễ dàng.
*   **Nhật ký hoạt động (Audit Logs):** Theo dõi lịch sử truy cập và thay đổi cấu hình trực quan qua biểu đồ/bảng biểu.
*   **Thiết kế Responsive:** Tương thích hoàn hảo trên cả máy tính (Desktop), máy tính bảng (Tablet) và điện thoại (Mobile).

## 🛠️ Công nghệ sử dụng

Dự án Frontend này được phát triển dựa trên hệ sinh thái Javascript/TypeScript hiện đại:

*   **Framework:** [Next.js](https://nextjs.org/) / [React](https://react.dev/) *(Cập nhật theo stack thực tế của bạn, ví dụ: Vite, Vue, v.v.)*
*   **Ngôn ngữ:** TypeScript (đảm bảo type-safe và dễ bảo trì).
*   **Styling & UI Components:** Tailwind CSS / Ant Design / Shadcn UI / Material UI *(Điền thư viện UI bạn đang dùng vào đây)*
*   **State Management:** Redux Toolkit / Zustand / React Context Api
*   **HTTP Client:** Axios / Fetch API (kết nối trực tiếp với AccessHub API).

---

## 💻 Hướng dẫn cài đặt & Chạy local

### 📋 Yêu cầu hệ thống
*   [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản LTS mới nhất)
*   [npm](https://www.npmjs.com/) hoặc [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### 🛠️ Các bước thực hiện

1.  **Clone mã nguồn về máy:**
```bash
    git clone [https://github.com/nguyenlyminhman/accesshub-ui.git](https://github.com/nguyenlyminhman/accesshub-ui.git)
    cd accesshub-ui
    ```

2.  **Cài đặt các gói phụ thuộc (Dependencies):**
```bash
    npm install
    # hoặc
    yarn install
    # hoặc
    pnpm install
    ```

3.  **Cấu hình biến môi trường (Environment Variables):**
Tạo một file `.env.local` (hoặc `.env`) ở thư mục gốc và cấu hình URL trỏ về phía Backend:
```env
    NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
    # Thay đổi port và endpoint tùy thuộc vào cấu hình của AccessHub Backend
    ```

4.  **Khởi chạy dự án ở chế độ Development:**
```bash
    npm run dev
    # hoặc
    yarn dev
    # hoặc
    pnpm dev
    ```
Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

5.  **Biên dịch dự án cho môi trường Production:**
```bash
    npm run build
    npm run start
    ```

---

## 🏗️ Kiến trúc thư mục dự án

```text
accesshub-ui/
├── public/          # Tài nguyên tĩnh (Images, Icons, Fonts)
├── src/
│   ├── components/  # Các component UI dùng chung (Button, Modal, Table...)
│   ├── context/     # React Context quản lý Global State (Auth, Theme...)
│   ├── hooks/       # Custom React Hooks
│   ├── pages/       # Định tuyến (Routing) hoặc thư mục /app nếu dùng Next.js App Router
│   ├── services/    # Tầng gọi API kết nối tới AccessHub Backend
│   ├── styles/      # Cấu hình CSS/Tailwind
│   ├── types/       # Định nghĩa các TypeScript Interfaces/Types
│   └── utils/       # Các hàm tiện ích (Format date, chuỗi, validate...)
├── .env.example     # File mẫu cấu hình biến môi trường
├── package.json
└── README.md
```
