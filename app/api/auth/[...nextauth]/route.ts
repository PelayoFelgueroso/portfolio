import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // ajusta la ruta según tu estructura

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
