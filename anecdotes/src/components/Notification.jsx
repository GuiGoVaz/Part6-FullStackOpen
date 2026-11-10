import { useNotification } from "./storeNotification"

const Notification = () => {
  const notification = useNotification()
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  if (notification !== "") {
    return (
      <div style={style} data-testid="notification">
        {notification}
      </div>
    )
  }

  return


}

export default Notification
