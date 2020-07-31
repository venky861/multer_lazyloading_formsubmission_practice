import React from "react"
import { Button } from "reactstrap"
import { toastr } from "react-redux-toastr"

const CheckToastr = () => {
  const toastHandlerAdding = () => {
    toastr.success("done bro", "form submitted")
  }

  const toastHandlerRemoving = () => {
    toastr.removeByType("form submitted")
  }

  const toastOptions = {
    onOk: () => toastr.success("form submitted"),
    onCancel: () => toastr.error("form cancelled"),
  }
  const toastHandlerConfirm = () => {
    toastr.confirm("Are you sure", toastOptions)
  }

  const toastOptionsError = {
    timeOut: 3000, // by setting to 0 it will prevent the auto close
    icon: <i class='fa fa-car'></i>,
    className: "front-toastr front-toastr-error",
    position: "top-center",
    autoClose: false,
    transitionIn: "bounceIn",
    transitionOut: "bounceOut",
    showCloseButton: true,
    closeOnToastrClick: true,
  }

  const toastError = () => {
    toastr.error("Error", "Please enter your name", toastOptionsError)
  }

  return (
    <div>
      <i className='far fa-frown'></i>

      <Button onClick={toastHandlerAdding}>Add Toaster</Button>
      <Button onClick={toastHandlerRemoving}>Remove Toaster</Button>
      <Button onClick={toastHandlerConfirm}>Confirm Message</Button>
      <Button onClick={toastError}>Error Button</Button>
    </div>
  )
}

export default CheckToastr
