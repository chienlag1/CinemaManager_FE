const HomeContent = () => {
  return (
    <div className='grid gap-6 md:grid-cols-2 mt-10'>
      <div className='card bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title'>Đặt vé</h2>
          <p>Cho phép khách hàng đặt vé nhanh chóng và tiện lợi.</p>
        </div>
      </div>
      <div className='card bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title'>Quản lý suất chiếu</h2>
          <p>Thêm, chỉnh sửa lịch chiếu và phim dễ dàng.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
