'use server'

import prisma from "../prisma"


export async function updateContact(eventData){
    const {id, name, email, phone }= eventData
    try {
        const adjContact = await prisma.contact.update({
            where: {
                id: id
            },
            data: {
                name, email, phone
            }
        })
        return adjContact
    } catch (error) {
        console.log("Error " + error)
    }
}