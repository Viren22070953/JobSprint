import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import BackgroundEffect from "./components/background/BackgroundEffect.jsx"

function App() {

  return (
    <AuthProvider>
      <InterviewProvider>
        <BackgroundEffect />
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
