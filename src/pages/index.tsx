import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import BookItem from "@/components/book-item";
import {InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// SSR 방식
// export const getServerSideProps = async () => {

//   const [allBooks, randomBooks] = await Promise.all(
//     [fetchBooks(), fetchRandomBooks()]
//   ) // 병렬적으로 동시에 작동

//   return {
//     props : {
//       allBooks,
//       randomBooks
//     }
//   }
// };

// 인덱스 페이지 요청 -> 아래 Home (page) 컴포넌트보다 먼저 실행 

// SSG 방식 
export const getStaticProps = async () => {
    const [allBooks, randomBooks] = await Promise.all(
    [fetchBooks(), fetchRandomBooks()]
  ) 

  return {
    props : {
      allBooks,
      randomBooks
    }
  }
}


export default function Home({allBooks,randomBooks} : InferGetStaticPropsType<typeof getStaticProps>) {

  return (
   <div className={style.container}>
    <section>
      <h3>지금 추천하는 도서 </h3>
      {randomBooks.map((book)=> <BookItem key={book.id} {...book}/>)}
    </section>
    <section>
      <h3>등록된 모든 도서</h3>
      {allBooks.map((book)=> <BookItem key={book.id} {...book}/>)}
    </section>
   </div>
  );
}

Home.getLayout = (page : React.ReactNode,
) => {
  return <SearchableLayout>{page}</SearchableLayout>
}