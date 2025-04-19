import React, { useState, useRef, useEffect } from 'react';

interface Visualization3DProps {
  propertyId: string;
  propertyName: string;
}

const Visualization3D: React.FC<Visualization3DProps> = ({
  propertyId,
  propertyName
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'exterior' | 'interior'>('exterior');
  const [currentRoom, setCurrentRoom] = useState<string>('living');
  
  // Mock rooms for interior view
  const rooms = [
    { id: 'living', name: 'Living Room' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'master', name: 'Master Bedroom' },
    { id: 'bedroom2', name: 'Bedroom 2' },
    { id: 'bathroom', name: 'Bathroom' }
  ];
  
  useEffect(() => {
    // Simulate loading the 3D model
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // In a real implementation, this would initialize a 3D rendering library like Three.js
  useEffect(() => {
    if (!isLoading && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw a placeholder visualization
        ctx.fillStyle = '#f0f9ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw some basic shapes to simulate a 3D model
        if (viewMode === 'exterior') {
          // Draw a simple house shape
          ctx.fillStyle = '#0ea5e9';
          ctx.beginPath();
          ctx.moveTo(150, 100);
          ctx.lineTo(450, 100);
          ctx.lineTo(500, 200);
          ctx.lineTo(100, 200);
          ctx.closePath();
          ctx.fill();
          
          ctx.fillStyle = '#0c4a6e';
          ctx.fillRect(100, 200, 400, 250);
          
          // Door
          ctx.fillStyle = '#7f1d1d';
          ctx.fillRect(250, 350, 100, 100);
          
          // Windows
          ctx.fillStyle = '#e0f2fe';
          ctx.fillRect(150, 250, 80, 80);
          ctx.fillRect(370, 250, 80, 80);
        } else {
          // Draw a room based on currentRoom
          ctx.fillStyle = '#f0fdf4';
          ctx.fillRect(50, 50, 500, 400);
          
          // Draw furniture based on the current room
          if (currentRoom === 'living') {
            // Sofa
            ctx.fillStyle = '#0c4a6e';
            ctx.fillRect(100, 300, 200, 100);
            
            // Coffee table
            ctx.fillStyle = '#7f1d1d';
            ctx.fillRect(150, 250, 100, 50);
            
            // TV
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(400, 150, 100, 80);
          } else if (currentRoom === 'kitchen') {
            // Counter
            ctx.fillStyle = '#7f1d1d';
            ctx.fillRect(100, 150, 400, 50);
            
            // Island
            ctx.fillStyle = '#7f1d1d';
            ctx.fillRect(200, 250, 200, 100);
          } else if (currentRoom.includes('bedroom')) {
            // Bed
            ctx.fillStyle = '#0c4a6e';
            ctx.fillRect(150, 200, 300, 200);
            
            // Nightstand
            ctx.fillStyle = '#7f1d1d';
            ctx.fillRect(100, 250, 50, 50);
            ctx.fillRect(450, 250, 50, 50);
          } else if (currentRoom === 'bathroom') {
            // Bathtub
            ctx.fillStyle = '#f0fdfa';
            ctx.fillRect(100, 150, 200, 100);
            
            // Sink
            ctx.fillStyle = '#f0fdfa';
            ctx.fillRect(400, 150, 100, 50);
            
            // Toilet
            ctx.fillStyle = '#f0fdfa';
            ctx.fillRect(400, 300, 100, 100);
          }
        }
        
        // Add text overlay
        ctx.fillStyle = '#0f172a';
        ctx.font = '20px Arial';
        ctx.fillText(`${propertyName} - ${viewMode === 'exterior' ? 'Exterior View' : `${rooms.find(r => r.id === currentRoom)?.name}`}`, 20, 30);
        ctx.font = '14px Arial';
        ctx.fillText('This is a placeholder for a 3D visualization. In a real implementation, this would use Three.js or a similar library.', 20, 480);
      }
    }
  }, [isLoading, viewMode, currentRoom, propertyName]);
  
  return (
    <div className="card">
      <h2 className="section-title">3D Property Visualization</h2>
      <p className="mb-4 text-gray-600">
        Explore your property in 3D and visualize customization options.
      </p>
      
      {/* View Mode Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`py-2 px-4 font-medium text-sm ${
            viewMode === 'exterior'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setViewMode('exterior')}
        >
          Exterior View
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${
            viewMode === 'interior'
              ? 'border-b-2 border-primary-500 text-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setViewMode('interior')}
        >
          Interior View
        </button>
      </div>
      
      {/* Room Selection (only visible in interior mode) */}
      {viewMode === 'interior' && (
        <div className="mb-4">
          <label className="form-label">Select Room</label>
          <select
            className="input-field"
            value={currentRoom}
            onChange={(e) => setCurrentRoom(e.target.value)}
          >
            {rooms.map(room => (
              <option key={room.id} value={room.id}>{room.name}</option>
            ))}
          </select>
        </div>
      )}
      
      {/* 3D Visualization Canvas */}
      <div className="relative bg-gray-100 rounded-md overflow-hidden mb-4" style={{ height: '500px' }}>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            <span className="ml-3 text-gray-700">Loading 3D model...</span>
          </div>
        ) : (
          <canvas 
            ref={canvasRef} 
            width={600} 
            height={500}
            className="w-full h-full"
          />
        )}
      </div>
      
      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button className="btn-outline py-1 px-3 text-sm">
          <span>Zoom In</span>
        </button>
        <button className="btn-outline py-1 px-3 text-sm">
          <span>Zoom Out</span>
        </button>
        <button className="btn-outline py-1 px-3 text-sm">
          <span>Rotate Left</span>
        </button>
        <button className="btn-outline py-1 px-3 text-sm">
          <span>Rotate Right</span>
        </button>
        <button className="btn-outline py-1 px-3 text-sm">
          <span>Reset View</span>
        </button>
      </div>
      
      {/* Instructions */}
      <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
        <h3 className="font-medium text-gray-900 mb-2">Navigation Instructions</h3>
        <ul className="space-y-1 list-disc pl-5">
          <li>Use the buttons above to zoom and rotate the model</li>
          <li>Switch between exterior and interior views using the tabs</li>
          <li>In interior view, select different rooms to explore</li>
          <li>Click on furniture items to see customization options</li>
        </ul>
      </div>
    </div>
  );
};

export default Visualization3D;
