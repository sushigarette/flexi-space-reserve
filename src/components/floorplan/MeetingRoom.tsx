
import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

interface MeetingRoomProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isBooked: boolean;
  onSelect: (id: string) => void;
}

const MeetingRoom: React.FC<MeetingRoomProps> = ({ id, x, y, width, height, isBooked, onSelect }) => {
  const { toast } = useToast();

  const handleClick = () => {
    if (isBooked) {
      toast({
        title: "Salle déjà réservée",
        description: "Cette salle de réunion est déjà réservée pour cette période.",
        variant: "destructive",
      });
      return;
    }
    
    onSelect(id);
  };

  return (
    <motion.div
      className={`absolute rounded-md cursor-pointer ${isBooked ? 'bg-amber-300' : 'bg-yellow-300'}`}
      style={{ 
        left: `${x}px`, 
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      data-room-id={id}
    />
  );
};

export default MeetingRoom;
