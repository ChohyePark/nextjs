import {  useEffect, useState } from "react"
import { useRouter } from "next/router";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter(); 
  const q = router.query.q as string; // as - 타입 단언
  const [search,setSearch] = useState("");

  useEffect(()=>{
    setSearch(q || ""); // q 의 값이 있다면 q의 값을 넣고 없다면 빈 문자열
  },[q])
  
  
  const onChangeSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const onSubmit = () => {
    if(!search || q === search)return;
    router.push(`/search?q=${search}`);
  }

  const onKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      onSubmit();
    }
  }

  return (
    <div>
      <div className={style.searchbar_container}>
        <input 
          value={search} 
          onKeyDown={onKeyDown}
          onChange={onChangeSearch} 
          placeholder="검색어를 입력하세요 ..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}