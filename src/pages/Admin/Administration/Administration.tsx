import { useEffect, useState } from "react"
import axios from "axios"


function Administration() {
  const [isMounted, setIsMounted] = useState(false)
  const controller = new AbortController()
  useEffect(() => {
    setIsMounted(true)
    const fetchStudents = async () => {
      if (isMounted) {
        try {
          const data = await axios.get(
            "http://localhost:1337/api/v1/student/application/get",
            {
              signal: controller.signal,
            }
          )
          console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchStudents()
    return () => {
      setIsMounted(false)
      controller.abort()
    }
  }, [isMounted])
  return <div>Administration</div>
}

export default Administration
