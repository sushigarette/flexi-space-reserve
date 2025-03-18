
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceId: string;
  resourceType: 'desk' | 'room';
  onConfirm: (resourceId: string, date: Date) => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ 
  isOpen, 
  onClose, 
  resourceId,
  resourceType,
  onConfirm
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleConfirm = () => {
    if (!date) {
      toast({
        title: "Date requise",
        description: "Veuillez sélectionner une date pour votre réservation.",
        variant: "destructive",
      });
      return;
    }

    onConfirm(resourceId, date);
    onClose();
    
    toast({
      title: "Réservation confirmée",
      description: `Votre ${resourceType === 'desk' ? 'bureau' : 'salle de réunion'} a été réservé avec succès.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Réserver {resourceType === 'desk' ? 'un bureau' : 'une salle de réunion'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleConfirm}>Confirmer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;
