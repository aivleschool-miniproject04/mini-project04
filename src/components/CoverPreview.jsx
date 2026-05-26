function CoverPreview({ imageUrl, onClick, isLoading = false }) {
  return (
    <div
      className={`cover-preview${isLoading ? " is-loading" : ""}`}
      onClick={isLoading ? undefined : onClick}
      style={{
        cursor: imageUrl && onClick && !isLoading ? "pointer" : "default",
      }}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <div className="cover-generating-state">
          <span className="cover-spinner" aria-hidden="true" />
          <strong>표지 시안을 생성중입니다</strong>
          <p>이미지를 만드는 동안 잠시만 기다려주세요.</p>
        </div>
      ) : imageUrl ? (
        <img src={imageUrl} alt="도서 표지" />
      ) : (
        <p>
          이미지 생성 후
          <br />
          도서 표지가 표시됩니다
        </p>
      )}
    </div>
  );
}

export default CoverPreview;
