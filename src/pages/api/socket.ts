import { initSocket } from "@/lib/socket";

export default function handler(req: any, res: any) {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.io...");
    initSocket(res.socket.server);
  }
  res.end();
}
