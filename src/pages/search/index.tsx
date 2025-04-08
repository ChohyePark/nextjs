import { useRouter } from "next/router";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";


export const getServerSideProps = async (context : GetServerSidePropsContext) => {

  const q = context.query.q;
  const books = await fetchBooks(q as string);

  return {
    props : {
      books,
    },
  };
}


export default function Page({books} : InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const {q} = router.query;
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