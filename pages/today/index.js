import { Fragment } from "react";
import TodoList from '../../components/TodoList'
import { MongoClient } from "mongodb";

function Today(props) {   

    return (
        <Fragment>
            <TodoList tasks={props.tasks}/>
        </Fragment>
    );
}
export async function getServerSideProps() {
    const client = await MongoClient.connect(
      "mongodb+srv://RaniyaRasheed:Raniya12345678@cluster0.8qy45.mongodb.net/Todos?retryWrites=true&w=majority"
    );
    const db = client.db();
    const tasksCollection = db.collection("Todos");
  
    const tasks = await tasksCollection.find().toArray();
    client.close();
  
    return {
      props: {
        tasks: tasks.map((task) => ({
          id: task._id.toString(),
          text: task.text,
          status: task.status,
        })),
      },
    };
}

export default Today; 