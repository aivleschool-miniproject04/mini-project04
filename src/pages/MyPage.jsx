import { useEffect, useState } from "react";

function MyPage({ currentUser, onMoveToStart, onLoadMyPage, onUpdateProfile }) {
  const [profile, setProfile] = useState(currentUser || {});
  const [formData, setFormData] = useState({
    nickname: currentUser?.nickname || "",
    email: currentUser?.email || "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadMyPage = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await onLoadMyPage();
        const nextProfile = data.user || {};

        if (isMounted) {
          setProfile(nextProfile);
          setFormData({
            nickname: nextProfile.nickname || "",
            email: nextProfile.email || "",
            password: "",
          });
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setErrorMessage(error.message || "마이페이지 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMyPage();

    return () => {
      isMounted = false;
    };
  }, [onLoadMyPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      nickname: formData.nickname.trim(),
      email: formData.email.trim(),
    };

    if (formData.password.trim()) {
      updateData.password = formData.password;
    }

    try {
      setIsSaving(true);
      setErrorMessage("");

      const data = await onUpdateProfile(updateData);
      const nextProfile = data.user || {};

      setProfile(nextProfile);
      setFormData({
        nickname: nextProfile.nickname || "",
        email: nextProfile.email || "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "프로필 정보를 수정하지 못했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="mypage-page">
      <section className="section-card mypage-profile">
        <div className="mypage-title-row">
          <div>
            <span className="tag">마이페이지</span>
            <h2>{profile.nickname || "사용자"}님의 프로필</h2>
          </div>
          <button type="button" className="secondary-btn" onClick={onMoveToStart}>
            홈으로
          </button>
        </div>

        {isLoading && <p className="mypage-state">마이페이지 정보를 불러오는 중입니다.</p>}

        {!isLoading && errorMessage && (
          <p className="mypage-state is-error">{errorMessage}</p>
        )}

        {!isLoading && !errorMessage && (
          <>
            <div className="mypage-user-box">
              <div>
                <span>아이디</span>
                <strong>{profile.loginId || profile.userId || "-"}</strong>
              </div>
              <div>
                <span>이름</span>
                <strong>{profile.name || "-"}</strong>
              </div>
              <div>
                <span>닉네임</span>
                <strong>{profile.nickname || "-"}</strong>
              </div>
              <div>
                <span>이메일</span>
                <strong>{profile.email || "-"}</strong>
              </div>
            </div>

            <form className="mypage-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>닉네임</label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  placeholder="닉네임을 입력하세요"
                />
              </div>

              <div className="form-group">
                <label>이메일</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일을 입력하세요"
                />
              </div>

              <div className="form-group">
                <label>새 비밀번호</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="변경할 때만 입력하세요"
                />
              </div>

              <div className="form-buttons">
                <button type="submit" disabled={isSaving}>
                  {isSaving ? "수정 중..." : "수정하기"}
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </main>
  );
}

export default MyPage;
