
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
    <div className="relative w-full min-h-[1140px] border border-gray-300 rounded-lg overflow-auto">
      {/* Background Floor Plan Image */}
      <img 
        src="/lovable-uploads/e1aa33bb-423e-4b2d-8598-08df529360c3.png" 
        alt="Plan d'étage" 
        className="absolute top-0 left-0 w-full h-auto z-0" 
      />
      
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
