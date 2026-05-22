import { useState } from "react";
import Header from "../components/Header";
import BookForm from "../components/BookForm";

function BookUpdate({ book, onBookUpdate, onMoveToDetail, onMoveToList }) {

  if (!book) {
    return (
      <div>
        <Header />

        <main className="form-page">
          <p>수정할 도서 정보가 없습니다.</p>
          <button onClick={onMoveToList}>목록으로 돌아가기</button>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <main className="form-page">
        <h2>등록된 도서 수정</h2>

        <BookForm
          book={book}
          onSubmit={onBookUpdate}
          onCancel={() => onMoveToDetail(book)}
          submitText="수정하기"
        />
      </main>
    </div>
  );
}

export default BookUpdate;