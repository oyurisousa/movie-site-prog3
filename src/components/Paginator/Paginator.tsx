import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import styles from './Paginator.module.css'
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
    <nav className={styles.nav}>
      <span>Itens por página: {numberOfItemsPerPage}</span>
      <br />
      <span>{startItem} - {endItem} de {totalNumberPages * numberOfItemsPerPage}</span>
      <div>
        {page > 1 ? (
          <Link href={`${endpoint}?page=${page - 1}`}>
            <CaretLeft size={32} color="white"/>
          </Link>
        ) : (
          <span><CaretLeft size={32} color="#00000050"/></span>
        )}
        {page < totalNumberPages ? (
          <Link href={`${endpoint}?page=${page + 1}`}>
            <CaretRight size={32} color="white" />
          </Link>
        ) : (
          <span><CaretRight size={32} color="#00000050" /></span>
        )}
      </div>
    </nav>
  );
}

