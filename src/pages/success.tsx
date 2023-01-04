import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import sendEmail from "../utils/contact-functions/contact-Email";

export default function success () {
    const router = useRouter();
    const session = useSession();
    const { merchant_order_id } = router.query;
    
    if(session.status === "authenticated") {
        let x= 0;

        const values = {
            name: `${session?.data?.user?.name}`,
            email: `${session?.data?.user?.email}`,
            subject: 'Compra realizada',
            message: `El ID de la orden es: #${merchant_order_id}.Ante cualquier duda, contacte con nosotros a traves de nuestro correo electronico: rentalibre2022@gmail.com`
        }
        if(x===0) {
            x++;
            sendEmail(values);
        }
    }
    return(
        <div>
            <h1>{session?.data?.user?.name}.</h1>
            <h1>Su compra ha sido realizada con exito</h1>
            <h2>El ID de la orden es: {merchant_order_id}</h2>
        </div>
    )
}