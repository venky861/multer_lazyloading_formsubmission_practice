import React, { useState, useEffect } from "react"
import axios from "axios"

const Image = () => {
  const [imgdb, setImgDb] = useState("")
  const [img, setImg] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")

  // useEffect(() => {
  //   const backend = async () => {
  //     const res = await axios.get("/dbimg")
  //     setImgDb(res.data)
  //     console.log(res.data)
  //   }

  //   backend()
  // }, [img])

  const changeHandler = (e) => {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      setImg(file)
      setPreviewUrl(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      //   const res = await axios.post("/reactimg", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   })
      const formData = new FormData()
      formData.append("myImage", img)
      //  formData.append('email' , formData.email)
      //  formData.append('password' , formData.password)

      let res = await axios.post("/reactimg", formData)

      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <p className='text-primary'>Select a image</p>
      <form onSubmit={submitHandler}>
        {" "}
        {previewUrl && (
          <img
            className='w-25 h-25 img-thumbnail rounded-circle p-0'
            src={previewUrl}
          />
        )}
        <input
          type='file'
          name='myImg'
          accept='gif, .jpg, .png'
          onChange={(e) => changeHandler(e)}
        />
        <img src={imgdb} className='rounded-circle img-thumbnail img-fluid' />
        <button type='submit'>Add image</button>
      </form>
    </div>
  )
}

export default Image
