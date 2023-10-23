import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/app/_utils/models/models"
import fs, { ReadStream } from "fs"
import { FireStoreClient } from "firestore-client"
import { Readable, Stream } from "stream";



export async function POST(req: NextRequest, res: NextResponse) { 
    const client = new FireStoreClient({
        bucket: 'blog-container',
        options: {
            region: "us-east-1",
            accessKeyId: 'AKIA4YPJCHN4I42ZLHT4',
            secretAccessKey: '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'
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