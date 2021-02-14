import {Request, Response } from "express";
import { getRepository } from "typeorm";
import { Invitee } from "../entity/Invitee";

export const getAllInvitees = async(_: Request, res: Response) => {
    const inviteeRepository = await getRepository(Invitee);
    try {
        const invitees = await inviteeRepository.find();

        res.send({
            data: invitees,
        });
    } catch (e) {
        console.error(e);
        res.status(400).send({
            status: "Internal Error!",
        });
    }


};

export const createInvitee = async(req: Request, res: Response) => {
    const { firstname, lastname, email} = req.body;
    const inviteeRepository = await getRepository(Invitee);
    const invitee = new Invitee();
    try {
        invitee.firstName = firstname;
        invitee.lastName = lastname;
        invitee.email = email;

        const createdInvitee = await inviteeRepository.save(invitee);
        res.send({
            data: createdInvitee,
        });

    } catch (e) {
        console.error(e);
        res.status(400).send({
            message: 'Something went wrong. Could not create invitee!',
        });
        
    };

}

export const deleteInviteeById = async(req: Request, res: Response) => {
    const inviteeRepository = await getRepository(Invitee);
    const inviteeId = req.params.inviteeId;

    try {
        const invitee = await inviteeRepository.findOneOrFail(inviteeId);
        await inviteeRepository.remove(invitee);
        res.send({
            message: `Invitee with Id ${inviteeId} was successfully deleted.`,
        });


    } catch (e) {
        console.error(e);
        res.status(400).send({
            status: "No Invitee with such Id was found!",
        });
    };
}

export const patchInviteeById = async(req: Request, res: Response) => {
    const inviteeRepository = await getRepository(Invitee);
    const inviteeId = req.params.inviteeId;
    const { firstname, lastname, email} = req.body;


    try {
        const invitee = await inviteeRepository.findOneOrFail(inviteeId);
        invitee.firstName = firstname;
        invitee.lastName = lastname;
        invitee.email = email;

        // Object.assign(oldInvitee, newInvitee);  //dont know why but wont work// so commented out
        const updatedInvitee = await inviteeRepository.save(invitee);
        //vielleicht überflüssig
        // let correctDataOutput = new Invitee();
        // correctDataOutput = await inviteeRepository.findOneOrFail(inviteeId);
        console.log("patch Invitee was successfully.")

        res.send({
            data: updatedInvitee,
        });


    } catch (e) {
        console.error(e);
        res.status(400).send({
            status: "Internal Error",
        });
    }
}
