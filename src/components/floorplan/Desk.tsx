
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
  const deskNumber = id.replace('desk-', '');

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
      className={`absolute rounded-full cursor-pointer flex items-center justify-center ${isBooked ? 'bg-red-500' : 'bg-green-500'} text-white font-semibold shadow-md`}
      style={{ 
        left: `${x - 15}px`, 
        top: `${y - 15}px`,
        width: '30px',
        height: '30px',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      data-desk-id={id}
      title={`Bureau FlexOffice ${deskNumber}`}
    >
      {deskNumber}
    </motion.div>
  );
};

export default Desk;
