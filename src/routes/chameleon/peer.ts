import Peer from 'peerjs';
import { players, gameState } from './stores';

// Define types for clarity
export type Player = {
    id: string;
    name: string;
    isHost: boolean;
};

type GameState = {
    phase: 'lobby' | 'in-progress' | 'voting' | 'results';
    chameleon: string | null;
    word: string | null;
};

// Access DataConnection from PeerJS types directly
type DataConnection = InstanceType<typeof Peer>['connect'] extends (peerId: string) => infer R ? R : never;

type Message =
    | { type: 'updatePlayers'; players: Player[] }
    | { type: 'gameState'; state: GameState }
    | { type: 'custom'; payload: any };

// Peer and connection variables
let peer: Peer | null = null;
let connections: DataConnection[] = [];

/**
 * Initialize PeerJS
 * @param isHostFlag Whether this peer is the host
 */
export function initPeer(isHostFlag: boolean = false): void {
    peer = new Peer();

    peer.on('open', (id: string) => {
        console.log('My peer ID is:', id);
        players.update(p => [...p, { id, name: 'You', isHost: isHostFlag }]);
    });

    peer.on('connection', (conn: DataConnection) => {
        connections.push(conn);
        conn.on('data', handleData);
        conn.on('open', () => {
            console.log('Connected to:', conn.peer);
        });
        conn.on('error', (err: Error) => {
            console.error('Connection Error:', err.message);
        });
    });

    peer.on('error', (err: Error) => {
        console.error('PeerJS Error:', err.message);
    });
}

/**
 * Connect to another peer using their ID
 * @param peerId The ID of the peer to connect to
 */
export function connectToPeer(peerId: string): void {
    if (!peer) {
        console.error('Peer is not initialized');
        return;
    }

    const conn = peer.connect(peerId);

    conn.on('open', () => {
        console.log('Connected to:', peerId);
        connections.push(conn);
    });

    conn.on('data', handleData);

    conn.on('error', (err: Error) => {
        console.error('Connection Error:', err.message);
    });
}

/**
 * Broadcast data to all connected peers
 * @param data The data to send
 */
export function broadcastData(data: Message): void {
    connections.forEach(conn => {
        if (conn.open) {
            conn.send(data);
        }
    });
}

/**
 * Handle incoming data from peers
 * @param data The received data
 */
function handleData(data: unknown): void {
    console.log('Received data:', data);

    // Check if data conforms to Message type
    if (typeof data === 'object' && data !== null) {
        const message = data as Message;

        switch (message.type) {
            case 'updatePlayers':
                players.set(message.players);
                break;
            case 'gameState':
                gameState.set(message.state);
                break;
            case 'custom':
                console.log('Custom message:', message.payload);
                break;
            default:
                console.warn('Unknown message type:', message);
        }
    }
}

/**
 * Get the local peer ID
 * @returns The peer ID, if available
 */
export function getPeerId(): string | null {
    return peer?.id || null;
}

/**
 * Close all peer connections
 */
export function closePeer(): void {
    connections.forEach(conn => conn.close());
    peer?.disconnect();
    peer = null;
    connections = [];
}