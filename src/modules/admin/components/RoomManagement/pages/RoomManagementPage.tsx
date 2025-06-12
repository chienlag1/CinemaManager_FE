import { useState, useEffect, useCallback } from 'react';
import RoomModal from '../components/RoomModal';
import RoomTable from '../components/RoomTable';
import AddRoomButton from '../components/RoomButton';
import type {
  CreateRoomData,
  Room,
  UpdateRoomData,
} from '../../../../../types/room.type';
import type { RoomFilters } from '../components/RoomFilter';

import RoomFilter from '../components/RoomFilter';
import { roomApiService } from '../../../../../services/api.room';
import Swal from 'sweetalert2';

function RoomManagementPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<RoomFilters>({
    roomName: '',
    roomType: '',
    status: '',
  });

  const fetchRooms = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await roomApiService.getAllRooms();
      console.log('Fetched Rooms:', response);

      const fetchedRooms: Room[] = response.data.rooms;

      const filtered = fetchedRooms.filter((room: Room) => {
        const matchesName = room.name
          .toLowerCase()
          .includes(filters.roomName.toLowerCase());
        const matchesType =
          filters.roomType === '' || room.type === filters.roomType;
        const matchesStatus =
          filters.status === '' ||
          (filters.status === 'active' && room.isActive) ||
          (filters.status === 'inactive' && !room.isActive);
        return matchesName && matchesType && matchesStatus;
      });

      setRooms(filtered);
    } catch (err) {
      console.error('Failed to fetch rooms:', err);
      setError(new Error('Không thể tải dữ liệu phòng.'));
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleAddRoom = async (newRoomData: CreateRoomData) => {
    setIsLoading(true);
    setError(null);
    try {
      await roomApiService.createRoom(newRoomData);
      setIsModalOpen(false);
      setRoomToEdit(null);
      fetchRooms();
    } catch (err: unknown) {
      console.error('Failed to add room:', err);
      if (err instanceof Error) {
        setError(new Error(err.message || 'Không thể thêm phòng mới.'));
      } else if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as any).response?.data?.message === 'string'
      ) {
        setError(new Error((err as any).response.data.message));
      } else {
        setError(new Error('An unexpected error occurred.'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditRoom = async (roomData: UpdateRoomData) => {
    if (!roomToEdit?._id) return;

    try {
      await roomApiService.updateRoom(roomToEdit._id, roomData);
      Swal.fire('Thành công!', 'Thông tin phòng đã được cập nhật.', 'success');
      fetchRooms();
    } catch (error) {
      Swal.fire('Lỗi!', 'Không thể cập nhật phòng.', 'error');
    }
    handleCloseModal();
  };

  const handleDeleteRoom = async (roomId: string) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc muốn xoá phòng này?',
      text: 'Thao tác này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ',
    });

    if (result.isConfirmed) {
      try {
        await roomApiService.deleteRoom(roomId); // Gọi API xoá
        Swal.fire('Đã xoá!', 'Phòng đã được xoá thành công.', 'success');
        fetchRooms(); // Gọi lại hàm fetchRooms để reload danh sách
      } catch (error) {
        Swal.fire('Lỗi!', 'Không thể xoá phòng.', 'error');
      }
    }
  };

  const handleOpenAddModal = () => {
    setRoomToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (room: Room) => {
    setRoomToEdit(room);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRoomToEdit(null);
    setError(null);
  };

  const handleFilterChange = (name: keyof RoomFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      roomName: '',
      roomType: '',
      status: '',
    });
  };

  return (
    <div className='min-h-screen bg-gray-900 text-white p-6'>
      <div className='text-center py-8'>
        <h1 className='text-4xl font-bold text-white'>Quản Lý Phòng</h1>
      </div>
      <div className='container mx-auto px-4 py-8'>
        <AddRoomButton onAddClick={handleOpenAddModal} />
        <RoomFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        <RoomTable
          rooms={rooms}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteRoom}
          isLoading={isLoading}
          error={error}
        />
      </div>

      <RoomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={roomToEdit ? handleEditRoom : handleAddRoom}
        roomToEdit={roomToEdit}
      />
    </div>
  );
}
export default RoomManagementPage;
