
import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

interface DeskProps {
  id: string;
  x: number;
  y: number;
  isBooked: boolean;
  onSelect: (id: string) => void;
}

const Desk: React.FC<DeskProps> = ({ id, x, y, isBooked, onSelect }) => {
  const { toast } = useToast();

  const handleClick = () => {
    if (isBooked) {
      toast({
        title: "Bureau déjà réservé",
        description: "Ce bureau est déjà réservé pour cette période.",
        variant: "destructive",
      });
      return;
    }
    
    onSelect(id);
  };

  return (
    <motion.div
      className={`absolute w-10 h-10 rounded-full cursor-pointer ${isBooked ? 'bg-red-500' : 'bg-green-500'}`}
      style={{ left: `${x}px`, top: `${y}px` }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      data-desk-id={id}
    />
  );
};

export default Desk;
