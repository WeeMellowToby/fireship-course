import PostContent from '../../components/PostContent';
import {firestore, postToJSON, getUserWithUsername} from '../../lib/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import styles from '../../styles/Home.module.css';
import HeartButton from '../../components/HeartButton'
import AuthCheck from '../../components/AuthCheck'
import Link from 'next/link';
export async function getStaticProps({params}) {
    const {username, slug} = params;
    const userDoc = await getUserWithUsername(username)
    let post
    let path

    if(!userDoc) {
        return {
            notFound: true,
          };
    }
    if(userDoc) {
        const postRef = userDoc.ref.collection('posts').doc(slug)
        post = postToJSON(await postRef.get())
        
        path = postRef.path
    }
        return {
            props: {post, path},
            revalidate: 5000,
        }
    
}
export async function getStaticPaths() {
    const snapshot = await firestore.collectionGroup('posts').get()
    const paths = snapshot.docs.map((doc) => {
        const {slug, username} = doc.data()
        return {
            params: {username, slug}
        }
    })
    return {
        paths,
        fallback: 'blocking',
    }

}
export default function Post (props) { 
    const postRef = firestore.doc(props.path)
    const [realtimePost] = useDocumentData(postRef)
    const post = realtimePost || props.post;
    return (
        <main className={styles.container}>
            <section>
                <PostContent post={post}/>
            </section>
            <aside className='card'>
                <p>
                    <strong>{post.heartCount} 💖</strong>
                </p>
                <AuthCheck fallback ={
                    <Link href="/enter">
                        <button>Sign Up</button>
                    </Link>
                }>
                    <HeartButton postRef={postRef}/>
                </AuthCheck>
            </aside>
        </main>
    )
}