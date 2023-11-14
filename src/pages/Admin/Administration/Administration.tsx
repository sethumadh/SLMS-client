import { useEffect, useState } from "react"
// import axios from "axios"

// create a new term

function Administration() {
  const [isMounted, setIsMounted] = useState(false)
  const controller = new AbortController()
  useEffect(() => {
    setIsMounted(true)
    const fetchStudents = async () => {
      if (isMounted) {
        console.log(isMounted)
      }
    }
    fetchStudents()
    return () => {
      setIsMounted(false)
      controller.abort()
    }
  }, [isMounted])
  return <div className="container bg-red-400">Administration</div>
}

export default Administration
