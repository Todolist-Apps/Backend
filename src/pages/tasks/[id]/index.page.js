import { useEffect, useState } from "react";
import { editTask, getTaskDetail } from "@/modules/fetch/tasks";
import { Box, Button, Center, CircularProgress, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function getTaskByid({id}) {
  const router = useRouter();
    const [task, setTask] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [title, setTitle]= useState("");

    const fetchTask = async () => {
        const data = await getTaskDetail(id);
        setTask(data);
        setTitle(data.title)
        setLoading(false);
    };


    useEffect(() => {
        setLoading(true);
        fetchTask();
    }, []);

    if (isLoading) {
      return (
        <>
          <CircularProgress isIndeterminate color="green.300" />
        </>
      );
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const payload = {
        title,
      };
  
      await editTask(id, payload);
      fetchTask();
    };

    return(
      <>
       <Center h="100vh" bg="gray.100">
        <Stack>
          <Stack mx={12}>
            <Heading fontSize={"4xl"} textAlign={"center"} mb={4}>
              Edit Your Task
            </Heading>
          </Stack>
          <Box rounded={"xl"} boxShadow={"lg"} p={8} bg={"#fefefe"}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input name="title" defaultValue={task.data.title} onChange={(e) => setTitle(e.target.value)} />
              </FormControl>
              <Stack spacing={4} direction={["column", "row"]}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500"
                  }}
                  type="submit"
                  w="full"
                  onClick={handleSubmit}
                >
                  Update
                </Button>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  _hover={{
                    bg: "red.500"
                  }}
                  w="full"
                  onClick={() => router.push(`/`)}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Center>
      </>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;
    return {
      props: {
        id
      }
    };
  }