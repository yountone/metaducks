import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    // Return a proxy that throws helpful errors at runtime (not build time)
    return new Proxy({} as PrismaClient, {
      get(_target, prop) {
        if (typeof prop === "string" && prop !== "then") {
          return new Proxy(() => {}, {
            get() {
              throw new Error("DATABASE_URL is not configured");
            },
            apply() {
              throw new Error("DATABASE_URL is not configured");
            },
          });
        }
      },
    });
  }
  return new PrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production" && process.env.DATABASE_URL) {
  globalForPrisma.prisma = prisma;
}
