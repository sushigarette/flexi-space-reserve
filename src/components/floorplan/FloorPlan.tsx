
import React, { useState } from 'react';
import Desk from './Desk';
import MeetingRoom from './MeetingRoom';
import ReservationModal from '../reservation/ReservationModal';

interface FloorPlanProps {
  desks: { id: string; x: number; y: number; isBooked: boolean }[];
  meetingRooms: { id: string; x: number; y: number; width: number; height: number; isBooked: boolean }[];
  onReservation: (resourceId: string, resourceType: 'desk' | 'room', date: Date) => void;
}

const FloorPlan: React.FC<FloorPlanProps> = ({ desks, meetingRooms, onReservation }) => {
  const [selectedResource, setSelectedResource] = useState<{ id: string; type: 'desk' | 'room' } | null>(null);
  
  const handleSelect = (id: string, type: 'desk' | 'room') => {
    setSelectedResource({ id, type });
  };
  
  const handleConfirmReservation = (resourceId: string, date: Date) => {
    if (selectedResource) {
      onReservation(resourceId, selectedResource.type, date);
    }
    setSelectedResource(null);
  };

  return (
    <div className="relative w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
      {/* Blueprint Background */}
      <div className="absolute inset-0 bg-blue-50 p-6">
        <div className="grid grid-cols-12 gap-4 h-full">
          {/* Grid Lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`col-${i}`} className="h-full border-l border-blue-100" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`row-${i}`} className="absolute w-full border-t border-blue-100" style={{ top: `${(i + 1) * 12.5}%` }} />
          ))}
        </div>
      </div>
      
      {/* Desks */}
      {desks.map(desk => (
        <Desk
          key={desk.id}
          id={desk.id}
          x={desk.x}
          y={desk.y}
          isBooked={desk.isBooked}
          onSelect={(id) => handleSelect(id, 'desk')}
        />
      ))}
      
      {/* Meeting Rooms */}
      {meetingRooms.map(room => (
        <MeetingRoom
          key={room.id}
          id={room.id}
          x={room.x}
          y={room.y}
          width={room.width}
          height={room.height}
          isBooked={room.isBooked}
          onSelect={(id) => handleSelect(id, 'room')}
        />
      ))}
      
      {/* Reservation Modal */}
      {selectedResource && (
        <ReservationModal
          isOpen={!!selectedResource}
          onClose={() => setSelectedResource(null)}
          resourceId={selectedResource.id}
          resourceType={selectedResource.type}
          onConfirm={handleConfirmReservation}
        />
      )}
    </div>
  );
};

export default FloorPlan;
