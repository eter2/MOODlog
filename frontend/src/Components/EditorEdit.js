import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./EditorToolbar.css"; 
import postService from '../Services/post'

const Quill = ReactQuill.Quill
var Font = Quill.import('formats/font');
Font.whitelist = ['gothic', 'myeongjo', 'pen', 'student'];

const Editor = () => {
  const { _id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [weather, setWeather] = useState("");
  const [mood, setMood] = useState("");
  const quillRef = useRef(null);

  const useEffect(() => {
    const fetchData = async () => {
        try {
          // TODO:
          const data = await postService.getPost(_id);
          setPost(data);
        } catch (error) {
          console.error('Error fetching latest posts:', error);
        }
    };

    fetchData();
  }, []);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return; // 파일이 선택되지 않은 경우 조기 반환
    
      try {
        // uploadImage 함수를 호출하여 이미지 업로드 및 URL 받기
        const imgUrl = await postService.uploadImage(file);
    
        // Quill 에디터의 현재 커서 위치에 이미지 삽입
        if (quillRef.current && quillRef.current.getEditor()) {
          const range = quillRef.current.getEditor().getSelection();
          quillRef.current.getEditor().insertEmbed(range.index, "image", imgUrl);
          quillRef.current.getEditor().setSelection(range.index + 1);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  };

  const findImg = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const imgElement = doc.querySelector('img');

    if (imgElement) {
      const imgUrl = imgElement.getAttribute('src');
      return imgUrl || '';
    }
  
    return '';
  }
    
  const navigate = useNavigate();

  const moveListPage = () => {
    // TODO: 해당 게시글 페이지로 이동
    navigate(`/view/${_id}`);
  };

  const removeTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
}


  const submitHandler = async () => {
    // TODO: TEST
    if (!removeTags(content).trim()) {
      window.alert("작성되지 않은 내용이 있습니다.");
    }
    else {
      const imgUrl = findImg(content);

      if (title === '' || mood === '' || weather === '') {
        window.alert("작성되지 않은 내용이 있습니다.");
      }
      else {
        // TODO: page 수정
        await postService.createPost(title, content, imgUrl, mood, weather);
        // TODO: TEST
        moveListPage();
      }
    }
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [ 
          [{ 'font': Font.whitelist }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],      
          [{ 'color': [] }, { 'background': [] }],
          ['link', 'image'],
        ],
        handlers: {
          image: imageHandler,
        }
      },
    }
  }, []);

  const formats = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'link', 'image',
  ];

  return (
    <div className="container mx-auto pt-4 px-5 flex">
      <div className="w-full mx-auto px-2">
          <div className="flex w-full items-center mb-2">
            <div className=" text-gray-800 w-[80px]">제목</div>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              required
              className="block w-full rounded-md px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main-color sm:text-sm sm:leading-6"
            />
            <div className="flex justify-between mx-auto">
              <p></p>
              <button 
                type="button"
                onClick={submitHandler} className="ml-2 h-9 w-[80px] bg-main-color text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-gray-400">
                발행
              </button>
            </div>
          </div>
          <div className="flex mb-2 gap-x-2">
            <select 
              id="weather"              
              onChange={(e) => setWeather(e.target.value)} 
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main-color focus:border-main-color block w-full p-2.5">
              <option defaultValue value="">오늘의 날씨</option>
              <option value="맑음">맑음</option>
              <option value="흐림">흐림</option>
              <option value="비/눈">비/눈</option>
            </select>
            
            <select 
              id="mood"
              onChange={(e) => setMood(e.target.value)} 
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:main-color focus:border-main-color block w-full p-2.5">
              <option defaultValue value="">오늘의 기분</option>
              <option value="행복">행복</option>
              <option value="슬픔">슬픔</option>
              <option value="분노">분노</option>
              <option value="평범">평범</option>
            </select>
          </div>
          <div className="text-sm h-[700px] leading-relaxed mb-12">
            <ReactQuill
              ref={quillRef}
              style={{ height: '100%' }}
              theme="snow"
              modules={modules}
              formats={formats}
              value={content}
              onChange={setContent}
            />
          </div>
      </div>
    </div>
  );
};

export default Editor;