import React, { useEffect, useState } from "react"
import { Form, Button, Input, Label } from "reactstrap"
import { toastr } from "react-redux-toastr"
import { useHistory } from "react-router-dom"

const FormData = () => {
  const history = useHistory()

  const [formData, setFormData] = useState({
    dropdown: "Venky",
    radiobutton: "male",
  })

  const changeHandler = (e) => {
    // e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  console.log(formData)

  const submitHandler = (e) => {
    e.preventDefault()
    //  toastr.success("Registeration Successful")
    toastr.confirm("Are you Sure?", {
      onOk: () => {
        toastr.success("Registeration Successful")
        history.push("/dashboard")
      },
      onCancel: () => toastr.error("Registeration cancelled"),
    })

    console.log(formData)
  }
  return (
    <div>
      <Form onSubmit={(e) => submitHandler(e)}>
        <select name='dropdown' onChange={(e) => changeHandler(e)}>
          <option value='venky'>Venky</option>
          <option value='sugu'>Sugu</option>
          <option value='rami'>Rami</option>
        </select>
        <div>
          <Label className='px-3'>Gender: </Label>
          <Label className='px-3'>Male: </Label>
          <Input
            type='radio'
            name='radiobutton'
            value='male'
            defaultChecked
            onChange={(e) => changeHandler(e)}
          ></Input>
          <Label>Female: </Label>
          <Input
            type='radio'
            name='radiobutton'
            value='female'
            onChange={(e) => changeHandler(e)}
          ></Input>
          <Button type='submit'>Register</Button>
        </div>
      </Form>
    </div>
  )
}

export default FormData
