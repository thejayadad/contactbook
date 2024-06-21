'use server'
import prisma from "../prisma"
export async function deleteContact(eventData){
    try {
        const id = eventData
        const deleteCon = await prisma.contact.delete({
            where: {
                id: id
            }
        })
        return deleteCon
    } catch (error) {
        console.log("Error " + error)
    }

}