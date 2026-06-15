# TÀI LIỆU THIẾT KẾ API QUẢN LÝ NHÀ BÁN & KHO HÀNG
**Link mockup UI**: [https://xtxkej.axshare.com/?id=o9hb4v&p=ql_nh__b_n&sc=3&g=14](https://xtxkej.axshare.com/?id=o9hb4v&p=ql_nh__b_n&sc=3&g=14)

Cấu trúc API được thiết kế dựa trên ERD hiện tại và việc tách giao diện thành 6 màn hình quản lý 2 đối tượng độc lập: Business Seller (Nhà Bán) và Seller Store (Kho Hàng).

## MỤC LỤC
**PHẦN 1: QUẢN LÝ NHÀ BÁN (BUSINESS SELLER)**
1. [Lấy Danh Sách Nhà Bán](#1-api-lấy-danh-sách-nhà-bán-dùng-cho-bs_listhtml)
2. [Tạo Mới Nhà Bán](#2-api-tạo-mới-nhà-bán-dùng-cho-bs_createhtml)
3. [Lấy Chi Tiết Nhà Bán](#3-api-lấy-chi-tiết-nhà-bán-dùng-lúc-load-bs_edithtml)
4. [Cập Nhật Nhà Bán](#4-api-cập-nhật-nhà-bán-dùng-lúc-submit-sửa-ở-bs_edithtml)

**PHẦN 2: QUẢN LÝ KHO HÀNG (SELLER STORE)**
5. [Lấy Danh Sách Kho Hàng](#5-api-lấy-danh-sách-kho-hàng-dùng-cho-store_listhtml)
6. [Tạo Mới Kho Hàng](#6-api-tạo-mới-kho-hàng-dùng-cho-store_createhtml)
7. [Lấy Chi Tiết Kho Hàng](#7-api-lấy-chi-tiết-kho-hàng-dùng-lúc-load-store_edithtml)
8. [Cập Nhật Kho Hàng](#8-api-cập-nhật-kho-hàng-dùng-lúc-submit-sửa-store_edithtml)

**PHẦN 3: HỖ TRỢ DỮ LIỆU DROPDOWNS**
9. [Dropdown Nhà Bán](#9-api-dropdown-nhà-bán-dùng-cho-màn-hình-tạo-kho-hàng)
10. [Dropdown Dữ liệu ERP](#10-api-dropdown-dữ-liệu-erp)

---

## PHẦN 1: API DÀNH CHO ĐỐI TƯỢNG NHÀ BÁN (BUSINESS SELLER)

### 1. API Lấy Danh Sách Nhà Bán (Dùng cho bs_list.html)
- **Endpoint**: `GET /api/v1/business-sellers`
- **Query Params**:
  - `keyword` (string): Tìm kiếm theo tên hoặc ID nhà bán
  - `companyBrandId` (int): Tìm theo chuỗi kinh doanh (*Nếu người dùng không chọn tìm kiếm theo chuỗi kinh doanh, thì tức là tìm kiếm tất cả*)
  - `page` (int): Trang hiện tại (Mặc định: 1)
  - `size` (int): Số lượng record / trang (Mặc định: 50)
- **Response Shape**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "businessSellerId": 111,
        "businessSellerName": "CÔNG TY CỔ PHẦN TEKO VIỆT NAM",
        "supplierId": 41420,
        "supplierName": "CÔNG TY CỔ PHẦN TEKO VIỆT NAM",
        "companyBrandSites": [
          {
            "companyId": 1,
            "companyName": "Thế Giới Di Động (Công ty)",
            "companyBrandId": 2,
            "companyBrandName": "Điện Máy Xanh",
            "websiteId": 2,
            "websiteName": "dienmayxanh.com"
          }
        ],
        "createdUser": "admin",
        "createdDate": "2025-11-26T15:45:02.7254203Z",
        "updatedUser": null,
        "updatedDate": null,
        "isDeleted": false,
        "deletedUser": null,
        "deletedDate": null
      }
    ],
    "totalItems": 150,
    "totalPages": 3
  }
}
```

### 2. API Tạo Mới Nhà Bán (Dùng cho bs_create.html)
- **Endpoint**: `POST /api/v1/business-sellers`
- **Body Payload**:
```json
{
  "loginUser": {
    "sellerId": 0, 
    "buyerId": 81759
  },
  "businessSellerName": "CÔNG TY CỔ PHẦN TEKO VIỆT NAM",
  "supplierId": 41420,
  "companyBrandSites": [
    {
      "companyId": 1,
      "companyBrandId": 2,
      "websiteId": 2
    }
  ]
}
```
- **Xử lý phía Backend**: 
  - Insert vào bảng `sm_businessseller` -> Lấy ra ID. Từ thông tin `loginUser` ghi nhận người tạo vào column `createduser`.
  - Insert mapping supplier vào `sm_businessseller_supplier`.
  - Insert mapping (multiple nếu có) vào `sm_businessseller_companybrandsite`.

### 3. API Lấy Chi Tiết Nhà Bán (Dùng lúc load bs_edit.html)
- **Endpoint**: `GET /api/v1/business-sellers/{id}`
- **Response Shape**:
```json
{
  "success": true,
  "data": {
    "businessSellerId": 111,
    "businessSellerName": "CÔNG TY CỔ PHẦN TEKO VIỆT NAM",
    "supplierId": 41420,
    "supplierName": "CÔNG TY CỔ PHẦN TEKO VIỆT NAM",
    "companyBrandSites": [
      {
        "companyId": 1,
        "companyName": "Thế Giới Di Động (Công ty)",
        "companyBrandId": 2,
        "companyBrandName": "Điện Máy Xanh",
        "websiteId": 2,
        "websiteName": "dienmayxanh.com"
      }
    ],
    "createdUser": "admin",
    "createdDate": "2025-11-26T15:45:02.7254203Z",
    "updatedUser": null,
    "updatedDate": null,
    "isDeleted": false,
    "deletedUser": null,
    "deletedDate": null
  }
}
```

### 4. API Cập Nhật Nhà Bán (Dùng lúc submit sửa ở bs_edit.html)
- **Endpoint**: `PUT /api/v1/business-sellers/{id}`
- **Body Payload**: 
  Tương tự như API POST tạo mới, backend sẽ tiếp nhận `loginUser` để cập nhật người dùng vào bảng dữ liệu:
```json
{
  "loginUser": {
    "sellerId": null, 
    "buyerId": 10234
  },
  "businessSellerName": "CÔNG TY CỔ PHẦN TEKO VIỆT NAM (Đã update)",
  "supplierId": 41420,
  "companyBrandSites": [
    {
      "companyId": 1,
      "companyBrandId": 2,
      "websiteId": 2
    }
  ]
}
```

---

## PHẦN 2: API DÀNH CHO ĐỐI TƯỢNG KHO HÀNG (SELLER STORE)

### 5. API Lấy Danh Sách Kho Hàng (Dùng cho store_list.html)
- **Endpoint**: `GET /api/v1/seller-stores`
- **Query Params**:
  - `keyword` (string): Tìm theo tên kho hoặc ID kho
  - `businessSellerId` (int) - Optional: Lọc kho theo chủ sở hữu (Nhà Bán)
  - `page` (int), `size` (int)
- **Response Shape**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "sellerStoreId": 1113,
        "sellerStoreName": "Kho TEKO Đà Nẵng",
        "mwgStoreId": 30479,
        "mwgStoreName": "FBM_DNA-Kho đối tác TEKO",
        "businessSellerId": 111,
        "businessSellerName": "CÔNG TY CỔ PHẦN TEKO VIỆT NAM",
        "createdUser": "81759",
        "createdUserName": "Trần Thị Khánh Ly",
        "createdDate": "2025-11-26T15:45:02.7254203Z",
        "updatedUser": null,
        "updatedDate": null,
        "isDeleted": false,
        "deletedUser": null,
        "deletedDate": null
      }
    ],
    "totalItems": 150,
    "totalPages": 3
  }
}
```
- **Xử lý phía Backend**:
  - Sắp xếp kết quả theo: order by updatedDate,createdDate.


### 6. API Tạo Mới Kho Hàng (Dùng cho store_create.html)
- **Endpoint**: `POST /api/v1/seller-stores`
- **Mô tả**: Tạo một hoặc nhiều kho hàng cho 1 nhà bán. Thể hiện quan hệ **1 Business Seller → N Seller Store** (mỗi Seller Store mapping 1:1 với 1 MWG Store).
- **Body Payload**:
```json
{
  "loginUser": {
    "sellerId": 0, 
    "buyerId": 81759
  },
  "businessSellerId": 111, 
  "sellerStores": [
    {
      "sellerStoreName": "Kho TEKO Đà Nẵng",
      "mwgStoreId": 30479
    },
    {
      "sellerStoreName": "Kho TEKO Hồ Chí Minh",
      "mwgStoreId": 30480
    }
  ]
}
```
- **Xử lý phía Backend**:
  - Validate `businessSellerId` phải tồn tại trong bảng `sm_businessseller`.
  - Duyệt qua mảng `sellerStores`, mỗi phần tử insert vào bảng `sm_sellerstore` với `businessSellerId` tương ứng.
  - Mỗi `mwgStoreId` chỉ được mapping với 1 Seller Store duy nhất (unique constraint).
- **Response Shape (Sau khi tạo thành công)**:
```json
{
  "success": true,
  "data": {
  "loginUser": {
    "sellerId": 0, 
    "buyerId": 81759
  },
  "businessSellerId": 111, 
  "sellerStores": [
    {
        "sellerStoreId": 1113,
        "sellerStoreName": "Kho TEKO Đà Nẵng",
        "mwgStoreId": 30479
    },
    {
        "sellerStoreId": 1114,
        "sellerStoreName": "Kho TEKO Hồ Chí Minh",
        "mwgStoreId": 30480
    }
  ],
    "createdUser": "81759",
    "createdUserName": "Trần Thị Khánh Ly",
    "createdDate": "2026-04-15T10:05:00Z"
}
}
```

### 7. API Lấy Chi Tiết Kho Hàng (Dùng lúc load store_edit.html)
- **Endpoint**: `GET /api/v1/seller-stores/{businessSellerId}`
- **Mô tả**: Lấy thông tin nhà bán kèm toàn bộ danh sách kho hàng thuộc nhà bán đó. Phản ánh quan hệ **1 Business Seller → N Seller Store**.
- **Response Shape**:
```json
{
  "success": true,
  "data": {
    "businessSellerId": 111,
    "businessSellerName": "CÔNG TY CỔ PHẦN TEKO VIỆT NAM",
    "sellerStores": [
      {
        "sellerStoreId": 1113,
        "sellerStoreName": "Kho TEKO Đà Nẵng",
        "mwgStoreId": 30479,
        "mwgStoreName": "FBM_DNA-Kho đối tác TEKO"
      },
      {
        "sellerStoreId": 1114,
        "sellerStoreName": "Kho TEKO Hồ Chí Minh",
        "mwgStoreId": 30480,
        "mwgStoreName": "FBM_HCM-Kho đối tác TEKO"
      }
    ],
    "createdUser": "81759",
    "createdUserName": "Trần Thị Khánh Ly",
    "createdDate": "2025-11-26T15:45:02.7254203Z",
    "updatedUser": null,
    "updatedDate": null,
    "isDeleted": false,
    "deletedUser": null,
    "deletedDate": null
  }
}
```

### 8. API Cập Nhật Kho Hàng (Dùng lúc submit sửa store_edit.html)
- **Endpoint**: `PUT /api/v1/seller-stores/{businessSellerId}`
- **Mô tả**: Cập nhật danh sách kho hàng của 1 nhà bán. Backend sẽ so sánh danh sách gửi lên với dữ liệu hiện tại để xác định kho nào cần thêm mới, cập nhật, hoặc xóa.
- **Body Payload**:
```json
{
  "loginUser": {
    "sellerId": null, 
    "buyerId": 10234
  },
  "sellerStores": [
    {
      "sellerStoreId": 1113,
      "sellerStoreName": "Kho TEKO Đà Nẵng",
      "mwgStoreId": 30479
    },
    {
      "sellerStoreId": null,
      "sellerStoreName": "Kho TEKO Hà Nội",
      "mwgStoreId": 30485
    }
  ]
}
```
- **Xử lý phía Backend**:
  - `sellerStoreId` có giá trị → Update kho hàng đó.
  - `sellerStoreId` = null → Insert kho hàng mới cho nhà bán.
  - Kho hàng hiện tại không có trong mảng gửi lên → Đánh dấu `isDeleted = true` (soft delete).
  - Từ `loginUser` ghi nhận người cập nhật vào column `updateduser`.

---

## PHẦN 3: API HỖ TRỢ DỮ LIỆU ĐỔ VÀO UI (DROPDOWNS)

**9. API Dropdown Nhà Bán** (Dùng cho màn hình Tạo kho hàng)
- `GET /api/v1/dropdown/business-sellers` 
- Output cần chứa `businessSellerId` và `businessSellerName`.

**10. API Dropdown Dữ liệu ERP**
- `GET /api/v1/dropdown/erp/suppliers`
- `GET /api/v1/dropdown/erp/companies`
- `GET /api/v1/dropdown/erp/companybrands` (Hỗ trợ list cho filter "Tìm theo chuỗi kinh doanh")
- `GET /api/v1/dropdown/erp/websites`
- `GET /api/v1/dropdown/erp/mwgstore` (Dùng để mapping Kho hàng ERP vật lý)
