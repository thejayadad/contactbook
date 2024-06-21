'use server'
import prisma from "../prisma"
export async function addContact(eventData) {
    try {
        const {name, email, phone} = eventData
        const newContact = await prisma.contact.create({
            data: {
                name, email, phone
            }
        })
        return newContact
    } catch (error) {
        console.log("Error " + error)
        throw new Error('Failed to create contact.');

    }

}