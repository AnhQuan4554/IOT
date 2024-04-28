# GIỚI THIỆU QUA DỰ ÁN

- Web IOT là dự án hiểu thị thông số dữ liệu nhiệt độ , độ ẩm , ánh sáng cùng với đố là chức năng bật tắt đèn
- Dự án được tích hợp giao thức MQTT để nhận được các thông số gửi từ ESP8266
- Công nghệ sử dụng trong dự án
  - Backennd : NestJs
  - Frontend : ReactJs
  - Giao thức sử dụng : websocket , Http , MQTT

# SETUP DỰ ÁN

Bước 1: Clone dự án ở repo
https://github.com/AnhQuan4554/IOT.git
Bước 2 ở terminal chọn cd back-end-iot để chọn project back end hoặc client-iot để chọn front end

Bước 3 ( bên back-end)

# cài đặt back end

npm i

# chạy chương trình

npm run dev

# Cài đặt env

- Tạo 1 file .evn sau đó tạo biến BROKER_URL = mqtt://{ip}
- cách lấy biến ip :
  - Mở cmd , gõ ipconfig
  - Tìm đến giá trị của ip address v4

# link API Doc : http://localhost:3001/api

Bước 4 : mở cmd gõ ipconfig : chọn ip address v4 , coppy và dán vào trong field .env của dự án backend
Bước 5 Cài đặt mysql trên locall
Bước 5 Trong mysql tạo data base tên là iot
Bước 6 Vào trong app.service.ts điền thông tin của mysql trên máy mình
