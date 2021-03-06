import Head from "next/head";

export default function MetaTags({title,description,image,}) {
    return (
        <Head>
            <meta property="og:title" content ={title}/>
            <meta property="og:description"content={description}/>
            <meta property="og:image"content={image}/>
        </Head>
    );
}