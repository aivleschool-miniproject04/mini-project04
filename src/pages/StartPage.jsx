import Header from "../components/Header";
import NewBooksSection from "../components/NewBooksSection";
import PopularBooksSection from "../components/PopularBooksSection";

function StartPage({
  newBooks = [],
  popularBooks = [],
  onMoveToStart,
  onMoveToList,
  onMoveToDetail,
  onMoveToCreate,
}) {
  return (
    <>
      <Header onMoveToStart={onMoveToStart} />

      <main className="book-list-page">
        <section className="list-hero" aria-label="AivleBooks 소개">
          <div>
            <strong>AivleBooks</strong>
            <p>글과 AI 표지 시안을 함께 관리하는 창작 서재</p>
          </div>
        </section>

        <section className="section-card">
          <div
            className="page-title-row"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div className="list-actions">
              <button
                type="button"
                className="create-button"
                onClick={onMoveToList}
              >
                도서 목록
              </button>

              <button
                type="button"
                className="create-button"
                onClick={onMoveToCreate}
              >
                새 도서 등록
              </button>
            </div>
          </div>

          <div
            className="main-sections-container"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "48px",
              marginTop: "32px",
            }}
          >
            <PopularBooksSection
              popularBooks={popularBooks}
              onMoveToDetail={onMoveToDetail}
            />

            <hr
              style={{
                border: "0",
                height: "1px",
                backgroundColor: "#eaeaea",
                margin: "0",
              }}
            />

            <NewBooksSection
              newBooks={newBooks}
              onMoveToDetail={onMoveToDetail}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default StartPage;
