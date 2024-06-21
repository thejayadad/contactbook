'use server'
import prisma from "../prisma"

export const getContacts = async (query) => {
    try {
        const contacts = await prisma.contact.findMany({
          where: {
            OR: [
              { name: { contains: query } },
              { email: { contains: query } },
              { phone: { contains: query } }
            ]
          }
        });
        return contacts;
      } catch (error) {
        console.error("Error fetching contacts:", error);
        return [];
      }
}