
import { useEffect } from 'react';
import useSWR from 'swr'

function Page () {

      // const fetcher = (...args) => fetch(...args).then(res => res.json())
      // const { data } = useSWR(`/api/home/posts?page=${pageIndex}`, fetcher);
      // console.log("Data recieves : " , data);
  const data = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod'
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet',
      body: "consectetur adipiscing elit. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euismod consectetur nisi nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl aliquet nisi, euism",
    }
  ]
      
    // ... handle loading and error states
  
    return data.map(item => <div key={item.id}>{item.title}</div>)
  }
  
 


  export default Page;