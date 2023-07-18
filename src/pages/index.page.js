import {
  Box,
  Button,
  CircularProgress,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  List,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { getAllTask, createNewTask, deleteTaskById, } from "@/modules/fetch/tasks";
import Link from "next/link";

function Home({ }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchTaks = async () => {
    const data = await getAllTask();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchTaks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    await deleteTaskById(taskId);
    fetchTaks();
  };

  const FormComment = () => {
    const [title, setTitle] = useState("");

    const handleAddComment = async () => {
      const data = {
        title,
      };
      await createNewTask(data);
      fetchTaks();
    };
    return (
      <>
        <HStack>
          <Input mb={2} placeholder="insert comment" onChange={(e) => setTitle(e.target.value)} />
          <Button onClick={handleAddComment}>add comment</Button>
        </HStack>
      </>
    );
  };

  return (
    <>
      {isLoading ? (
        <Flex height="full" width="full" align="center">
          <CircularProgress isIndeterminate color="green.300" />
        </Flex>
      ) : (
        <>
          <Box p={4}>
            <Heading mb={4}>Todo List</Heading>
            <VStack spacing={4} align="stretch">
              <FormComment />
              <List spacing={2}>
                {tasks.data.map((task, index) => (
                  <ListItem key={index}>
                    <HStack>
                      <Box flex="1">{task.title}</Box>
                      <IconButton
                        onClick={() => handleDeleteTask(task.id)}
                        icon={<DeleteIcon />}
                        variant="outline"
                      />
                      <Link href={`/tasks/${task.id}`}>
                        <IconButton
                          icon={<EditIcon />}
                          variant="outline"
                        />
                      </Link>
                    </HStack>
                  </ListItem>
                ))}
              </List>
            </VStack>
          </Box>
        </>
      )}
    </>
  );
}

export default Home;