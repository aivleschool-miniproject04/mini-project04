import { useState } from "react";
import { useEffect } from "react";

function BookForm({ book, onSubmit, onCancel, submitText }) {

  const [formData, setFormData] = useState({
    title: book?.title || "",
    author: book?.author || "",
    publisher: book?.publisher || "",
    content: book?.content || "",
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        content: book.content,
      });
    }
  }, [book]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleAddBook = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("도서 제목을 입력해주세요.");
      return;
    } else if (!formData.author.trim()) {
      alert("저자를 입력해주세요.");
      return;
    } else if (!formData.publisher.trim()) {
      alert("출판사를 입력해주세요.");
      return;
    } else if (!formData.content.trim()) {
      alert("도서 소개를 입력해주세요.");
      return;
    }
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    let createdDate = formattedDate;
    let updatedDate = formattedDate;

    console.log("book: ", book.createdAt);
    if (book && book.createdAt) {
      console.log("aaa");
      createdDate = book.createdAt;
    }

    console.log("title: ", formData.title);
    const newBook = {
      title: formData.title,
      author: formData.author,
      publisher: formData.publisher,
      content: formData.content,
      imageUrl: "",
      createdAt: createdDate,
      updatedAt: updatedDate
    };
    if (book) {
      newBook.id = book.id;
      alert("수정 되었습니다.");

    } else {
      alert("등록 되었습니다.");
    }
    onSubmit(newBook);

    setFormData({
      title: "",
      author: "",
      publisher: "",
      content: "",
    });
    onCancel();
  }

  return (
    <form className="book-form" onSubmit={handleAddBook}>
      <div className="form-group">
        <label>도서 제목</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="도서 제목을 입력하세요"
        />
      </div>

      <div className="form-group">
        <label>저자</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="저자를 입력하세요"
        />
      </div>

      <div className="form-group">
        <label>출판사</label>
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          placeholder="출판사를 입력하세요"
        />
      </div>

      <div className="form-group">
        <label>도서 소개</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="도서 소개를 입력하세요"
        />
      </div>

      <div className="form-buttons">
        <button type="submit">{submitText}</button>
        <button type="button" onClick={onCancel}>
          취소
        </button>
      </div>
    </form>
  );
}

export default BookForm;