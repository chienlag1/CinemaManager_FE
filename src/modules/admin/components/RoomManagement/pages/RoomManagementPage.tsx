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
import { confirmAndDelete, showToast } from '../../../../../utils/alertUtils';

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
      showToast('Thêm phòng thành công!', 'success');
      setIsModalOpen(false);
      setRoomToEdit(null);
      fetchRooms();
    } catch (err: unknown) {
      let errorMsg = 'Không thể thêm phòng mới.';

      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as any).response?.data?.message === 'string'
      ) {
        errorMsg = (err as any).response.data.message;
      }

      showToast(errorMsg, 'error', 'Thất bại!');
      setError(new Error(errorMsg));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditRoom = async (roomData: UpdateRoomData) => {
    if (!roomToEdit?._id) return;

    try {
      await roomApiService.updateRoom(roomToEdit._id, roomData);
      showToast('Thông tin phòng đã được cập nhật.', 'success');
      fetchRooms();
    } catch (error) {
      showToast('Không thể cập nhật phòng.', 'error');
    }
    handleCloseModal();
  };

  const handleDeleteRoom = async (roomId: string) => {
    await confirmAndDelete(
      async () => {
        await roomApiService.deleteRoom(roomId); // Gọi API xoá
      },
      (message) => {
        showToast(message, 'success', 'Đã xoá!');
        fetchRooms();
      },
      (errMessage) => {
        console.error(errMessage);
      },
      {
        title: 'Bạn có chắc muốn xoá phòng này?',
        confirmText: 'Xoá',
        cancelText: 'Huỷ',
        successMessage: 'Phòng đã được xoá thành công.',
      }
    );
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
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-gray-100 p-8 font-inter flex flex-col items-center'>
      <div className='max-w-7xl w-full'>
        <h1 className='text-4xl font-extrabold text-center  text-white drop-shadow-lg'>
          Quản Lý Rạp Chiếu
        </h1>

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
    </div>
  );
}
export default RoomManagementPage;
