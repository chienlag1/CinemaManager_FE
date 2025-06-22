import Swal, { type SweetAlertResult } from 'sweetalert2';

/**
 * Hiển thị Toast thông báo nhanh.
 * @param message Nội dung thông báo
 * @param type Loại thông báo (success | error | warning | info)
 * @param title (Tuỳ chọn) Tiêu đề
 */
export const showToast = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'success',
  title?: string
) => {
  Swal.fire({
    icon: type,
    title: title || (type === 'success' ? 'Thành công!' : 'Thông báo'),
    text: message,
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      popup: 'swal2-dark-theme',
    },
  });
};

/**
 * Hiển thị hộp thoại xác nhận và gọi API xóa nếu người dùng đồng ý.
 * @param deleteFn Hàm async thực thi việc xóa
 * @param successCallback Hàm sau khi xóa thành công
 * @param errorCallback (Tùy chọn) Hàm gọi nếu xóa thất bại
 * @param options (Tùy chọn) Tuỳ biến title, message,...
 */
export const confirmAndDelete = async (
  deleteFn: () => Promise<void>,
  successCallback: (message: string) => void,
  errorCallback?: (message: string) => void,
  options?: {
    title?: string;
    confirmText?: string;
    cancelText?: string;
    successMessage?: string;
  }
) => {
  const {
    title = 'Bạn có chắc chắn muốn xóa?',
    confirmText = 'Xóa',
    cancelText = 'Hủy',
    successMessage = 'Xóa thành công!',
  } = options || {};

  const result: SweetAlertResult = await Swal.fire({
    title,
    text: 'Hành động này không thể hoàn tác!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    customClass: { popup: 'swal2-dark-theme' },
  });

  if (result.isConfirmed) {
    try {
      await deleteFn();
      successCallback(successMessage);
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message || 'Không thể xóa. Vui lòng thử lại.';
      Swal.fire({
        title: 'Lỗi!',
        text: errorMsg,
        icon: 'error',
        customClass: { popup: 'swal2-dark-theme' },
      });

      if (errorCallback) errorCallback(errorMsg);
    }
  }
};
