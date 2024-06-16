import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Link from "next/link";

interface PaginatorProps {
  endpoint: string;
  page: number;
  totalNumberPages: number;
  numberOfItemsPerPage: number;
}

export default function Paginator({
  endpoint,
  page,
  totalNumberPages,
  numberOfItemsPerPage = 20,
}: PaginatorProps) {
  const startItem = ((page - 1) * numberOfItemsPerPage) + 1;
  const endItem = Math.min(page * numberOfItemsPerPage, totalNumberPages * numberOfItemsPerPage);

  return (
    <nav>
      <span>Itens por página: {numberOfItemsPerPage}</span>
      <br />
      <span>{startItem} - {endItem} de {totalNumberPages * numberOfItemsPerPage}</span>
      <div>
        {page > 1 ? (
          <Link href={`${endpoint}?page=${page - 1}`}>
            <CaretLeft />
          </Link>
        ) : (
          <span><CaretLeft /></span>
        )}
        {page < totalNumberPages ? (
          <Link href={`${endpoint}?page=${page + 1}`}>
            <CaretRight />
          </Link>
        ) : (
          <span><CaretRight /></span>
        )}
      </div>
    </nav>
  );
}


// import { CaretLeft, CaretRight } from "@phosphor-icons/react"
// import Link from "next/link"

// interface PaginatorProps{
//   endpoint: string
//   page: number,
//   totalNumberPages: number
//   numberOfItemsPerPage: number
// }

// export default function Paginator({endpoint, page,totalNumberPages, numberOfItemsPerPage = 20}: PaginatorProps){
//   return (
//     <nav>
//       <span>Itens por página {numberOfItemsPerPage}</span>
//       <br />
//       <span>{((page-1) * numberOfItemsPerPage) + 1} - {page  * numberOfItemsPerPage} of {totalNumberPages}</span>
//       <div>
//         <Link href={`${endpoint}?page=${page-1}`}><CaretLeft/></Link>
//         <Link href={`${endpoint}?page=${page+1}`}><CaretRight/></Link>
//       </div>
//     </nav>

//   )
// }