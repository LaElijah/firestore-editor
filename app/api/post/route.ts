import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/app/_utils/models/models"
import { FireStoreClient } from "firestore-client"



export async function POST(req: NextRequest, res: NextResponse) { 
    const client = new FireStoreClient({
        bucket: process.env.AWS_BUCKET || "",
        options: {
            region: process.env.AWS_REGION || "",
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
        } 
    })
    

    const form = await req.json()
    // create read stream this
    console.log(form.file)
   
   
    const response = await client.store('wowser', form.file)


    // const file = form.get('file')
    // const metadata = form.get('metadata')

    // console.log(file)
    // console.log(form)


    // const body = {
    //     ...metadata,
    //     file: file
    // }

    

    // const document = new Post({...body})
    // console.log(document)





    return NextResponse.json(
        {
            status: "success",
            message: ""
        }
    )
}