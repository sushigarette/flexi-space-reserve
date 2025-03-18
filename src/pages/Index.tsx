
import React, { useState } from 'react';
import FloorPlan from '../components/floorplan/FloorPlan';
import { useToast } from "@/hooks/use-toast";

// Données des bureaux basées sur les coordonnées fournies
const desksData = [
  { id: "desk-1", x: 660, y: 51, isBooked: false },
  { id: "desk-2", x: 757, y: 51, isBooked: false },
  { id: "desk-3", x: 660, y: 120, isBooked: false },
  { id: "desk-4", x: 760, y: 117, isBooked: false },
  { id: "desk-5", x: 991, y: 244, isBooked: false },
  { id: "desk-6", x: 1059, y: 241, isBooked: false },
  { id: "desk-7", x: 994, y: 331, isBooked: false },
  { id: "desk-8", x: 1062, y: 328, isBooked: false },
  { id: "desk-9", x: 990, y: 539, isBooked: false },
  { id: "desk-10", x: 1059, y: 541, isBooked: false },
  { id: "desk-11", x: 991, y: 627, isBooked: false },
  { id: "desk-12", x: 1062, y: 626, isBooked: false },
  { id: "desk-13", x: 989, y: 697, isBooked: false },
  { id: "desk-14", x: 1059, y: 697, isBooked: false },
  { id: "desk-15", x: 993, y: 787, isBooked: false },
  { id: "desk-16", x: 1061, y: 788, isBooked: false },
  { id: "desk-17", x: 989, y: 892, isBooked: false },
  { id: "desk-18", x: 1060, y: 892, isBooked: false },
  { id: "desk-19", x: 991, y: 984, isBooked: false },
  { id: "desk-20", x: 1061, y: 983, isBooked: false },
  { id: "desk-21", x: 649, y: 632, isBooked: false },
  { id: "desk-22", x: 745, y: 630, isBooked: false },
];

// Données des salles de réunion basées sur les coordonnées fournies
const meetingRoomsData = [
  { id: "room-1", x: 492, y: 97, width: 47, height: 29, isBooked: false },
  { id: "room-2", x: 535, y: 405, width: 51, height: 34, isBooked: false },
  { id: "phonebox", x: 741, y: 360, width: 32, height: 22, isBooked: false },
];

const Index = () => {
  const { toast } = useToast();
  const [desks, setDesks] = useState(desksData);
  const [meetingRooms, setMeetingRooms] = useState(meetingRoomsData);

  const handleReservation = (resourceId: string, resourceType: 'desk' | 'room', date: Date) => {
    if (resourceType === 'desk') {
      setDesks(desks.map(desk => 
        desk.id === resourceId ? { ...desk, isBooked: true } : desk
      ));
      
      toast({
        title: "Bureau réservé",
        description: `Vous avez réservé le bureau ${resourceId} pour le ${date.toLocaleDateString('fr-FR')}.`,
      });
    } else {
      setMeetingRooms(meetingRooms.map(room => 
        room.id === resourceId ? { ...room, isBooked: true } : room
      ));
      
      toast({
        title: "Salle réservée",
        description: `Vous avez réservé la salle ${resourceId} pour le ${date.toLocaleDateString('fr-FR')}.`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Réservation de Flex Office</h1>
      <p className="text-gray-600 mb-8 text-center">
        Sélectionnez un bureau (vert) ou une salle de réunion (jaune) pour effectuer une réservation
      </p>
      
      <div className="w-full overflow-auto">
        <FloorPlan 
          desks={desks} 
          meetingRooms={meetingRooms} 
          onReservation={handleReservation}
        />
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="font-semibold mb-2">Légende :</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span>Bureau disponible</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            <span>Bureau réservé</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-yellow-300 mr-2"></div>
            <span>Salle disponible</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-amber-300 mr-2"></div>
            <span>Salle réservée</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
