import CompletedTask from "../../../components/CompletedTask";
import { MongoClient } from "mongodb";
function Completedpage(props) {
    return(
        <CompletedTask tasks={props.tasks}/>
    )
}
export async function getServerSideProps() {
    const client = await MongoClient.connect(
      "mongodb+srv://RaniyaRasheed:Raniya12345678@cluster0.8qy45.mongodb.net/Todos?retryWrites=true&w=majority"
    );
    const db = client.db();
    const tasksCollection = db.collection("Todos");
  
    const tasks = await tasksCollection.find().toArray();
    console.log(tasks)
    const CompletedTasks=tasks.filter((task)=> task.status === 'completed')
    console.log(CompletedTasks)
    client.close();
  
    return {
      props: {
        tasks: CompletedTasks.map((task) => ({
          id: task._id.toString(),
          text: task.text,
          status: task.status,
        })),
      },
    };
}
export default Completedpage;