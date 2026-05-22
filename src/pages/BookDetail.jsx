import Header from "../components/Header";

function BookDetail({
  book,
  onMoveToStart,
  onMoveToList,
  onMoveToCreate,
  onMoveToUpdate,
  onMoveToCoverUpdate,
  onDelete,
}) {
  if (!book) {
    return (
      <>
        <Header
          onMoveToStart={onMoveToStart}
          onMoveToList={onMoveToList}
          onMoveToCreate={onMoveToCreate}
        />
        <main className="detail-page">
          <p>선택된 도서가 없습니다.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header
        onMoveToStart={onMoveToStart}
        onMoveToList={onMoveToList}
        onMoveToCreate={onMoveToCreate}
      />

      <main className="detail-page">
        <section className="detail-container">
          <div className="detail-cover">
            {book.coverImageUrl ? (
              <img src={book.coverImageUrl} alt={`${book.title} 표지`} />
            ) : (
              <>
                <span>BOOK</span>
                <strong>{book.title}</strong>
                <em>{book.author}</em>
              </>
            )}
          </div>

          <div className="detail-info">
            <span className="tag">상세 조회</span>
            <h2>{book.title}</h2>
            <p>저자: {book.author}</p>
            {book.publisher && <p>출판사: {book.publisher}</p>}

            <div className="content-box">
              <strong>도서 소개</strong>
              <p>{book.content}</p>
            </div>

            <p className="date-text">
              등록일: {book.createdAt} / 수정일: {book.updatedAt}
            </p>

            <div className="detail-buttons">
              <button type="button" onClick={() => onMoveToCoverUpdate(book)}>
                표지 시안 생성
              </button>
              <button type="button" onClick={() => onMoveToUpdate(book)}>
                수정하기
              </button>
              <button type="button" className="danger-button" onClick={() => onDelete(book)}>
                삭제
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default BookDetail;
