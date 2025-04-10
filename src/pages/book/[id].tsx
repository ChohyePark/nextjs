import {  GetStaticPropsContext ,InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";

// SSR 방식
// export const getServerSideProps = async (context : GetServerSidePropsContext) => {

//   const id = context.params!.id; // undefined가 아님을 단언
//   const oneBook = await fetchOneBook(Number(id));  

//   return {
//     props : {
//       oneBook
//     }
//   }
// }

// SSG 방식
export const getStaticPaths = async () => {
  return {
    paths : [
      {params: {id : "1"}}, // 파라미터값은 반드시 문자열
      {params: {id : "2"}},
      {params: {id : "3"}}
    ],
    fallback : true // false : 404 Not Found 반환,
    // 예외상황 대비책, 보험 
    // false : 404 Not Found 반환 
    // blocking : 즉시 생성 (Like SSR), 생성된 페이지는 서버에 저장됨 
    // true : 즉시 생성 + (props가 없는)페이지만 미리 반환, 마찬가지로 생성된 페이지는 서버에 저장됨 
  };
}

export const getStaticProps = async (context : GetStaticPropsContext) => {
  const id = context.params!.id; // undefined가 아님을 단언
  const oneBook = await fetchOneBook(Number(id));  

  if (!oneBook) {
    return {
      notFound : true // 404 Not Found 페이지 리다이렉트
    }
  }
  return {
    props : {
      oneBook
    }
  }
}

export default function Page ({oneBook} : InferGetStaticPropsType<typeof getStaticProps>) {

  const router = useRouter();

  if (router.isFallback) {
    return "로딩중입니다..";
  }

  if (!oneBook) {
    return "문제가 발생했습니다. 다시 시도하세요";
  }


  return (
    <div className={style.container}>
      <div 
        className={style.cover_img_container}
        style={{backgroundImage:`url('${oneBook.coverImgUrl}')`}}
      >
        <img src={oneBook.coverImgUrl} alt={oneBook.title}/>
      </div>
      <div className={style.title}>{oneBook.title}</div>
      <div className={style.subTitle}>{oneBook.subTitle}</div>
      <div className={style.author}>{oneBook.author} | {oneBook.publisher}</div>

      <div className={style.description}>{oneBook.description}</div>
    </div>
  )
}