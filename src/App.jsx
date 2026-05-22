import { useEffect, useState } from 'react'
import StartPage from "./pages/StartPage";
import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import BookCreate from "./pages/BookCreate";
import BookUpdate from "./pages/BookUpdate";
import CoverUpdate from "./pages/CoverUpdate";
import './App.css'

function App() {
  const [page, setPage] = useState("start");
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
  async function  loadBooks() {
      try {
        const res = await fetch('http://localhost:3000/books');
        const data = await res.json();
        setBooks(data);
      } catch(err) {
        console.error(err);
        setError('도서 정보를 불러올 수 없습니다.');
      }
    }
    loadBooks();
  }, []);

  const handleNewBook = async (book) => {
    try {
      const res = await fetch('http://localhost:3000/newBook/' + book.id, {
        method: 'POST',
        headers: { 'Content_Type': 'application/json' },
        body: JSON.stringify(book)
      });
      const saved = await res.json();
      setBooks([saved, ...books]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookDelete = async (id) => {
    try {
      await fetch('http://localhost:3000/bookDelete/' + id, {
        method: 'DELETE',
      });
      setBooks(books.filter(b => b.id !== id));
    } catch(eff) {
      console.error(err);
    }
  };

  const handleBookUpdate = async (updatedBook) => {
    try {
      const book = books.find(b => b.id === updatedBook.id);
      const res = await fetch('http://localhost:3000/update/' + updatedBook.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ content: updatedBook.content/* 필요시 update할 컬럼을 더 작성 */})
      });
      const updated = await res.json();
      setBooks(books.map(b => b.id === updatedBook.id ? updated : b))
    } catch (err) {
      console.error(err);
    }
  };

  const moveToList = () => {
    setPage("list");
  };

  const moveToCreate = () => {
    setPage("create");
  };

  const moveToDetail = (book) => {
    setSelectedBook(book);
    setPage("detail");
  };

  const moveToUpdate = (book) => {
    setSelectedBook(book);
    setPage("update");
  };

  const moveToCoverUpdate = (book) => {
    setSelectedBook(book);
    setPage("coverUpdate");
  };



  return (
    <>
      {page === "start" && (
        <StartPage
          onMoveToList={moveToList}
          onMoveToCreate={moveToCreate}
        />
      )}

      {page === "list" && (
        <BookList
          onMoveToDetail={moveToDetail}
          onMoveToCreate={moveToCreate}
        />
      )}

      {page === "detail" && (
        <BookDetail
          book={selectedBook}
          onMoveToList={moveToList}
          onMoveToUpdate={moveToUpdate}
          onMoveToCoverUpdate={moveToCoverUpdate}
        />
      )}

      {page === "create" && <BookCreate onMoveToList={moveToList} />}

      {page === "update" && (
        <BookUpdate
          book={selectedBook}
          onMoveToDetail={moveToDetail}
          onMoveToList={moveToList}
        />
      )}

      {page === "coverUpdate" && (
        <CoverUpdate
          book={selectedBook}
          onMoveToDetail={moveToDetail}
          onMoveToList={moveToList}
        />
      )}
    </>
  );
}

export default App;