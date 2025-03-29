import Statics from "@/components/Statics"
import ListTask from "./components/ListTask"
import CreateTaskModal from "./components/CreateTaskModal"

export default function App() {
  return (
    <div className="relative w-full h-screen">
      <div
        className={`bg-[url('./assets/images/grid-background.jpg')] 
         w-auto h-full bg-center bg-no-repeat bg-cover py-5`}>
        <div className="h-full flex items-center justify-center">
          <div className="min-w-[370px] h-full bg-gray-50 rounded-lg">
            <h1 className="text-3xl text-center font-bold py-4">Todo List</h1>
            <Statics />
            <ListTask />
            <CreateTaskModal />
          </div>
        </div>
      </div>
    </div>
  )
}
