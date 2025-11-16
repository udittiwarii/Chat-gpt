import OrbLoader from './Components/Loader'
import { useUser } from './Context/UserContext'
import Approuter from './Router/Approuter'

const App = () => {
  const { loading } = useUser()
  if (loading) {
    return <OrbLoader/>
  }
  return (
    <Approuter />
  )
}

export default App