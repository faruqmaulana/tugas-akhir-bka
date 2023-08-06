type SessionType = {
  user: {
    userId: string;
    role: "MAHASISWA" | "ADMIN";
  };
  expires: string;
} | null;

export type { SessionType };
