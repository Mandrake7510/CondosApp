export interface User {
    id: string;
    name: string;
    email: string;
    unit: string;
    role: 'resident' | 'admin' | 'security';
}

export interface Payment {
    id: string;
    amount: number;
    description: string;
    dueDate: Date;
    status: 'pending' | 'paid' | 'overdue';
    proofOfPayment?: string;
}

export interface AccountStatement {
    id: string;
    month: string;
    year: number;
    balance: number;
    previousBalance: number;
    charges: Payment[];
    payments: Payment[];
}

export interface Amenity {
    id: string;
    name: string;
    description: string;
    capacity: number;
    pricePerHour: number;
    available: boolean;
}

export interface CalendarEvent {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    type: 'maintenance' | 'event' | 'meeting' | 'amenity';
    location?: string;
}

export interface Vote {
    id: string;
    title: string;
    description: string;
    options: VoteOption[];
    startDate: Date;
    endDate: Date;
    status: 'active' | 'closed';
}

export interface VoteOption {
    id: string;
    text: string;
    votes: number;
}

export interface UserVote {
    userId: string;
    voteId: string;
    optionId: string;
    timestamp: Date;
}

export interface Reservation {
    id: string;
    amenityId: string;
    userId: string;
    date: Date;
    startTime: string;
    endTime: string;
    status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Visitor {
    id: string;
    name: string;
    residentId: string;
    validFrom: Date;
    validUntil: Date;
    qrCode: string;
}

export interface ChatMessage {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: Date;
    read: boolean;
}
