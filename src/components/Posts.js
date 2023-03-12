import {useEffect, useState} from "react";
import Post from "./Post";

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(API_URL);
                const json = await response.json();
                setPosts(json);
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        }

        fetchData();
    }, [])

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    return (
        <>
            <h1>Posts</h1>
            <hr/>
            {isLoading
                ?
                <h1>Loading...</h1>
                :
                posts.map((post, index) => <Post {...post} key={post.id}/>)
            }
        </>
    )
}

export default Posts;