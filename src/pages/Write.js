import "../style/Write.css"

import icon_camera from "../assets/icon_camera.png";
import icon_alignLeft from "../assets/icon_alignLeft.png";
import icon_alignRight from "../assets/icon_alignRight.png";
import icon_alignCenter from "../assets/icon_alignCenter.png";

import { useEffect, useState } from "react";
//import axios

import React, {useRef} from "react";
import { useNavigate } from "react-router";

const Write = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [data, setData] = useState({
        recipient: "",
        image: "",
        text: "",
        alignType: "left",
        theme: "default",
    })

    useEffect(()=>{        
    },[])

    //임시저장
    const handleSave = () => {
        window.alert("임시저장 되었습니다.")
    };

    //타임캡슐 미리보기
    const goOverview = () => {
        navigate(`/`);
    };

    const handleSubmit = () => {
        if(window.confirm("작성을 끝낼까요?")){
            // try{
            //     axios.post(SERVER_URL, data);
            // }catch(err){
            //     window.alert(err);
            // }
            navigate(`/`);
        }
    }

    //textarea 길이 조정
    const autoResizeTextarea = (e) => {
        setData({
            ...data,
            text: e.target.value,
        })

        let textarea = document.querySelector(`.${data.alignType}`);
        if(textarea){
            textarea.style.height='auto';
            let height = textarea.scrollHeight;
            console.log(height);
            textarea.style.height=`${height + 8}px`;
        }
    }
    //이미지 삭제
    const deleteImage = () => {
        if(window.confirm("이미지를 삭제할까요?")){
            setData({
                ...data,
                image: null,
            });
        }
    }

    //이미지 파일 찾기
    const findPhoto = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (e) => {
        //선택한 파일에 대한 작업 수행
        const selectedFile = e.target.files[0];
        if(selectedFile){
            //선택한 파일 읽기
            const reader = new FileReader();
            reader.onload = (event) => {
                setData({
                    ...data,
                    image: event.target.result
                });
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    //텍스트 좌, 우, 가운데 정렬
    const changeAlignType = () => {
        if(data.alignType==="left"){
            setData({
                ...data,
                alignType: "center",
            });
        }else if(data.alignType==="center"){
            setData({
                ...data,
                alignType: "right",
            })
        }else{
            setData({
                ...data,
                alignType: "left",
            });
        }
    }

    return(
        <div className={["Write", data.theme].join(" ")}>
            <div className="write_top">
                <button className="btn_save">임시저장</button>  
            </div>
            <div className="write_center">
                <div className="to">
                    <p>To.</p>
                    <input></input>
                </div>
                <div className="text">
                    { data.image && <img className="selected_image" onClick={deleteImage} alt="" src={data.image}/>}
                    <textarea
                        className={data.alignType}
                        placeholder="여기에 작성하세요."
                        onKeyDown={autoResizeTextarea}
                        onKeyUp={autoResizeTextarea}
                    />
                </div>
                <div className="buttons">
                    <img className="btn_photo" onClick={findPhoto} alt="" src={icon_camera}/>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    {data.alignType==="left"&&<img className="btn_align" onClick={changeAlignType} alt="" src={icon_alignLeft}/>}
                    {data.alignType==="center"&&<img className="btn_align" onClick={changeAlignType} alt="" src={icon_alignCenter}/>}
                    {data.alignType==="right"&&<img className="btn_align" onClick={changeAlignType} alt="" src={icon_alignRight}/>}
                </div>
            </div>
            <div className="write_bottom">
                <button className="btn_overview">타임캡슐 미리보기</button>
                <button className="btn_submit">다했어요!</button>                
            </div>
        </div>
    )
}

export default Write;