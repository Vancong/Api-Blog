# Blog API
API quản lý blog, cho phép người dùng tạo bài viết, chỉnh sửa, xóa, thêm thẻ (tags), tải hình ảnh.

## Chức năng chính 
- Quản lý bài viết: tạo, sửa, xóa, lấy danh sách, lấy chi tiết bài viết
- Hỗ trợ query bài viết: lọc theo tác giả, tìm kiếm theo tiêu đề / nội dung, phân trang
- Người dùng có thể like bài viết,bình luận và trả lời bình luận.
- Đăng ký, đăng nhập, phân quyền user/admin với JWT + httpOnly cookie


## Công nghệ sử dụng
- Node.js & Express
- MongoDB & Mongoose
- JWT & bcrypt

## Cài đặt & chạy dự án
```bash

git clone https://github.com/Vancong/Api-Blog

cd blog-api

npm install

cp .env.example .env

npm run dev
