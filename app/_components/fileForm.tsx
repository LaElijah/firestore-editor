
"use client"


import {
  Button,
  Textarea,
  TextInput,
  FileInput
} from "@mantine/core"

import { DateInput } from '@mantine/dates';
import { useReducer } from "react"
import MultiSelect from "./multiSelect";
import styles from "@/app/_styles/components/fileForm.module.scss"

export default function FileForm() {


  type Author = {
    name: string;
    imageUrl: string;
  }

  interface BlogData {
    title: string;
    date: string;
    description: string;
    category: string | string[];
    tags: string | string[];
    author: Author;
    _id: string; // TODO: Change to force to use _id it should expect it
    media?: string;
  }

  const reducer = (state: any, dispatch: any) => {
    switch (dispatch.type) {
      case "set": return { ...state, [dispatch.payload.name]: dispatch.payload.value }
      case "reset": return {}
      default: console.log(state)
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    title: "",
    date: new Date(),
    description: "",
    categories: [],
    tags: [],
    file: null,

  })


  const {
    title,
    date,
    description,
    categories,
    file,
    tags
  } = state



  

  const handleSubmit = async () => {
    const { file, ...rest} = state

    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        metadata: rest, 
        file: Buffer.from(await file.arrayBuffer())
      })
    })
    const data = await response.json()
    console.log(data)
  }


  return (
    <section className={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChange={(event) => dispatch(
          {
            type: "set",
            payload: {
              name: "title",
              value: event.target.value
            }
          }
        )} />

      <DateInput
        label="Date"
        value={date}
        onChange={(event) => dispatch(
          {
            type: "set",
            payload: {
              name: "date",
              value: event
            }
          }
        )} />

      <Textarea
        label="Description"
        autosize={false}
        minRows={4}
        value={description}
        onChange={(event) => dispatch(
          {
            type: "set",
            payload: {
              name: "description",
              value: event.target.value
            }
          }
        )} />

      <MultiSelect
        label="Categories"
        onChange={(categories) => dispatch(
          {
            type: "set",
            payload: {
              name: "categories", value: categories
            }
          }
        )}
        options={
          [
            {
              label: "test",
              group: "testGroup"
            }
          ]
        }
      />

      <MultiSelect
        label="Tags"
        onChange={(tags) => dispatch(
          {
            type: "set",
            payload: {
              name: "tags", value: tags
            }
          }
        )}
        options={
          [
            {
              label: "test",
              group: "testGroup"
            }
          ]
        }
      />

      <FileInput
        label="Text file"
        accept="text/markdown, text/plain"
        value={file}
        onChange={(event) => dispatch(
          {
            type: "set",
            payload: {
              name: "file", value: event
            }
          }
        )}
      />

      <Button onClick={handleSubmit}>Submit</Button>

    </section>
  )

}

