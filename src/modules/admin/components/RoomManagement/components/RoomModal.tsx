import React, { useState, useEffect } from 'react';
import type {
  CreateRoomData,
  Room,
  RoomType,
  UpdateRoomData,
} from '../../../../../types/room.type';

// Define the shape of the form data for the modal
interface RoomFormData {
  name: string;
  capacity: string;
  type: RoomType;
  isActive: boolean;
}

// Define the RoomModal props
interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Explicitly define the two possible function signatures for onSubmit
  // This is the most robust way to handle the conditional onSubmit prop
  onSubmit:
    | ((data: CreateRoomData) => Promise<void>)
    | ((data: UpdateRoomData) => Promise<void>);
  roomToEdit: Room | null;
}

const RoomModal: React.FC<RoomModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  roomToEdit,
}) => {
  const [formData, setFormData] = useState<RoomFormData>({
    name: '',
    capacity: '',
    type: 'Standard',
    isActive: true,
  });

  useEffect(() => {
    if (roomToEdit) {
      setFormData({
        name: roomToEdit.name || '',
        capacity: String(roomToEdit.capacity) || '',
        type: roomToEdit.type || 'Standard',
        isActive:
          roomToEdit.isActive !== undefined ? roomToEdit.isActive : true,
      });
    } else {
      setFormData({
        name: '',
        capacity: '',
        type: 'Standard',
        isActive: true,
      });
    }
  }, [roomToEdit, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dynamically determine the type based on roomToEdit presence
    if (roomToEdit) {
      // If roomToEdit exists, it's an update
      const formattedData: UpdateRoomData = {
        name: formData.name, // Name is required for update in form, but optional in type
        capacity: parseInt(formData.capacity, 10),
        type: formData.type,
        isActive: formData.isActive,
      };
      (onSubmit as (data: UpdateRoomData) => Promise<void>)(formattedData);
    } else {
      // Otherwise, it's a creation
      const formattedData: CreateRoomData = {
        name: formData.name,
        capacity: parseInt(formData.capacity, 10),
        type: formData.type,
        isActive: formData.isActive,
      };
      (onSubmit as (data: CreateRoomData) => Promise<void>)(formattedData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='modal modal-open'>
      <div className='modal-box relative'>
        <h3 className='font-bold text-lg text-white'>
          {roomToEdit ? 'Chỉnh Sửa rạp' : 'Thêm rạp Mới'}
        </h3>
        <button
          className='btn btn-sm btn-circle absolute right-2 top-2'
          onClick={onClose}
        >
          ✕
        </button>
        <form onSubmit={handleSubmit} className='py-4 space-y-4'>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-white'>Tên rạp:</span>
            </label>
            <input
              type='text'
              name='name'
              placeholder='Nhập tên rạp'
              className='input input-bordered w-full'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-white'>Sức chứa:</span>
            </label>
            <input
              type='number'
              name='capacity'
              placeholder='Nhập sức chứa'
              className='input input-bordered w-full'
              value={formData.capacity}
              onChange={handleChange}
              required
              min='1'
            />
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text text-white'>Loại rạp:</span>
            </label>
            <select
              name='type'
              className='select select-bordered w-full'
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value='Standard'>Standard</option>
              <option value='2D'>2D</option>
              <option value='3D'>3D</option>
              <option value='IMAX'>IMAX</option>
              <option value='VIP'>VIP</option>
            </select>
          </div>

          <div className='form-control flex-row items-center space-x-3'>
            <label className='label cursor-pointer'>
              <span className='label-text text-white mr-2'>
                Trạng thái hoạt động:
              </span>
              <input
                type='checkbox'
                name='isActive'
                className='toggle toggle-primary'
                checked={formData.isActive}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className='modal-action'>
            <button type='submit' className='btn btn-primary'>
              {roomToEdit ? 'Cập Nhật' : 'Thêm Mới'}
            </button>
            <button type='button' className='btn btn-ghost' onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomModal;
