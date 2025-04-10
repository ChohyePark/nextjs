import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
// import { GetServerSidePropsContext, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { useEffect, useState } from "react";
import { BookData } from "@/types";
import { useRouter } from "next/router";


// SSR 방식
// export const getServerSideProps = async (context : GetServerSidePropsContext) => {

//   const q = context.query.q;
//   const books = await fetchBooks(q as string);

//   return {
//     props : {
//       books,
//     },
//   };
// }



export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q as string;

  // 비동기 함수
  const fetchSearchResult = async () => {
    const data = await fetchBooks(q);
    setBooks(data);
  }

  useEffect(()=>{
    if(q) {
      fetchSearchResult();
    }
  },[q])

  return (
    <div>
      {
        books.map((book)=> (<BookItem key={book.id} {...book}/>))
      }
    </div>
  );
}

Page.getLayout = (page : React.ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
}