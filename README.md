Họ và tên: LE ANH THU | MSSV: 23706741 | URL clone HTTPS: https://github.com/thuanhle5992/23706741_TH2.git | Stamp: #842066 | Số cuối MSSV: 1 | VARIANT: Dòng tên Dưới, Login phone, Tab Shop trước (shopFirst), Haptic selection, Phí ship B, Detail card

# BKT2 — DỰ ÁN KTXGo (REACT NATIVE)

**Học phần:** Lập trình cho thiết bị di động  
**Sinh viên:** LE ANH THU  
**MSSV:** 23706741  
**Mã Stamp:** #842066  
**Thư mục dự án:** `KTXGo_23706741`  
**Package name:** `ktxgo-23706741`  
**Repository:** [https://github.com/thuanhle5992/23706741_TH2.git](https://github.com/thuanhle5992/23706741_TH2.git)

---

## 1. Thông số định danh & Biến thể (VARIANT)

Dựa trên số cuối MSSV: **1** và seed: **741**:
- **LAST_DIGIT:** `1`
- **STUDENT_SEED:** `741`
- **DEBOUNCE_MS:** `300 + (741 % 5) * 100` = `400 ms`
- **STALE_TIME_MS:** `10_000 + (741 % 20) * 1000` = `11_000 ms` (11 giây)
- **PRICE_MULTIPLIER:** `15000 + (741 % 40) * 500` = `25_500`
- **BASE_SHIP_FEE:** `8000 + (741 % 10) * 1000` = `9_000 đ`
- **ROOM_LABEL:** `P.441`
- **BANNER_IMAGE_ID:** `341`
- **VARIANT:**
  - `watermarkAtTop`: `false` (Dòng tên ở Dưới)
  - `authField`: `'phone'` (Ô nhập số điện thoại)
  - `tabOrder`: `'shopFirst'` (Thứ tự tab: Cửa hàng trước, Giỏ, Tôi)
  - `hapticOnAdd`: `'selection'` (Haptics selection khi thêm giỏ)
  - `shipFormula`: `'B'` (`BASE_SHIP_FEE + Math.round(km * 1500) + 2000`)
  - `detailPresentation`: `'card'` (Presentation dạng card)

---

## 2. Kiến trúc & Công nghệ

- **React Native CLI + TypeScript**
- **React Navigation v7:**
  - `RootNavigator`: điều hướng `Auth` (chưa đăng nhập) và `Main` (đã đăng nhập)
  - `AuthStack`: Màn hình `LoginScreen`
  - `ShopStack`: Màn hình `HomeScreen` -> `DetailScreen` (truyền `id`)
  - `MainTabs`: Tabs động (`Cửa hàng`, `Giỏ`, `Tôi`) theo biến thể `shopFirst`/`cartFirst`
- **Quản lý trạng thái:**
  - `Zustand` + `persist` (`AsyncStorage`): Quản lý `cartStore` (key `ktxgo-cart-23706741`)
  - `authStore`: Quản lý token xác thực giả lập (`ktxgo-23706741-842066`)
- **Server state & Mạng:**
  - `TanStack Query` (`useQuery`): fetch dữ liệu món từ FakeStoreAPI với `staleTime: STALE_TIME_MS`
  - `Axios`: instance với baseURL, timeout và interceptor gắn header `X-Student-Id: 23706741`
- **Device Native:**
  - `expo-location`: Luồng xin quyền runtime (3 nhánh `granted`, `denied`, `blocked`), tính khoảng cách Haversine tới KTX và tính phí ship
  - `expo-haptics`: Rung phản hồi khi bấm nút thêm vào giỏ hàng
  - `Linking.openSettings`: Mở Cài đặt hệ thống khi quyền vị trí bị `blocked`
- **Hiệu năng danh sách:**
  - `@shopify/flash-list`: Lưới 2 cột (`numColumns={2}`), `estimatedItemSize={260}`, pull-to-refresh
  - Debounce tìm kiếm: `useDebouncedValue` với độ trễ `DEBOUNCE_MS`

---

## 3. Ảnh chụp màn hình máy ảo

1. Màn hình Cửa hàng (Home): `docs/screenshot-th2-home.png`
2. Màn hình Giỏ hàng (Cart): `docs/screenshot-th2-cart.png`
