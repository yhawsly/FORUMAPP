function Booklist(){
    return(
        <section className="booklist">
            {Book.map((Book)=>{
                const{img,title,author,id} = Book;
                return <Book img={img} title={title} author={author}/>;
            })}
            
        </section>   
    )
}







const Book =()=>{
    return(
        <article>
            <Image/>
            <Title/>
            <Author/>
        </article>
    );
}

const Image= ()=><img src='https://i.imgur.com/yXOvdOSs.jpg' alt='image'/>
const Title =()=> {
    return(
        <h2>Hitman</h2>
    );
}
const Author = () => <h3>Dramani</h3>