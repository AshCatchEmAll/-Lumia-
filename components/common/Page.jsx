import useSWR from 'swr'
function Page ({ index }) {
    const { data } = useSWR(`/api/data?page=${index}`, fetcher);
    
    // ... handle loading and error states
  
    return data.map(item => <div key={item.id}>{item.name}</div>)
  }

export default Page;