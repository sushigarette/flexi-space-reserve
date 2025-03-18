
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import FloorPlan from '../components/floorplan/FloorPlan';
import { useToast } from "@/hooks/use-toast";

// Données des bureaux basées sur les coordonnées fournies
const initialDesksData = [
  { id: "desk-1", x: 660, y: 51, isBooked: false, bookedBy: null },
  { id: "desk-2", x: 757, y: 51, isBooked: false, bookedBy: null },
  { id: "desk-3", x: 660, y: 120, isBooked: false, bookedBy: null },
  { id: "desk-4", x: 760, y: 117, isBooked: false, bookedBy: null },
  { id: "desk-5", x: 991, y: 244, isBooked: false, bookedBy: null },
  { id: "desk-6", x: 1059, y: 241, isBooked: false, bookedBy: null },
  { id: "desk-7", x: 994, y: 331, isBooked: false, bookedBy: null },
  { id: "desk-8", x: 1062, y: 328, isBooked: false, bookedBy: null },
  { id: "desk-9", x: 990, y: 539, isBooked: false, bookedBy: null },
  { id: "desk-10", x: 1059, y: 541, isBooked: false, bookedBy: null },
  { id: "desk-11", x: 991, y: 627, isBooked: false, bookedBy: null },
  { id: "desk-12", x: 1062, y: 626, isBooked: false, bookedBy: null },
  { id: "desk-13", x: 989, y: 697, isBooked: false, bookedBy: null },
  { id: "desk-14", x: 1059, y: 697, isBooked: false, bookedBy: null },
  { id: "desk-15", x: 993, y: 787, isBooked: false, bookedBy: null },
  { id: "desk-16", x: 1061, y: 788, isBooked: false, bookedBy: null },
  { id: "desk-17", x: 989, y: 892, isBooked: false, bookedBy: null },
  { id: "desk-18", x: 1060, y: 892, isBooked: false, bookedBy: null },
  { id: "desk-19", x: 991, y: 984, isBooked: false, bookedBy: null },
  { id: "desk-20", x: 1061, y: 983, isBooked: false, bookedBy: null },
  { id: "desk-21", x: 649, y: 632, isBooked: false, bookedBy: null },
  { id: "desk-22", x: 745, y: 630, isBooked: false, bookedBy: null },
];

// Données des salles de réunion basées sur les coordonnées fournies
const initialMeetingRoomsData = [
  { id: "room-1", x: 492, y: 97, width: 47, height: 29, isBooked: false, bookedBy: null },
  { id: "room-2", x: 535, y: 405, width: 51, height: 34, isBooked: false, bookedBy: null },
  { id: "phonebox", x: 741, y: 360, width: 32, height: 22, isBooked: false, bookedBy: null },
];

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [desks, setDesks] = useState(initialDesksData);
  const [meetingRooms, setMeetingRooms] = useState(initialMeetingRoomsData);
  const [myReservations, setMyReservations] = useState<{id: string, type: 'desk' | 'room', date: Date}[]>([]);
  
  // Simuler un utilisateur connecté
  const currentUser = {
    id: "user-1",
    email: "utilisateur@example.com",
    name: "Utilisateur"
  };

  // Charger les réservations depuis le localStorage
  useEffect(() => {
    const savedDesks = localStorage.getItem('desks');
    const savedRooms = localStorage.getItem('meetingRooms');
    const savedReservations = localStorage.getItem('myReservations');
    
    if (savedDesks) setDesks(JSON.parse(savedDesks));
    if (savedRooms) setMeetingRooms(JSON.parse(savedRooms));
    if (savedReservations) setMyReservations(JSON.parse(savedReservations));
  }, []);

  // Sauvegarder les réservations dans le localStorage
  useEffect(() => {
    localStorage.setItem('desks', JSON.stringify(desks));
    localStorage.setItem('meetingRooms', JSON.stringify(meetingRooms));
    localStorage.setItem('myReservations', JSON.stringify(myReservations));
  }, [desks, meetingRooms, myReservations]);

  const handleReservation = (resourceId: string, resourceType: 'desk' | 'room', date: Date) => {
    if (resourceType === 'desk') {
      setDesks(desks.map(desk => 
        desk.id === resourceId ? { ...desk, isBooked: true, bookedBy: currentUser.id } : desk
      ));
      
      setMyReservations([...myReservations, { id: resourceId, type: 'desk', date: date }]);
      
      toast({
        title: "Bureau réservé",
        description: `Vous avez réservé le bureau ${resourceId.replace('desk-', '')} pour le ${new Date(date).toLocaleDateString('fr-FR')}.`,
      });
    } else {
      setMeetingRooms(meetingRooms.map(room => 
        room.id === resourceId ? { ...room, isBooked: true, bookedBy: currentUser.id } : room
      ));
      
      setMyReservations([...myReservations, { id: resourceId, type: 'room', date: date }]);
      
      toast({
        title: "Salle réservée",
        description: `Vous avez réservé la salle ${resourceId === 'phonebox' ? 'PhoneBox' : resourceId.replace('room-', '')} pour le ${new Date(date).toLocaleDateString('fr-FR')}.`,
      });
    }
  };

  const handleCancelReservation = (resourceId: string, resourceType: 'desk' | 'room') => {
    if (resourceType === 'desk') {
      setDesks(desks.map(desk => 
        desk.id === resourceId ? { ...desk, isBooked: false, bookedBy: null } : desk
      ));
    } else {
      setMeetingRooms(meetingRooms.map(room => 
        room.id === resourceId ? { ...room, isBooked: false, bookedBy: null } : room
      ));
    }
    
    setMyReservations(myReservations.filter(reservation => reservation.id !== resourceId));
    
    toast({
      title: "Réservation annulée",
      description: `Votre réservation a été annulée.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6 text-center">Tableau de bord - Réservation de Flex Office</h1>
          
          {myReservations.length > 0 && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Mes réservations</h2>
              <div className="space-y-4">
                {myReservations.map((reservation, index) => {
                  const resourceName = reservation.type === 'desk' 
                    ? `Bureau ${reservation.id.replace('desk-', '')}` 
                    : reservation.id === 'phonebox' 
                      ? 'PhoneBox' 
                      : `Salle ${reservation.id.replace('room-', '')}`;
                  
                  return (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">{resourceName}</p>
                        <p className="text-sm text-gray-600">Réservé pour le {new Date(reservation.date).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <button
                        onClick={() => handleCancelReservation(reservation.id, reservation.type)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
                      >
                        Annuler
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
