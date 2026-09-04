import React, { useState, useMemo } from 'react';
import {
  Package,
  Truck,
  RotateCcw,
  LayoutDashboard,
  Boxes,
  Calendar,
  Plus,
  Minus,
  Search,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Sparkles,
  ChevronRight,
  Download,
  Share2,
  Layers,
  Building2,
  PartyPopper,
  Wine,
  X,
  Star,
  Camera,
  Shield,
  UserCheck,
  MessageSquare,
  FileSpreadsheet,
  Calendar as CalendarIcon,
  Eye,
  Info
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: Boxes },
  { id: 'staging', name: 'Staging & Trusses', icon: Layers },
  { id: 'wedding', name: 'Wedding Decor Props', icon: PartyPopper },
  { id: 'fabrics', name: 'Fabrics & Drapes', icon: Sparkles },
  { id: 'bar', name: 'Bar Structures', icon: Wine },
  { id: 'furniture', name: 'Furniture & Lounges', icon: Building2 },
  { id: 'detailing', name: 'Detailing Props', icon: Package },
];

const INITIAL_INVENTORY = [
  {
    id: 'INV-001',
    name: 'Heavy Staging Angle Ply (4x8 ft)',
    category: 'staging',
    total: 100,
    inWorkshop: 45,
    outAtEvents: 50,
    damaged: 5,
    unit: 'pcs',
    minThreshold: 15,
    location: 'Aisle A - Rack 1',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=80',
    description: 'Heavy duty wooden staging ply with steel angle brackets and interlocking safety bolts.',
    beforePhoto: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=80',
    afterPhoto: null
  },
  {
    id: 'INV-002',
    name: 'Carved Gold Mandap Pillars',
    category: 'wedding',
    total: 16,
    inWorkshop: 4,
    outAtEvents: 12,
    damaged: 0,
    unit: 'pcs',
    minThreshold: 6,
    location: 'Aisle B - Section 3',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=80',
    description: 'Royal carved fiberglass pillars with antique gold electroplating finish for wedding mandaps.',
    beforePhoto: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&auto=format&fit=crop&q=80',
    afterPhoto: null
  },
  {
    id: 'INV-003',
    name: 'Crimson Red Velvet Drapes (20ft)',
    category: 'fabrics',
    total: 80,
    inWorkshop: 8,
    outAtEvents: 70,
    damaged: 2,
    unit: 'rolls',
    minThreshold: 15,
    location: 'Fabric Bay - Rack 2',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&auto=format&fit=crop&q=80',
    description: 'Flame-retardant heavy velvet curtains for grand backdrop & pavilion drapes.',
    beforePhoto: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&auto=format&fit=crop&q=80',
    afterPhoto: null
  },
  {
    id: 'INV-004',
    name: 'Modular Circular LED Island Bar Counter',
    category: 'bar',
    total: 8,
    inWorkshop: 2,
    outAtEvents: 5,
    damaged: 1,
    unit: 'sets',
    minThreshold: 3,
    location: 'Aisle C - Floor Space',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400&auto=format&fit=crop&q=80',
    description: '4-piece circular light-up acrylic bar structure with protective flight cases.',
    beforePhoto: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400&auto=format&fit=crop&q=80',
    afterPhoto: null
  },
  {
    id: 'INV-005',
    name: 'Crystal Chandeliers (12-Arm Warm White)',
    category: 'detailing',
    total: 24,
    inWorkshop: 14,
    outAtEvents: 10,
    damaged: 0,
    unit: 'pcs',
    minThreshold: 5,
    location: 'Fragile Zone - Shelf 4',
    image: 'https://images.unsplash.com/photo-1543198181-e619b695113c?w=400&auto=format&fit=crop&q=80',
    description: 'Warm white crystal hanging chandelier with dimmable wiring harnesses.',
    beforePhoto: 'https://images.unsplash.com/photo-1543198181-e619b695113c?w=400&auto=format&fit=crop&q=80',
    afterPhoto: null
  },
  {
    id: 'INV-006',
    name: 'Emerald Tufted Chesterfield Velvet Lounge',
    category: 'furniture',
    total: 20,
    inWorkshop: 10,
    outAtEvents: 10,
    damaged: 0,
    unit: 'pcs',
    minThreshold: 4,
    location: 'Furniture Zone B',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=80',
    description: '3-seater deep buttoned tufted velvet lounge sofa in royal emerald green.',
    beforePhoto: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=80',
    afterPhoto: null
  }
];

const INITIAL_EVENTS = [
  {
    id: 'EVT-101',
    name: 'Beachfront Destination Wedding',
    client: 'Albuquerque Family',
    venue: 'Taj Exotica Resort, South Goa',
    startDate: '2026-09-10',
    endDate: '2026-09-14',
    status: 'ACTIVE_DISPATCHED',
    itemsDeployed: [
      { itemId: 'INV-001', qty: 50 },
      { itemId: 'INV-002', qty: 12 },
      { itemId: 'INV-003', qty: 50 },
      { itemId: 'INV-005', qty: 10 }
    ]
  },
  {
    id: 'EVT-102',
    name: 'Sundowner Leadership Summit Goa 2026',
    client: 'Apex Global',
    venue: 'W Goa, Vagator',
    startDate: '2026-09-18',
    endDate: '2026-09-21',
    status: 'ACTIVE_DISPATCHED',
    itemsDeployed: [
      { itemId: 'INV-003', qty: 20 },
      { itemId: 'INV-004', qty: 5 },
      { itemId: 'INV-006', qty: 10 }
    ]
  },
  {
    id: 'EVT-103',
    name: 'Royal Palace Sangeet Night',
    client: 'Fernandes Production',
    venue: 'Grand Hyatt, Bambolim Goa',
    startDate: '2026-10-02',
    endDate: '2026-10-05',
    status: 'PLANNED',
    itemsDeployed: []
  }
];

export default function App() {
  const [userRole, setUserRole] = useState('manager'); // 'manager' | 'staff'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Dispatch Form State
  const [dispatchForm, setDispatchForm] = useState({
    eventId: '',
    newEventName: '',
    newEventVenue: '',
    items: {},
    beforePhotos: {}
  });

  // Return Form State
  const [returnForm, setReturnForm] = useState({
    eventId: '',
    itemsToReturn: {},
    afterPhotos: {}
  });

  // Photo modal inspection preview
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [toast, setToast] = useState(null);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  // New Item Form
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'staging',
    total: 10,
    unit: 'pcs',
    location: 'Aisle A',
    minThreshold: 5,
    image: '',
    description: ''
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const stats = useMemo(() => {
    const totalItemsCount = inventory.reduce((acc, item) => acc + item.total, 0);
    const totalInWorkshop = inventory.reduce((acc, item) => acc + item.inWorkshop, 0);
    const totalOutAtEvents = inventory.reduce((acc, item) => acc + item.outAtEvents, 0);
    const totalDamaged = inventory.reduce((acc, item) => acc + item.damaged, 0);
    const lowStockItems = inventory.filter(item => item.inWorkshop <= item.minThreshold);

    return {
      totalItemsCount,
      totalInWorkshop,
      totalOutAtEvents,
      totalDamaged,
      lowStockItems,
      activeEventsCount: events.filter(e => e.status === 'ACTIVE_DISPATCHED').length
    };
  }, [inventory, events]);

  const filteredInventory = useMemo(() => {
    return inventory.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [inventory, selectedCategory, searchQuery]);

  const handleDispatchQuantityChange = (itemId, change) => {
    const item = inventory.find(i => i.id === itemId);
    if (!item) return;

    const currentQty = dispatchForm.items[itemId] || 0;
    const newQty = Math.max(0, currentQty + change);

    if (newQty > item.inWorkshop) {
      showToast(`Cannot dispatch more than ${item.inWorkshop} available in workshop!`, 'error');
      return;
    }

    setDispatchForm(prev => {
      const updated = { ...prev.items };
      if (newQty === 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = newQty;
      }
      return { ...prev, items: updated };
    });
  };

  const handlePresetDispatch = (itemId, value) => {
    const item = inventory.find(i => i.id === itemId);
    if (!item) return;

    const currentQty = dispatchForm.items[itemId] || 0;
    const newQty = currentQty + value;

    if (newQty > item.inWorkshop) {
      showToast(`Max available in workshop is ${item.inWorkshop}!`, 'error');
      return;
    }

    setDispatchForm(prev => ({
      ...prev,
      items: { ...prev.items, [itemId]: newQty }
    }));
  };

  const handlePhotoUpload = (itemId, type, fileUrl) => {
    if (type === 'dispatch_before') {
      setDispatchForm(prev => ({
        ...prev,
        beforePhotos: { ...prev.beforePhotos, [itemId]: fileUrl }
      }));
      showToast('Before-Event Inspection Photo Recorded!');
    } else if (type === 'return_after') {
      setReturnForm(prev => ({
        ...prev,
        afterPhotos: { ...prev.afterPhotos, [itemId]: fileUrl }
      }));
      showToast('After-Return Condition Photo Recorded!');
    }
  };

  const submitDispatch = () => {
    let targetEventId = dispatchForm.eventId;

    if (!targetEventId && !dispatchForm.newEventName) {
      showToast('Please select an existing event or enter a new event name!', 'error');
      return;
    }

    if (Object.keys(dispatchForm.items).length === 0) {
      showToast('Please select at least 1 item to dispatch!', 'error');
      return;
    }

    let updatedEvents = [...events];

    if (!targetEventId && dispatchForm.newEventName) {
      const newEvt = {
        id: `EVT-${Date.now().toString().slice(-3)}`,
        name: dispatchForm.newEventName,
        client: 'Goa Event Client',
        venue: dispatchForm.newEventVenue || 'Goa Event Location',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '2026-12-31',
        status: 'ACTIVE_DISPATCHED',
        itemsDeployed: []
      };
      updatedEvents.unshift(newEvt);
      targetEventId = newEvt.id;
    }

    updatedEvents = updatedEvents.map(evt => {
      if (evt.id === targetEventId) {
        const existingDeployed = [...evt.itemsDeployed];
        Object.entries(dispatchForm.items).forEach(([itemId, qty]) => {
          const matchIndex = existingDeployed.findIndex(d => d.itemId === itemId);
          if (matchIndex >= 0) {
            existingDeployed[matchIndex].qty += qty;
          } else {
            existingDeployed.push({ itemId, qty });
          }
        });

        return {
          ...evt,
          status: 'ACTIVE_DISPATCHED',
          itemsDeployed: existingDeployed
        };
      }
      return evt;
    });

    const updatedInventory = inventory.map(item => {
      const dispatchedQty = dispatchForm.items[item.id];
      if (dispatchedQty && dispatchedQty > 0) {
        const beforePhoto = dispatchForm.beforePhotos[item.id] || item.image;
        return {
          ...item,
          inWorkshop: item.inWorkshop - dispatchedQty,
          outAtEvents: item.outAtEvents + dispatchedQty,
          beforePhoto
        };
      }
      return item;
    });

    setEvents(updatedEvents);
    setInventory(updatedInventory);
    setDispatchForm({ eventId: '', newEventName: '', newEventVenue: '', items: {}, beforePhotos: {} });
    showToast('Inventory OUT safely dispatched to truck!');
    setActiveTab('dashboard');
  };

  const handleSelectEventForReturn = (evtId) => {
    const evt = events.find(e => e.id === evtId);
    if (!evt) return;

    const initialReturns = {};
    evt.itemsDeployed.forEach(dep => {
      initialReturns[dep.itemId] = {
        maxQty: dep.qty,
        returnedQty: dep.qty,
        damagedQty: 0
      };
    });

    setReturnForm({
      eventId: evtId,
      itemsToReturn: initialReturns,
      afterPhotos: {}
    });
  };

  const handleReturnItemQtyChange = (itemId, field, val) => {
    setReturnForm(prev => {
      const currentObj = prev.itemsToReturn[itemId];
      if (!currentObj) return prev;

      const numVal = Math.max(0, parseInt(val) || 0);
      let updatedObj = { ...currentObj, [field]: numVal };

      if (updatedObj.returnedQty + updatedObj.damagedQty > currentObj.maxQty) {
        if (field === 'returnedQty') {
          updatedObj.damagedQty = Math.max(0, currentObj.maxQty - updatedObj.returnedQty);
        } else {
          updatedObj.returnedQty = Math.max(0, currentObj.maxQty - updatedObj.damagedQty);
        }
      }

      return {
        ...prev,
        itemsToReturn: {
          ...prev.itemsToReturn,
          [itemId]: updatedObj
        }
      };
    });
  };

  const submitReturn = () => {
    if (!returnForm.eventId) {
      showToast('Select an event to return items from!', 'error');
      return;
    }

    let updatedInventory = [...inventory];

    Object.entries(returnForm.itemsToReturn).forEach(([itemId, data]) => {
      const { returnedQty, damagedQty } = data;
      const afterPhoto = returnForm.afterPhotos[itemId];

      updatedInventory = updatedInventory.map(item => {
        if (item.id === itemId) {
          return {
            ...item,
            inWorkshop: item.inWorkshop + returnedQty,
            damaged: item.damaged + damagedQty,
            outAtEvents: Math.max(0, item.outAtEvents - (returnedQty + damagedQty)),
            afterPhoto: afterPhoto || item.afterPhoto
          };
        }
        return item;
      });
    });

    const updatedEvents = events.map(e => {
      if (e.id === returnForm.eventId) {
        const newDeployed = e.itemsDeployed.map(dep => {
          const ret = returnForm.itemsToReturn[dep.itemId];
          if (ret) {
            const returnedTotal = ret.returnedQty + ret.damagedQty;
            return { ...dep, qty: Math.max(0, dep.qty - returnedTotal) };
          }
          return dep;
        }).filter(dep => dep.qty > 0);

        return {
          ...e,
          itemsDeployed: newDeployed,
          status: newDeployed.length === 0 ? 'COMPLETED_RETURNED' : 'ACTIVE_DISPATCHED'
        };
      }
      return e;
    });

    setInventory(updatedInventory);
    setEvents(updatedEvents);
    setReturnForm({ eventId: '', itemsToReturn: {}, afterPhotos: {} });
    showToast('Stock received IN and verified at Goa Workshop!');
    setActiveTab('dashboard');
  };

  const handleAddNewItem = (e) => {
    e.preventDefault();
    if (!newItem.name) {
      showToast('Item name is required!', 'error');
      return;
    }

    const created = {
      id: `INV-00${inventory.length + 1}`,
      name: newItem.name,
      category: newItem.category,
      total: Number(newItem.total) || 1,
      inWorkshop: Number(newItem.total) || 1,
      outAtEvents: 0,
      damaged: 0,
      unit: newItem.unit || 'pcs',
      minThreshold: Number(newItem.minThreshold) || 5,
      location: newItem.location || 'Unassigned',
      image: newItem.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=80',
      description: newItem.description || 'Event decor equipment',
      beforePhoto: newItem.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=80',
      afterPhoto: null
    };

    setInventory([created, ...inventory]);
    setIsAddItemModalOpen(false);
    setNewItem({ name: '', category: 'staging', total: 10, unit: 'pcs', location: 'Aisle A', minThreshold: 5, image: '', description: '' });
    showToast('New asset added to D M Productions catalog!');
  };

  const exportToCSV = (type = 'inventory') => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    if (type === 'inventory') {
      csvContent += 'Asset ID,Item Name,Category,Total Stock,In Workshop,Out At Events,Damaged,Location\n';
      inventory.forEach(item => {
        csvContent += `"${item.id}","${item.name}","${item.category}",${item.total},${item.inWorkshop},${item.outAtEvents},${item.damaged},"${item.location}"\n`;
      });
    } else if (type === 'events') {
      csvContent += 'Event ID,Event Name,Venue,Start Date,End Date,Status,Deployed Items Count\n';
      events.forEach(evt => {
        const totalDeployed = evt.itemsDeployed.reduce((acc, i) => acc + i.qty, 0);
        csvContent += `"${evt.id}","${evt.name}","${evt.venue}","${evt.startDate}","${evt.endDate}","${evt.status}",${totalDeployed}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DM_Productions_${type}_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Spreadsheet exported: DM_Productions_${type}_report.csv`);
  };

  const sendWhatsAppAlert = () => {
    if (stats.lowStockItems.length === 0) {
      showToast('All workshop stock levels are optimal!', 'info');
      return;
    }

    let text = `🚨 *D M PRODUCTIONS GOA - LOW STOCK ALERT* 🚨\n\nAttention Warehouse Manager,\nThe following items are below minimum workshop threshold:\n\n`;

    stats.lowStockItems.forEach((item, index) => {
      text += `${index + 1}. *${item.name}*\n   - In Workshop: ${item.inWorkshop} ${item.unit} (Min: ${item.minThreshold})\n   - Out at Events: ${item.outAtEvents} ${item.unit}\n\n`;
    });

    text += `Please arrange returns or check event sites immediately.`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  const exportICS = (evt) => {
    const icsData = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//DM Productions Goa//NONSGML Event Inventory//EN
BEGIN:VEVENT
SUMMARY:DM Event: ${evt.name}
DESCRIPTION:Client: ${evt.client} | Venue: ${evt.venue}
LOCATION:${evt.venue}
DTSTART:${evt.startDate.replace(/-/g, '')}
DTEND:${evt.endDate.replace(/-/g, '')}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${evt.name.replace(/\s+/g, '_')}_schedule.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Calendar schedule exported for ${evt.name}!`);
  };

  return (
    <div className="min-h-screen bg-[#14031D] text-slate-100 font-sans flex flex-col md:flex-row antialiased selection:bg-[#E5C158] selection:text-[#14031D]">

      {/* Floating Notification Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all animate-bounce ${
          toast.type === 'error' 
            ? 'bg-rose-950/90 text-rose-200 border-rose-500/50' 
            : 'bg-[#2C0B3A] text-[#F3D068] border-[#E5C158]/50'
        }`}>
          {toast.type === 'error' ? <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" /> : <CheckCircle2 className="w-5 h-5 text-[#E5C158] shrink-0" />}
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      )}

      {/* Photo Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 bg-[#0A0112]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#2C0B3A] border border-[#E5C158]/40 rounded-3xl p-5 max-w-lg w-full space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-4 right-4 text-amber-200/60 hover:text-white p-2 rounded-xl bg-[#14031D]"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-black text-[#F3D068]">{previewPhoto.title}</h3>
            <img src={previewPhoto.url} alt="Inspection Photo" className="w-full h-80 object-cover rounded-2xl border border-[#4A1864]" />
            <p className="text-xs text-amber-200/70">{previewPhoto.note || 'Condition inspection photo recorded for event logs.'}</p>
          </div>
        </div>
      )}

      {/* Sidebar / Navigation Header */}
      <aside className="w-full md:w-80 bg-gradient-to-b from-[#2C0B3A] via-[#1F0829] to-[#14031D] border-b md:border-b-0 md:border-r border-[#4A1864]/60 flex md:flex-col justify-between shrink-0 sticky top-0 z-40 shadow-2xl">
        <div>
          {/* Company Branding Header */}
          <div className="p-5 border-b border-[#4A1864]/60 bg-[#1F0829]/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3D1152] via-[#5A1978] to-[#2C0B3A] border-2 border-[#E5C158] flex items-center justify-center shadow-lg shadow-[#E5C158]/20 shrink-0">
                <svg className="w-7 h-7 text-[#E5C158]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                  <path d="M12 5l1.5 4.5h4.5l-3.5 2.5 1.5 4.5-4-3-4 3 1.5-4.5-3.5-2.5h4.5z" opacity="0.4" />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="font-extrabold text-lg tracking-wider text-[#F3D068] leading-tight truncate">
                  D M PRODUCTIONS
                </h1>
                <p className="text-[10px] text-amber-200/80 font-serif italic tracking-wide truncate">
                  Our Precision, Your Perfect Event
                </p>
                <span className="inline-block px-2 py-0.5 mt-0.5 rounded bg-[#E5C158]/20 text-[#F3D068] text-[9px] font-black uppercase tracking-widest border border-[#E5C158]/30">
                  GOA
                </span>
              </div>
            </div>
          </div>

          {/* User Role Switcher */}
          <div className="p-3 bg-[#14031D] border-b border-[#4A1864]/50">
            <div className="flex bg-[#2C0B3A] p-1 rounded-2xl border border-[#4A1864]">
              <button
                onClick={() => setUserRole('manager')}
                className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  userRole === 'manager'
                    ? 'bg-[#E5C158] text-[#14031D] shadow-md'
                    : 'text-amber-200/60 hover:text-white'
                }`}
              >
                <Shield className="w-3.5 h-3.5" /> Manager
              </button>
              <button
                onClick={() => setUserRole('staff')}
                className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  userRole === 'staff'
                    ? 'bg-[#E5C158] text-[#14031D] shadow-md'
                    : 'text-amber-200/60 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" /> Staff
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 grid grid-cols-5 md:flex md:flex-col gap-1 md:gap-2 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'dispatch', label: 'Dispatch OUT', icon: Truck },
              { id: 'return', label: 'Return IN', icon: RotateCcw },
              { id: 'catalog', label: 'Inventory', icon: Boxes },
              { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col md:flex-row items-center gap-2 md:gap-3 px-2 py-2 md:px-4 md:py-3 rounded-2xl transition-all font-bold text-xs md:text-sm text-left group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#14031D] font-black shadow-lg shadow-[#E5C158]/20'
                      : 'text-amber-100/70 hover:text-white hover:bg-[#3D1152]/40'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#14031D]' : 'text-[#E5C158]'}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* WhatsApp Quick Action Button */}
        <div className="p-4 m-3 rounded-2xl bg-[#14031D] border border-[#4A1864]/60 space-y-2">
          <button
            onClick={sendWhatsAppAlert}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 px-3 rounded-xl text-xs transition-all shadow-lg active:scale-95"
          >
            <MessageSquare className="w-4 h-4" /> WhatsApp Low Stock Alert
          </button>
          <p className="text-[10px] text-amber-200/50 text-center">
            {stats.lowStockItems.length} items currently below minimum threshold
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full">

        {}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#2C0B3A] via-[#3D1152] to-[#1F0829] p-6 rounded-3xl border border-[#E5C158]/30 shadow-2xl relative overflow-hidden">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E5C158]/20 text-[#F3D068] text-[10px] font-black uppercase tracking-wider border border-[#E5C158]/40">
                    Mode: {userRole === 'manager' ? 'Warehouse Manager' : 'Ground Staff'}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                  Warehouse Live Control
                  <Star className="w-6 h-6 text-[#E5C158] fill-[#E5C158]" />
                </h2>
                <p className="text-amber-200/80 mt-1 text-sm">
                  Tracking staging, mandap props, drapes, bars & furniture across Goa event sites.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0">
                <button
                  onClick={() => exportToCSV('inventory')}
                  className="flex items-center gap-1.5 bg-[#14031D] hover:bg-[#2C0B3A] text-[#F3D068] border border-[#E5C158]/40 font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all active:scale-95"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#E5C158]" /> Excel Export
                </button>

                <button
                  onClick={() => setActiveTab('dispatch')}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#14031D] font-black px-5 py-2.5 rounded-xl shadow-lg transition-all text-xs active:scale-95"
                >
                  <Truck className="w-4 h-4" /> Dispatch OUT
                </button>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#2C0B3A] p-5 rounded-3xl border border-[#4A1864] shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-amber-200/70 uppercase">Total Equipment</span>
                  <Boxes className="w-5 h-5 text-[#F3D068]" />
                </div>
                <div className="text-3xl font-black text-white">{stats.totalItemsCount}</div>
                <p className="text-[10px] text-amber-200/50 mt-1">Registered event assets</p>
              </div>

              <div className="bg-[#2C0B3A] p-5 rounded-3xl border border-[#4A1864] shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-emerald-400 uppercase">In Workshop</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-emerald-400">{stats.totalInWorkshop}</div>
                <p className="text-[10px] text-amber-200/50 mt-1">Available for dispatch</p>
              </div>

              <div className="bg-[#2C0B3A] p-5 rounded-3xl border border-[#4A1864] shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-[#F3D068] uppercase">Out at Events</span>
                  <Truck className="w-5 h-5 text-[#F3D068]" />
                </div>
                <div className="text-3xl font-black text-[#F3D068]">{stats.totalOutAtEvents}</div>
                <p className="text-[10px] text-amber-200/50 mt-1">At {stats.activeEventsCount} active Goa venues</p>
              </div>

              <div className="bg-[#2C0B3A] p-5 rounded-3xl border border-[#4A1864] shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-rose-400 uppercase">Damaged / Repair</span>
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                </div>
                <div className="text-3xl font-black text-rose-400">{stats.totalDamaged}</div>
                <p className="text-[10px] text-amber-200/50 mt-1">Requires maintenance</p>
              </div>
            </div>

            {/* Low Stock Warning Banner */}
            {stats.lowStockItems.length > 0 && (
              <div className="bg-gradient-to-r from-rose-950/80 via-[#2C0B3A] to-rose-950/80 p-5 rounded-3xl border border-rose-500/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/40 shrink-0">
                    <AlertTriangle className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-rose-200 text-base">
                      Low Stock Warning ({stats.lowStockItems.length} items below safety limit)
                    </h3>
                    <p className="text-xs text-rose-300/80 mt-0.5">
                      Staging angle plies or velvet rolls are running low in the Goa workshop.
                    </p>
                  </div>
                </div>

                <button
                  onClick={sendWhatsAppAlert}
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4 py-3 rounded-2xl text-xs transition-all shrink-0 active:scale-95 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" /> Send WhatsApp Manager Alert
                </button>
              </div>
            )}

            {/* Quick Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={() => setActiveTab('dispatch')}
                className="bg-gradient-to-br from-[#2C0B3A] via-[#1F0829] to-[#14031D] p-6 rounded-3xl border border-[#E5C158]/40 hover:border-[#E5C158] transition-all cursor-pointer group shadow-2xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#E5C158] text-[#14031D] flex items-center justify-center font-black shadow-lg group-hover:scale-110 transition-transform">
                    <Truck className="w-6 h-6" />
                  </div>
                  <ChevronRight className="w-6 h-6 text-[#E5C158] group-hover:translate-x-2 transition-transform" />
                </div>
                <h3 className="text-xl font-black text-white mb-1">Dispatch OUT to Event Site</h3>
                <p className="text-amber-200/70 text-xs">
                  Assign staging, mandap pillars, drapes or bar structures to trucks heading out.
                </p>
              </div>

              <div 
                onClick={() => setActiveTab('return')}
                className="bg-gradient-to-br from-[#1B2E1E] via-[#122214] to-[#0B170D] p-6 rounded-3xl border border-emerald-500/40 hover:border-emerald-400 transition-all cursor-pointer group shadow-2xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-lg group-hover:scale-110 transition-transform">
                    <RotateCcw className="w-6 h-6" />
                  </div>
                  <ChevronRight className="w-6 h-6 text-emerald-400 group-hover:translate-x-2 transition-transform" />
                </div>
                <h3 className="text-xl font-black text-white mb-1">Receive IN from Event Site</h3>
                <p className="text-emerald-200/70 text-xs">
                  Truck returned? Check items back into workshop and record after-event condition photos.
                </p>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'dispatch' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#2C0B3A] p-6 rounded-3xl border border-[#E5C158]/30">
              <div className="flex items-center gap-2 text-[#F3D068] mb-1 font-black uppercase text-xs">
                <Truck className="w-4 h-4 text-[#E5C158]" /> Dispatch Mode - OUT to Event Site
              </div>
              <h2 className="text-2xl font-black text-white">Select Event & Dispatch Items</h2>
              <p className="text-amber-200/70 text-xs mt-1">
                Use big <strong>+ / -</strong> buttons or quick presets (+1, +5, +10, +50) for fast truck loading.
              </p>
            </div>

            {/* Target Event Selection */}
            <div className="bg-[#2C0B3A] p-6 rounded-3xl border border-[#4A1864] space-y-4">
              <h3 className="text-base font-black text-[#F3D068] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#E5C158] text-[#14031D] flex items-center justify-center text-xs font-black">1</span>
                Event Destination
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-amber-200/70 mb-2 uppercase">Select Existing Event</label>
                  <select
                    value={dispatchForm.eventId}
                    onChange={(e) => setDispatchForm({ ...dispatchForm, eventId: e.target.value, newEventName: '' })}
                    className="w-full bg-[#14031D] border border-[#4A1864] rounded-2xl p-3.5 text-white font-bold focus:border-[#E5C158] outline-none text-sm"
                  >
                    <option value="">-- Choose Existing Goa Event --</option>
                    {events.map(evt => (
                      <option key={evt.id} value={evt.id}>{evt.name} ({evt.venue})</option>
                    ))}
                  </select>
                </div>

                <div className="border-t md:border-t-0 md:border-l border-[#4A1864] pt-4 md:pt-0 md:pl-4">
                  <label className="block text-xs font-bold text-amber-200/70 mb-2 uppercase">OR Create New Goa Event</label>
                  <input
                    type="text"
                    placeholder="E.g. Beachside Sangeet Sunset"
                    value={dispatchForm.newEventName}
                    onChange={(e) => setDispatchForm({ ...dispatchForm, newEventName: e.target.value, eventId: '' })}
                    className="w-full bg-[#14031D] border border-[#4A1864] rounded-2xl p-3 text-white font-bold focus:border-[#E5C158] outline-none text-xs mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Venue / Resort Location"
                    value={dispatchForm.newEventVenue}
                    onChange={(e) => setDispatchForm({ ...dispatchForm, newEventVenue: e.target.value })}
                    className="w-full bg-[#14031D] border border-[#4A1864] rounded-2xl p-2.5 text-white focus:border-[#E5C158] outline-none text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Select Items with Steppers & Photo Inspector */}
            <div className="bg-[#2C0B3A] p-6 rounded-3xl border border-[#4A1864] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-base font-black text-[#F3D068] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#E5C158] text-[#14031D] flex items-center justify-center text-xs font-black">2</span>
                  Select Quantity & Before-Dispatch Inspection Photo
                </h3>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-amber-200/50" />
                  <input
                    type="text"
                    placeholder="Search staging, props, drapes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#14031D] border border-[#4A1864] rounded-2xl pl-9 pr-3 py-2 text-xs text-white focus:border-[#E5C158] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredInventory.map(item => {
                  const currentDispatchQty = dispatchForm.items[item.id] || 0;
                  const isOutOfStock = item.inWorkshop === 0;

                  return (
                    <div 
                      key={item.id} 
                      className={`p-4 rounded-3xl border transition-all flex flex-col justify-between ${
                        currentDispatchQty > 0 
                          ? 'bg-[#3D1152]/80 border-[#E5C158] shadow-xl' 
                          : 'bg-[#14031D] border border-[#3D1152]'
                      }`}
                    >
                      <div className="flex gap-4 items-center mb-3">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-[#4A1864]" />
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-black uppercase tracking-wider text-[#F3D068] bg-[#1F0829] px-2 py-0.5 rounded border border-[#4A1864]">
                            {item.category}
                          </span>
                          <h4 className="font-bold text-sm text-white truncate mt-1">{item.name}</h4>
                          <p className="text-xs text-amber-200/60">{item.location}</p>
                          <p className="text-xs font-bold mt-1 text-emerald-400">
                            In Workshop: <strong className="text-white text-sm">{item.inWorkshop}</strong> {item.unit}
                          </p>
                        </div>
                      </div>

                      {/* Touch Stepper & Photo Inspection */}
                      {isOutOfStock ? (
                        <div className="p-3 rounded-2xl bg-[#1F0829] border border-[#3D1152] text-rose-400 text-xs font-bold text-center">
                          All units currently OUT at events
                        </div>
                      ) : (
                        <div className="space-y-3 pt-2 border-t border-[#3D1152]">
                          <div className="flex items-center justify-between bg-[#14031D] rounded-2xl p-1.5 border border-[#4A1864]">
                            <button
                              type="button"
                              onClick={() => handleDispatchQuantityChange(item.id, -1)}
                              disabled={currentDispatchQty === 0}
                              className="w-12 h-12 rounded-xl bg-[#2C0B3A] hover:bg-[#3D1152] disabled:opacity-30 text-white flex items-center justify-center font-black text-xl active:scale-90"
                            >
                              <Minus className="w-5 h-5" />
                            </button>

                            <div className="text-center">
                              <span className="text-2xl font-black text-[#F3D068]">{currentDispatchQty}</span>
                              <span className="text-[9px] block text-amber-200/60 font-bold uppercase">{item.unit} OUT</span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDispatchQuantityChange(item.id, 1)}
                              disabled={currentDispatchQty >= item.inWorkshop}
                              className="w-12 h-12 rounded-xl bg-[#E5C158] hover:bg-[#D4AF37] disabled:opacity-30 text-[#14031D] flex items-center justify-center font-black text-xl active:scale-90"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Quick Presets */}
                          <div className="flex gap-1.5">
                            {[1, 5, 10, 50].map(val => (
                              <button
                                key={val}
                                type="button"
                                onClick={() => handlePresetDispatch(item.id, val)}
                                disabled={currentDispatchQty + val > item.inWorkshop}
                                className="flex-1 py-1.5 rounded-xl bg-[#1F0829] hover:bg-[#3D1152] disabled:opacity-20 text-xs font-bold text-[#F3D068] border border-[#4A1864]"
                              >
                                +{val}
                              </button>
                            ))}
                          </div>

                          {/* Before Photo Upload simulation */}
                          {currentDispatchQty > 0 && (
                            <div className="flex items-center justify-between bg-[#1F0829] p-2 rounded-xl border border-[#4A1864]">
                              <span className="text-[10px] font-bold text-amber-200/70 flex items-center gap-1">
                                <Camera className="w-3.5 h-3.5 text-[#E5C158]" /> Pre-Dispatch Photo:
                              </span>
                              <button
                                type="button"
                                onClick={() => handlePhotoUpload(item.id, 'dispatch_before', item.image)}
                                className="px-2.5 py-1 bg-[#3D1152] text-[#F3D068] text-[10px] font-black rounded-lg border border-[#E5C158]/40"
                              >
                                {dispatchForm.beforePhotos[item.id] ? 'Photo Logged ✓' : '+ Attach Photo'}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Confirm Dispatch Bar */}
            <div className="sticky bottom-4 z-20">
              <button
                onClick={submitDispatch}
                className="w-full bg-gradient-to-r from-[#E5C158] via-[#F3D068] to-[#D4AF37] text-[#14031D] font-black text-lg py-4 rounded-3xl shadow-2xl shadow-[#E5C158]/30 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-3 border-2 border-[#FFF0AA]"
              >
                <Truck className="w-6 h-6" />
                CONFIRM DISPATCH & RECORD OUT ({Object.keys(dispatchForm.items).length} Items Selected)
              </button>
            </div>
          </div>
        )}

        {}
        {activeTab === 'return' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#2C0B3A] p-6 rounded-3xl border border-emerald-500/30">
              <div className="flex items-center gap-2 text-emerald-400 mb-1 font-black uppercase text-xs">
                <RotateCcw className="w-4 h-4 text-emerald-400" /> Return Mode - IN to Workshop
              </div>
              <h2 className="text-2xl font-black text-white">Receive Truck & Verify Return Condition</h2>
              <p className="text-amber-200/70 text-xs mt-1">
                Verify returning stock, mark good condition vs damaged items, and upload return photos.
              </p>
            </div>

            {/* Active Event Selector */}
            <div className="bg-[#2C0B3A] p-6 rounded-3xl border border-[#4A1864] space-y-4">
              <h3 className="text-base font-black text-emerald-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">1</span>
                Select Returning Event
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.filter(e => e.status === 'ACTIVE_DISPATCHED').map(evt => {
                  const isSelected = returnForm.eventId === evt.id;
                  return (
                    <div
                      key={evt.id}
                      onClick={() => handleSelectEventForReturn(evt.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-500 shadow-xl scale-[1.02]'
                          : 'bg-[#14031D] border border-[#3D1152]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-bold uppercase text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          Active Site
                        </span>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{evt.name}</h4>
                      <p className="text-xs text-amber-200/60 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#E5C158]" /> {evt.venue}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Return Form Item List */}
            {returnForm.eventId && (
              <div className="bg-[#2C0B3A] p-6 rounded-3xl border border-[#4A1864] space-y-6">
                <h3 className="text-base font-black text-emerald-400 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">2</span>
                  Verify Quantities & Attach After-Event Inspection Photo
                </h3>

                <div className="space-y-4">
                  {Object.entries(returnForm.itemsToReturn).map(([itemId, data]) => {
                    const item = inventory.find(i => i.id === itemId);
                    if (!item) return null;

                    return (
                      <div key={itemId} className="p-4 rounded-2xl bg-[#14031D] border border-[#3D1152] flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="flex gap-3 items-center">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-[#4A1864]" />
                          <div>
                            <h4 className="font-bold text-white text-sm">{item.name}</h4>
                            <p className="text-xs text-amber-200/60">Deployed: <strong className="text-[#F3D068]">{data.maxQty} {item.unit}</strong></p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
                          <div className="bg-[#1F0829] p-2.5 rounded-xl border border-emerald-900/50">
                            <label className="block text-[10px] font-bold text-emerald-400 mb-1">Good Condition (IN)</label>
                            <input
                              type="number"
                              min="0"
                              max={data.maxQty}
                              value={data.returnedQty}
                              onChange={(e) => handleReturnItemQtyChange(itemId, 'returnedQty', e.target.value)}
                              className="w-full bg-[#14031D] border border-emerald-700/50 rounded-lg p-2 text-center text-lg font-black text-emerald-400 outline-none"
                            />
                          </div>

                          <div className="bg-[#1F0829] p-2.5 rounded-xl border border-rose-900/50">
                            <label className="block text-[10px] font-bold text-rose-400 mb-1">Damaged / Missing</label>
                            <input
                              type="number"
                              min="0"
                              max={data.maxQty}
                              value={data.damagedQty}
                              onChange={(e) => handleReturnItemQtyChange(itemId, 'damagedQty', e.target.value)}
                              className="w-full bg-[#14031D] border border-rose-700/50 rounded-lg p-2 text-center text-lg font-black text-rose-400 outline-none"
                            />
                          </div>
                        </div>

                        {/* After Photo Inspection */}
                        <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#3D1152]">
                          <button
                            type="button"
                            onClick={() => handlePhotoUpload(itemId, 'return_after', item.image)}
                            className="px-3 py-2 bg-emerald-950 text-emerald-400 text-xs font-bold rounded-xl border border-emerald-800 flex items-center gap-1.5"
                          >
                            <Camera className="w-4 h-4" />
                            {returnForm.afterPhotos[itemId] ? 'After Photo Logged ✓' : 'Add Return Photo'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={submitReturn}
                  className="w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 text-slate-950 font-black text-lg py-4 rounded-3xl shadow-2xl shadow-emerald-500/30 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-3 border-2 border-emerald-300"
                >
                  <RotateCcw className="w-6 h-6" />
                  CONFIRM RECEIPT IN GOA WORKSHOP
                </button>
              </div>
            )}
          </div>
        )}

        {}
        {activeTab === 'catalog' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#2C0B3A] p-6 rounded-3xl border border-[#4A1864]">
              <div>
                <h2 className="text-2xl font-black text-white">D M Productions Catalog</h2>
                <p className="text-amber-200/70 text-xs mt-1">Staging & trusses, wedding decor, fabrics, bar structures, detailing & furniture.</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => exportToCSV('inventory')}
                  className="flex items-center gap-1.5 bg-[#14031D] hover:bg-[#2C0B3A] text-[#F3D068] border border-[#E5C158]/40 font-bold px-4 py-2.5 rounded-xl text-xs transition-all"
                >
                  <Download className="w-4 h-4 text-[#E5C158]" /> CSV Report
                </button>

                {userRole === 'manager' && (
                  <button
                    onClick={() => setIsAddItemModalOpen(true)}
                    className="flex items-center gap-2 bg-[#E5C158] hover:bg-[#D4AF37] text-[#14031D] font-black px-4 py-2.5 rounded-xl shadow-lg transition-all text-xs active:scale-95"
                  >
                    <Plus className="w-4 h-4" /> Add New Asset
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#14031D] border-[#E5C158] font-black shadow-lg'
                        : 'bg-[#2C0B3A] text-amber-100/70 border-[#4A1864] hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-3.5 text-amber-200/50" />
              <input
                type="text"
                placeholder="Search staging, mandaps, chandeliers, velvet rolls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#2C0B3A] border border-[#4A1864] rounded-2xl pl-11 pr-4 py-3 text-white text-xs focus:border-[#E5C158] outline-none"
              />
            </div>

            {/* Catalog Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInventory.map(item => (
                <div 
                  key={item.id} 
                  className="bg-[#2C0B3A] rounded-3xl border border-[#4A1864] overflow-hidden hover:border-[#E5C158]/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-[#14031D]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-[#14031D]/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-[#4A1864]">
                        {item.id}
                      </div>

                      {/* Low Stock Badge */}
                      {item.inWorkshop <= item.minThreshold && (
                        <div className="absolute top-3 right-3 bg-rose-600/90 text-white text-[9px] font-black px-2 py-1 rounded border border-rose-400 flex items-center gap-1 animate-pulse">
                          <AlertTriangle className="w-3 h-3" /> LOW STOCK ({item.inWorkshop})
                        </div>
                      )}
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="text-[9px] font-black uppercase text-[#F3D068] bg-[#1F0829] px-2 py-0.5 rounded border border-[#4A1864]">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold text-white leading-snug">{item.name}</h3>
                      <p className="text-xs text-amber-200/60 line-clamp-2">{item.description}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#14031D] border-t border-[#3D1152] space-y-3">
                    <div className="grid grid-cols-3 text-center gap-1 text-xs">
                      <div className="bg-[#1F0829] p-2 rounded-xl border border-[#3D1152]">
                        <span className="block text-[9px] text-amber-200/60 font-bold">TOTAL</span>
                        <span className="font-bold text-white">{item.total}</span>
                      </div>
                      <div className="bg-emerald-950/40 p-2 rounded-xl border border-emerald-900/40">
                        <span className="block text-[9px] text-emerald-400 font-bold">WORKSHOP</span>
                        <span className="font-bold text-emerald-400">{item.inWorkshop}</span>
                      </div>
                      <div className="bg-[#E5C158]/10 p-2 rounded-xl border border-[#E5C158]/30">
                        <span className="block text-[9px] text-[#F3D068] font-bold">EVENTS</span>
                        <span className="font-bold text-[#F3D068]">{item.outAtEvents}</span>
                      </div>
                    </div>

                    {/* Inspection Photo Buttons */}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setPreviewPhoto({ title: `${item.name} - Pre-Dispatch Condition`, url: item.beforePhoto, note: 'Photo taken prior to truck loading.' })}
                        className="flex-1 py-1.5 bg-[#2C0B3A] text-amber-200 text-[10px] font-bold rounded-lg border border-[#4A1864] flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3 h-3 text-[#E5C158]" /> Pre-Photo
                      </button>
                      <button
                        onClick={() => setPreviewPhoto({ title: `${item.name} - Post-Return Condition`, url: item.afterPhoto || item.image, note: item.afterPhoto ? 'Photo taken upon return check-in.' : 'No return damage reported.' })}
                        className="flex-1 py-1.5 bg-[#2C0B3A] text-amber-200 text-[10px] font-bold rounded-lg border border-[#4A1864] flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3 h-3 text-emerald-400" /> Post-Photo
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {}
        {activeTab === 'calendar' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#2C0B3A] p-6 rounded-3xl border border-[#4A1864]">
              <div>
                <h2 className="text-2xl font-black text-white">Events & Delivery Timeline</h2>
                <p className="text-amber-200/70 text-xs mt-1">Schedule of setup, event duration, tear-down and equipment returns across Goa.</p>
              </div>

              <button
                onClick={() => exportToCSV('events')}
                className="flex items-center gap-1.5 bg-[#14031D] hover:bg-[#2C0B3A] text-[#F3D068] border border-[#E5C158]/40 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shrink-0"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#E5C158]" /> Export Schedule CSV
              </button>
            </div>

            <div className="space-y-4">
              {events.map(evt => (
                <div key={evt.id} className="bg-[#2C0B3A] rounded-3xl border border-[#4A1864] p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3D1152] pb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                          evt.status === 'ACTIVE_DISPATCHED' 
                            ? 'bg-[#E5C158]/20 text-[#F3D068] border border-[#E5C158]/40' 
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        }`}>
                          {evt.status === 'ACTIVE_DISPATCHED' ? 'Live On Site' : 'Planned'}
                        </span>
                        <span className="text-xs text-amber-200/50">{evt.id}</span>
                      </div>
                      <h3 className="text-lg font-black text-white">{evt.name}</h3>
                      <p className="text-xs text-amber-200/70 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#E5C158]" /> {evt.venue}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2">
                      <div className="text-xs text-amber-200/80 flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5 text-[#E5C158]" /> {evt.startDate} to {evt.endDate}
                      </div>
                      <button
                        onClick={() => exportICS(evt)}
                        className="px-3 py-1.5 bg-[#14031D] text-[#F3D068] text-xs font-bold rounded-xl border border-[#E5C158]/40 flex items-center gap-1.5 w-fit"
                      >
                        <CalendarIcon className="w-3.5 h-3.5 text-[#E5C158]" /> Sync to iCal / Google
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-amber-200/70 uppercase mb-2">Equipment Deployed on Site:</h4>
                    {evt.itemsDeployed.length === 0 ? (
                      <p className="text-amber-200/40 text-xs italic">No items assigned yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {evt.itemsDeployed.map(dep => {
                          const item = inventory.find(i => i.id === dep.itemId);
                          if (!item) return null;
                          return (
                            <div key={dep.itemId} className="p-3 bg-[#14031D] rounded-2xl border border-[#3D1152] flex items-center gap-3">
                              <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover shrink-0 border border-[#4A1864]" />
                              <div className="min-w-0">
                                <h5 className="font-bold text-white text-xs truncate">{item.name}</h5>
                                <span className="text-[#F3D068] font-black text-xs">{dep.qty} {item.unit}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {}
        {isAddItemModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#0A0112]/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#2C0B3A] border border-[#4A1864] rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative">
              <button 
                onClick={() => setIsAddItemModalOpen(false)}
                className="absolute top-5 right-5 text-amber-200/60 hover:text-white p-2 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-black text-white">Add New Inventory Asset</h3>

              <form onSubmit={handleAddNewItem} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-amber-200/70 mb-1">Asset Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Heavy Duty Wooden Stage Section"
                    value={newItem.name}
                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full bg-[#14031D] border border-[#4A1864] rounded-xl p-2.5 text-xs text-white focus:border-[#E5C158] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-amber-200/70 mb-1">Category</label>
                    <select
                      value={newItem.category}
                      onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                      className="w-full bg-[#14031D] border border-[#4A1864] rounded-xl p-2.5 text-xs text-white focus:border-[#E5C158] outline-none"
                    >
                      <option value="staging">Staging & Trusses</option>
                      <option value="wedding">Wedding Decor</option>
                      <option value="fabrics">Fabrics & Drapes</option>
                      <option value="bar">Bar Structures</option>
                      <option value="furniture">Furniture</option>
                      <option value="detailing">Detailing Props</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-200/70 mb-1">Total Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={newItem.total}
                      onChange={e => setNewItem({ ...newItem, total: e.target.value })}
                      className="w-full bg-[#14031D] border border-[#4A1864] rounded-xl p-2.5 text-xs text-white focus:border-[#E5C158] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-amber-200/70 mb-1">Unit (pcs, rolls, sets)</label>
                    <input
                      type="text"
                      value={newItem.unit}
                      onChange={e => setNewItem({ ...newItem, unit: e.target.value })}
                      className="w-full bg-[#14031D] border border-[#4A1864] rounded-xl p-2.5 text-xs text-white focus:border-[#E5C158] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-amber-200/70 mb-1">Low Stock Limit</label>
                    <input
                      type="number"
                      value={newItem.minThreshold}
                      onChange={e => setNewItem({ ...newItem, minThreshold: e.target.value })}
                      className="w-full bg-[#14031D] border border-[#4A1864] rounded-xl p-2.5 text-xs text-white focus:border-[#E5C158] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-200/70 mb-1">Workshop Location</label>
                  <input
                    type="text"
                    placeholder="E.g. Aisle A - Rack 2"
                    value={newItem.location}
                    onChange={e => setNewItem({ ...newItem, location: e.target.value })}
                    className="w-full bg-[#14031D] border border-[#4A1864] rounded-xl p-2.5 text-xs text-white focus:border-[#E5C158] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#14031D] font-black py-3 rounded-xl transition-all shadow-lg text-sm"
                >
                  Save Asset to Catalog
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}